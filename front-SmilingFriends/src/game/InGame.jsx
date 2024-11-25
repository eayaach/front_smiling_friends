import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import { SocketContext } from '../contexts/sockets/SocketContext';
import PartidaWidget from '../gamecomponents/partidawidget';
import { cargar_cartas, cargar_skins } from '../common/images';
import { TableroWidget } from '../gamecomponents/Tablero';
import PlayerCards from '../gamecomponents/PlayerCards';
import Players from '../gamecomponents/players';
import Me from '../gamecomponents/Me';
import styled from 'styled-components';
import axios from 'axios';
import MessageBox from './MessageBox';

const Round = styled.div`
  width: auto;
  height: 70px;
  background: linear-gradient(145deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8));
  border: 2px solid rgba(0, 255, 255, 0.8); /* Crea un borde brillante */
  border-radius: 15px; /* Esquinas redondeadas */
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5),
              0 0 30px rgba(0, 255, 255, 0.3); /* Sombra con brillo */
  display: flex;
  padding: 1%;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20%;
  left: 40%;
  color: white;
  font-size: 0.8em;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.8),
               0 0 10px rgba(0, 255, 255, 0.6); /* Brillo en el texto */
  animation: glow 1.5s infinite alternate; /* Animación para brillo */
  @keyframes glow {
  from {
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5),
                0 0 30px rgba(0, 255, 255, 0.3);
  }
  to {
    box-shadow: 0 0 25px rgba(0, 255, 255, 0.8),
                0 0 50px rgba(0, 255, 255, 0.5);
     }
  }
`;


function InGame() {
  const [gameInfo, setGameInfo] = useState({ jugadores: [], cartas: [], tablero: null });
  const [error, setError] = useState(false);
  const [cartas, setCartas] = useState([]);
  const [skins, setSkins] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const [selectedCard, setSelectedCard] = useState(null); // Carta seleccionada
  const { token } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const userId = sessionStorage.getItem("user_id");
  const [msg_jugada, SetMsgJugada] = useState([]);

  // recordar que debe ser:
   // json jugada
  /*  {id_saboteur: int,
      jugador: int,
      carta: integer,
      accion: bool,
      casilla : [posx, posy],
      objetivo: int} */
  const Comunication_data = {id_saboteur: null,
    jugador: null,
    carta: null,
    accion: null,
    casilla : null,
    objetivo: null,
    id_jugador: userId
  }

  useEffect(() => {
    async function fetchData() {
      try {
        // Cargar cartas e imágenes
        const cartasData = await cargar_cartas();
        const cartas = Object.keys(cartasData).map(clave => cartasData[clave]);
        setCartas(cartas);

        // Cargar skins
        const skinsData = await cargar_skins();
        const skins = Object.keys(skinsData).map(clave => skinsData[clave]);
        setSkins(skins);

        // Obtener datos de la partida desde el sessionStorage
        const partida = JSON.parse(sessionStorage.getItem("Partida"));
        setGameInfo(partida);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  // este  Effect es para cuando recibe info nuevo
  useEffect(() => {
    if (!socket?.current) return;

    const handleUpdateGame = (response) => {
      setIsLoading(true)
      console.log(response)
      setGameInfo(response)
      SetMsgJugada(response.msg)
      sessionStorage.setItem('Partida', JSON.stringify(response));
      setIsLoading(false)
    };

    socket.current?.on('InGamePartida', handleUpdateGame);

    return () => {
      socket.current?.off('InGamePartida', handleUpdateGame);
    };
  }, [socket.current]);


  // Manejador de clics en las celdas del tablero
  // jugada de poner carta en tablero
  const handleCellClick = async (filaIndex, celdaIndex) => {
    if (!selectedCard) {
      console.log("No hay carta seleccionada.");
      return;
    }

    if (parseInt(gameInfo.turno_actual,10) === parseInt(userId,10)){
      // turno del que esta en pantalla
      // mandamos la solicitud a ver si es valida la jugada
      console.log("carta de indice:", selectedCard[1])
      // ahora que se tiene la carta seleccionada
      // tenemos dos caso jugar una carta de utilidad y una carta de camino
      // este handle es solo para cartas de camnio
      if (selectedCard[0].tipo === undefined){
        try {
          Comunication_data.id_saboteur = parseInt(gameInfo.id_saboteur, 10)
          Comunication_data.jugador = parseInt(userId, 10)
          Comunication_data.carta = parseInt(selectedCard[1],10)
          Comunication_data.casilla = [filaIndex, celdaIndex] // [pos_x, pos_y]
          Comunication_data.objetivo = -1
          Comunication_data.accion = 1

          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/partidas/play`, Comunication_data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          if (response.data.msg[0] === true || response.data.msg[0] === -1 || response.data.msg[0] === -2){
            // jugada valida tenemos que renderizar el tablero y las cartas
            setIsLoading(true)
            setGameInfo(response.data)
            SetMsgJugada(response.data.msg)
            sessionStorage.setItem('Partida', JSON.stringify(response.data));
            setIsLoading(false)
          }
        } catch (err) {
          console.log(err);
          setError(err.response?.data?.msg || 'Error al intentar iniciar partida');
        }
      }
    }
    // Desseleccionar la carta después de colocarla
    setSelectedCard(null);
  };

  return (
    <div className="section">
      {isLoading ? (
        <div>Cargando datos...</div> // Puedes usar un componente de carga más visual
      ) : (
        <>
          <Round>Turno Actual: {gameInfo.jugadores.find(jugador => jugador.id === gameInfo.turno_actual).usuario}</Round>
          <TableroWidget
            tablero={gameInfo.tablero}
            imagenes={cartas}
            onCellClick={handleCellClick} // Pasa el manejador al tablero
          />
          <MessageBox msg = {msg_jugada} mazo={gameInfo.cartas_restantes}></MessageBox>
          <PlayerCards
            value={selectedCard}
            cartas={gameInfo.cartas}
            imagenes={cartas}
            setter={setSelectedCard} // Establecer la carta seleccionada
          />
          <Players jugadores={gameInfo.jugadores} imagenes={skins} userId={userId} />
          <Me jugadores={gameInfo.jugadores} imagenes={skins} userId={userId} is_evil={gameInfo.is_evil} />
        </>
      )}
    </div>
  );
}

export default InGame;
