import React, { useState, useEffect, useContext } from 'react';
import './AvailableGames.css';
import { AuthContext } from '../contexts/auth/AuthContext';
import axios from 'axios';
import { SocketContext } from '../contexts/sockets/SocketContext';

const fetchGames = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/partidas/all`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }
  catch (error) {
    console.error("Error al obtener partidas:", error);
    throw error;
  }
};

function AvailableGames() {
  const [games, setGames] = useState([]); // Partidas
  const [error, setError] = useState(false);
  const { token } = useContext(AuthContext);
  const [vacio, setVacio] = useState(false);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const getGames = async () => {
      try {
        const data = await fetchGames();
        setGames(data.partidas);
        setVacio(data.vacio);
      } catch (error) {
        setError(true);
      }
    };
    getGames();
  }, []);

  useEffect(() => {
    if (!socket) return;
    
    const handleGameUpdate = (data) => {
      setGames(data.partidas);
      setVacio(data.vacio);
    };

    socket.current?.on('partidasUpdate', handleGameUpdate);
    
    return () => {
      socket.current?.off('partidasUpdate', handleGameUpdate);
    };
  }, [socket]);

  // Enviar evento al servidor cuando el usuario salga de la vista
  useEffect(() => {
    const handleBeforeUnload = () => {
      socket.current?.emit('usuarioSalioVista', { message: 'Usuario ha salido de la vista de partidas' });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Limpiar el event listener al desmontar el componente
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleBeforeUnload(); // Emitir una última vez al desmontarse el componente
    };
  }, [socket]);

  const joinGame = (gameId) => {
    console.log(`Unirse a la partida con ID: ${gameId}`);
  };
  console.log(games);
  return (
    <div>
      <h2>Partidas Disponibles</h2>
      <table className="games-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Jugadores</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {games.length > 0 ? (
            games.map(game => (
              <tr key={game.id}>
                <td>{game.id_creador}</td>
                <td>{game.jugadores_actuales} / {game.jugadores_max}</td>
                <td>
                  <button className="join-button" onClick={() => joinGame(game.id)}>
                    Unirse
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay partidas disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AvailableGames;
