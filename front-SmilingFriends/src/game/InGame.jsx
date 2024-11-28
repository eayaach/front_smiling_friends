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
import { useNavigate } from 'react-router-dom';

const Round = styled.div`
  background: linear-gradient(145deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8));
  border: 2px solid rgba(0, 255, 255, 0.8);
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5),
              0 0 30px rgba(0, 255, 255, 0.3);
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8em;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.8),
               0 0 10px rgba(0, 255, 255, 0.6);
  animation: glow 1.5s infinite alternate;
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
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const { token } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const userId = sessionStorage.getItem("user_id");
  const [msg_jugada, SetMsgJugada] = useState([]);
  const navigate = useNavigate();

  const Comunication_data = {
    id_saboteur: null,
    jugador: null,
    carta: null,
    accion: null,
    casilla: null,
    objetivo: null,
    id_jugador: userId
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const cartasData = await cargar_cartas();
        const cartas = Object.keys(cartasData).map(clave => cartasData[clave]);
        setCartas(cartas);

        const skinsData = await cargar_skins();
        const skins = Object.keys(skinsData).map(clave => skinsData[clave]);
        setSkins(skins);

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


  useEffect(() => {
    if (!socket?.current) return;

    const handleUpdateGame = (response) => {
      if (response.msg[0] === -3 || response.msg[0] === -4){
        setIsLoading(true);
        setGameInfo(response);
        SetMsgJugada(response.msg);
        sessionStorage.setItem('Partida', JSON.stringify(response));
        setIsLoading(false);
        setTimeout(() => {
          sessionStorage.removeItem('Partida');
          navigate('/profile'); // Ejecutar la navegación después del delay
        }, 5000);
      } else {
        setIsLoading(true);
        console.log(response);
        setGameInfo(response);
        SetMsgJugada(response.msg);
        sessionStorage.setItem('Partida', JSON.stringify(response));
        setIsLoading(false);
      }
    };

    socket.current?.on('InGamePartida', handleUpdateGame);

    return () => {
      socket.current?.off('InGamePartida', handleUpdateGame);
    };
  }, [socket.current]);

  const handlePlayerSelect = async (jugadorId) => {
    if (!selectedCard || selectedCard[0].tipo === undefined) {
      console.log("Selecciona una carta válida antes de jugar.");
      return;
    }

    // Asignar los valores correctamente a Comunication_data
    Comunication_data.id_saboteur = parseInt(gameInfo.id_saboteur, 10); // Debería ser un número
    Comunication_data.jugador = parseInt(userId, 10); // El id del jugador actual
    Comunication_data.carta = parseInt(selectedCard[1], 10); // La carta seleccionada
    Comunication_data.objetivo = jugadorId; // El objetivo es el jugador seleccionado
    Comunication_data.accion = 1; // Acción de bloquear/desbloquear (o la acción correspondiente)
    Comunication_data.casilla = "vacio"; // Asegúrate de que `casilla` esté correctamente asignada si es necesario

    console.log("Datos enviados al backend:", Comunication_data);
    if (parseInt(gameInfo.turno_actual, 10) === parseInt(userId, 10)) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/partidas/play`,
          Comunication_data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Respuesta del backend:", response.data);

        // Verificar si la respuesta contiene un mensaje de éxito
        if (response.data.msg[0] === true) {
          setIsLoading(true);
          setGameInfo(response.data);
          SetMsgJugada(response.data.msg);
          sessionStorage.setItem('Partida', JSON.stringify(response.data));
          setIsLoading(false);
          setSelectedCard(null);
        }
        if (response.data.msg[0] === false){
          setIsLoading(true);
          SetMsgJugada(response.data.msg);
          setIsLoading(false);
          setSelectedCard(null);
        }

        if (response.data.msg[0] === -3 || response.data.msg[0] === -4){
          setIsLoading(true);
          setGameInfo(response.data);
          SetMsgJugada(response.data.msg);
          sessionStorage.setItem('Partida', JSON.stringify(response.data));
          setIsLoading(false);
          
          setTimeout(() => {
            sessionStorage.removeItem('Partida');
            navigate('/profile'); // Ejecutar la navegación después del delay
          }, 5000); 
        }
      } catch (err) {
        // Mostrar detalles del error
        console.error("Error al jugar carta:", err.response?.data || 'Error desconocido');
        setError(err.response?.data?.msg || 'Error al intentar jugar carta');
      }
    }
  };

  const handleDiscardCard = async () => {
    if (!selectedCard) {
      console.log("No hay carta seleccionada para descartar.");
      return;
    }

    // Datos para descartar la carta
    Comunication_data.id_saboteur = parseInt(gameInfo.id_saboteur, 10);
    Comunication_data.jugador = parseInt(userId, 10);
    Comunication_data.carta = parseInt(selectedCard[1], 10);
    Comunication_data.accion = 0; // Acción de descartar
    Comunication_data.objetivo = -1; // Sin objetivo
    Comunication_data.casilla = "vacio"; // No hay casilla

    console.log("Descartar carta:", Comunication_data);

    if (parseInt(gameInfo.turno_actual, 10) === parseInt(userId, 10)) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/partidas/play`,
          Comunication_data,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("Respuesta del backend:", response.data);

        if (response.data.msg[0] === true) {
          setIsLoading(true);
          setGameInfo(response.data);
          SetMsgJugada(response.data.msg);
          sessionStorage.setItem('Partida', JSON.stringify(response.data));
          setIsLoading(false);
          setSelectedCard(null); // Limpiar carta seleccionada después de descartarla
        }
        if (response.data.msg[0] === false){
          setIsLoading(true);
          SetMsgJugada(response.data.msg);
          setIsLoading(false);
          setSelectedCard(null);
        }

        if (response.data.msg[0] === -3 || response.data.msg[0] === -4){
          setIsLoading(true);
          setGameInfo(response.data);
          SetMsgJugada(response.data.msg);
          sessionStorage.setItem('Partida', JSON.stringify(response.data));
          setIsLoading(false);

          setTimeout(() => {
            sessionStorage.removeItem('Partida');
            navigate('/profile'); // Ejecutar la navegación después del delay
          }, 5000); 
        }
      } catch (err) {
        console.error("Error al intentar descartar carta:", err.response?.data || 'Error desconocido');
        setError(err.response?.data?.msg || 'Error al intentar descartar carta');
      }
    }
  };

  const handleCellClick = async (filaIndex, celdaIndex) => {
    if (!selectedCard) {
      console.log("No hay carta seleccionada.");
      return;
    }
    console.log("Datos enviados al backend:", Comunication_data);
    if (parseInt(gameInfo.turno_actual, 10) === parseInt(userId, 10)) {
      console.log("carta de indice:", selectedCard[1]);

      if (selectedCard[0].tipo === undefined) {
        try {
          Comunication_data.id_saboteur = parseInt(gameInfo.id_saboteur, 10);
          Comunication_data.jugador = parseInt(userId, 10);
          Comunication_data.carta = parseInt(selectedCard[1], 10);
          Comunication_data.casilla = [filaIndex, celdaIndex]; // [pos_x, pos_y]
          Comunication_data.objetivo = -1;
          Comunication_data.accion = 1;

          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/partidas/play`,
            Comunication_data,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          console.log("Respuesta del backend:", response.data);

          if (response.data.msg[0] === true || response.data.msg[0] === -1 || response.data.msg[0] === -2) {
            setIsLoading(true);
            setGameInfo(response.data);
            SetMsgJugada(response.data.msg);
            sessionStorage.setItem('Partida', JSON.stringify(response.data));
            setIsLoading(false);
          }

          if (response.data.msg[0] === false){
            setIsLoading(true);
            SetMsgJugada(response.data.msg);
            setIsLoading(false);
            setSelectedCard(null);
          }

          if (response.data.msg[0] === -3 || response.data.msg[0] === -4){
            setIsLoading(true);
            setGameInfo(response.data);
            SetMsgJugada(response.data.msg);
            sessionStorage.setItem('Partida', JSON.stringify(response.data));
            setIsLoading(false);
          
            setTimeout(() => {
              sessionStorage.removeItem('Partida');
            navigate('/profile'); // Ejecutar la navegación después del delay
            }, 5000); 
          }
        } catch (err) {
          console.log(err);
          setError(err.response?.data?.msg || 'Error al intentar jugar la carta');
        }
      }
    }
    setSelectedCard(null);
  };

  return (
    <div className="section">
      {isLoading ? (
        <div>Cargando datos...</div>
      ) : (
        <>
          <Round>Turno Actual: {gameInfo.jugadores.find(jugador => jugador.id === gameInfo.turno_actual).usuario}</Round>
          <TableroWidget
            tablero={gameInfo.tablero}
            imagenes={cartas}
            onCellClick={handleCellClick}
          />
          <MessageBox msg={msg_jugada} mazo={gameInfo.cartas_restantes}></MessageBox>
          <PlayerCards
            value={selectedCard}
            cartas={gameInfo.cartas}
            imagenes={cartas}
            setter={setSelectedCard}
            OnDiscard={handleDiscardCard}
          />
          <Players jugadores={gameInfo.jugadores} imagenes={skins} userId={userId} onPlayerSelect={handlePlayerSelect} />
          <Me jugadores={gameInfo.jugadores} imagenes={skins} userId={userId} is_evil={gameInfo.is_evil} onPlayerSelect={handlePlayerSelect}/>
        </>
      )}
    </div>
  );
}

export default InGame;
