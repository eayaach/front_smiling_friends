import React, { useState, useEffect, useContext } from 'react';
import './AvailableGames.css';
import { AuthContext } from '../contexts/auth/AuthContext';
import axios from 'axios';
import { SocketContext } from '../contexts/sockets/SocketContext';
import PartidaWidget from '../gamecomponents/partidawidget';
import {cargar_mapas} from '../common/images'

const fetchGames = async () => {
  try {
    const token = sessionStorage.getItem('token');
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
  const [mapas, setMapas] = useState([]);
  const { token } = useContext(AuthContext);
  const [vacio, setVacio] = useState(false);
  const { socket } = useContext(SocketContext);
  const userId = sessionStorage.getItem("user_id");

  useEffect(() => {
    async function fetchImages() {
      var mapas = await cargar_mapas();
      mapas = Object.keys(mapas).map(clave => (mapas[clave]))
      setMapas(mapas);
      console.log(mapas)
    }
    fetchImages()

    const getGames = async () => {
      try {
        const data = await fetchGames();
        setGames(data.partidas);
        console.log(data);
        setVacio(data.vacio);
        socket.current?.emit("UsuarioEntraPartidas", {UserId: sessionStorage.getItem("user_id")});
      } catch (error) {
        setError(true);
      }
    };
    getGames();
    return () => {
      socket.current?.emit('UsuarioSalePartidas', { message: 'Usuario ha salido de la vista de partidas', UserId: sessionStorage.getItem("user_id")});
    }

  }, []);

  useEffect(() => {
    if (!socket?.current) return;
    const handleGameUpdate = (data) => {
      setGames(data.partidas);
      setVacio(data.vacio);
    };

    socket.current?.on('PartidasUpdated', handleGameUpdate);

    return () => {
      socket.current?.off('PartidasUpdated', handleGameUpdate);
    };
  }, [socket.current]);

  return (
    <div className='section'>
      <h1>Partidas Disponibles</h1>
      {games.length > 0 ? (
    <div className="grid">
      {games.map(game => (
        <PartidaWidget
          game_id = {game.id}
          key={game.id}
          creador={game.nombre}
          actuales={game.jugadores_actuales}
          max={game.jugadores_max}
          game_image={mapas[game.map_id]}
        />
      ))}
    </div>
  ) : (
    <h2>No hay partidas disponibles</h2>
  )}
    </div>
  );
}

export default AvailableGames;
