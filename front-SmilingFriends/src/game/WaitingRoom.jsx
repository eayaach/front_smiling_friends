import { AuthContext } from '../contexts/auth/AuthContext';
import React, { useEffect, useState , useContext} from 'react';
import { useParams } from 'react-router-dom';
import axios, { getAdapter } from 'axios';


export default function WaitingRoom() {
  const { id } = useParams(); // Obtener el ID de la URL
  const [gameData, setGameData] = useState(null); // Estado para los datos de la partida
  const [loading, setLoading] = useState(true); // Estado para indicar si está cargando
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
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

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Game of creator {gameData.nombre_creador}</h1>
      <p><strong>Max Players:</strong> {gameData.max_players}</p>
      <p><strong>Status:</strong> {gameData.estado}</p>

    </div>
  );
}
