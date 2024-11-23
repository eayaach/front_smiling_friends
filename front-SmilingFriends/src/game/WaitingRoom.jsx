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
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate()
  const handleGamestart = async () => {
    try {

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/partidas/start`, {id_partida: localStorage.getItem("game_id")},
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
    fetchImages()
    const fetchGameData = async () => {
      try {
        const data = {id_partida: parseInt(id, 10)};
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/partidas/show`, data,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Enviar token en el header
            },
          }
        );
        setGameData(response.data); // Guardar los datos en el estado
        console.log(response.data);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.msg || 'Error al cargar los datos');
      } finally {
        setLoading(false); // Terminar la carga
      }
    };

    fetchGameData();
  }, [id]); // Ejecutar el efecto cuando cambie el ID

  useEffect(() => {
    console.log("antes de entrar al socket");
    if (!socket?.current) return;
    console.log("entrando al socket");

    const handleChangeOfview = (data) => {
      navigate('/partidas/ingame');
    };

    socket.current?.on('PartidaStarts', handleChangeOfview);

    return () => {
      socket.current?.off('PartidaStarts', handleChangeOfview);
    };
  }, [socket.current]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <h1>Game of creator {gameData.nombre_creador}</h1>
      <p><strong>Max Players:</strong> {gameData.max_players}</p>
      <p><strong>Status:</strong> {gameData.estado}</p>
      {parseInt(gameData.id_creador,10) === parseInt(userId,10)? (<button onClick={handleGamestart}>Start game</button>) :(<></>)}
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
    </div>
  );
}
