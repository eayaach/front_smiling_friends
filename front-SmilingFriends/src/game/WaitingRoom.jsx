import { AuthContext } from '../contexts/auth/AuthContext';
import React, { useEffect, useState , useContext} from 'react';
import { useParams } from 'react-router-dom';
import axios, { getAdapter } from 'axios';
import UserComponent from '../profile/UserComponent';
import { Link, useNavigate } from 'react-router-dom';
import {cargar_cartas, cargar_mapas, cargar_skins} from '../common/images';
import './WaitingRoom.css';
import { SocketContext } from '../contexts/sockets/SocketContext';

export default function WaitingRoom() {
  const { id } = useParams(); // Obtener el ID de la URL
  const { token } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [gameData, setGameData] = useState(null); // Estado para los datos de la partida
  const [loading, setLoading] = useState(true); // Estado para indicar si está cargando
  const [error, setError] = useState(null); // Estado para manejar errores
  const [skins, setSkins] = useState({});
  const userId = sessionStorage.getItem("user_id");
  const navigate = useNavigate()
  const handleGamestart = async () => {
    try {

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/partidas/start`, {id_partida: sessionStorage.getItem("game_id")},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.msg || 'Error al intentar iniciar partida');
    }

  }
  useEffect(() => {
    async function fetchImages() {
      const skins = await cargar_skins();
      setSkins(skins);
    }

    const fetchGameData = async () => {
      try {
        const data = { id_partida: parseInt(id, 10) };
        const token = sessionStorage.getItem("token");
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/partidas/show`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Enviar token en el header
            },
          }
        );
        setGameData(response.data); // Guardar los datos en el estado
      } catch (err) {
        setError(err.response?.data?.msg || "Error al cargar los datos");
      } finally {
        setLoading(false); // Terminar la carga
      }
    };

    fetchImages(); // Cargar skins inicialmente
    fetchGameData(); // Cargar datos del juego inicialmente

    if (!socket?.current) return;

    // Manejar eventos del socket
    const handleNewJoin = () => {
      fetchGameData(); // Volver a cargar los datos del juego al recibir un evento
    };

    socket.current?.on("UserJoined", handleNewJoin);

    return () => {
      socket.current?.off("UserJoined", handleNewJoin);
    };
  }, [id, socket.current]); // Ejecutar el efecto cuando cambie el ID

  useEffect(() => {
    if (!socket?.current) return;

    const handleGameStart = (data) => {
      sessionStorage.setItem('Partida', JSON.stringify(data));
      navigate('/ingame');
    };

    socket.current?.on('PartidaStarts', handleGameStart);

    return () => {
      socket.current?.off('PartidaStarts', handleGameStart);
    };
  }, [socket.current]);


  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='section'>
      {error && <div className="error">{error}</div>}
      <h1>Game of {gameData.nombre_creador}</h1>
      {gameData.jugadores.length > 0 ? (
        <div className="players-grid">
          {gameData.jugadores.map(player => (
                <UserComponent
                  key={player.id}
                  Skin1={skins[player.img_id]}
                  usuario={player.usuario}
                  level={player.level}
                />
              ))}
        </div>
          ) : (
            <h2>No hay partidas disponibles</h2>
          )}
      <div className='box more'>
        <h2> {gameData.jugadores_actuales}/{gameData.max_players}</h2>
        {parseInt(gameData.id_creador,10) === parseInt(userId,10)? (<button onClick={handleGamestart}>Start game</button>) :(<></>)}
      </div>
    </div>
  );
}
