import React, { useState, useEffect, useContext } from 'react';
import './AvailableGames.css';
import { AuthContext } from '../contexts/auth/AuthContext';
import axios from 'axios';
import { SocketContext } from '../contexts/sockets/SocketContext';
import PartidaWidget from '../gamecomponents/partidawidget';
import {cargar_mapas} from '../common/images'

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
  const [mapas, setMapas] = useState([]);
  const { token } = useContext(AuthContext);
  const [vacio, setVacio] = useState(false);
  const { socket } = useContext(SocketContext);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    async function fetchImages() {
      var mapas = await cargar_mapas();
      mapas = Object.keys(mapas).map(clave => ({ [clave]: mapas[clave] }))
      console.log(mapas);
      setMapas(mapas);
    }
    fetchImages()

    const getGames = async () => {
      try {
        const data = await fetchGames();
        setGames(data.partidas);
        setVacio(data.vacio);
        socket.current?.emit("UsuarioEntraPartidas", {UserId: localStorage.getItem("user_id")});
        console.log(games);
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
    if (!socket?.current) return;
    console.log("entrando al socket");
    const handleGameUpdate = (data) => {
      setGames(data.partidas);
      setVacio(data.vacio);
      console.log("esto recibi: ", data)
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
