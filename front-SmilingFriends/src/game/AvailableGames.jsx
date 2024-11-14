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
        socket.current?.emit("UsuarioEntraPartidas", {UserId: localStorage.getItem("user_id")});
      } catch (error) {
        setError(true);
      }
    };
    getGames();
    return () => {
      socket.current?.emit('UsuarioSalePartidas', { message: 'Usuario ha salido de la vista de partidas', UserId: localStorage.getItem("user_id")});
      console.log("saliendo de la vista");
    }
  }, []);

  useEffect(() => {
    console.log("antes de entrar al socket");
    if (!socket) return;
    console.log("entrando al socket");
    const handleGameUpdate = (data) => {
      setGames(data.partidas);
      setVacio(data.vacio);
    };

    socket.current?.on('PartidasUpdated', handleGameUpdate);

    return () => {
      socket.current?.off('PartidasUpdated', handleGameUpdate);
    };
  }, [socket.current]);


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
