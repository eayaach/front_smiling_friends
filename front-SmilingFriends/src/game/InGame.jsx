import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import axios from 'axios';
import { SocketContext } from '../contexts/sockets/SocketContext';
import PartidaWidget from '../gamecomponents/partidawidget';
import {cargar_cartas} from '../common/images'
import { TableroWidget } from '../gamecomponents/Tablero';
import PlayerCards  from '../gamecomponents/PlayerCards';

function InGame() {
  const [gameInfo, setGameInfo] = useState({}); // Partidas
  const [error, setError] = useState(false);
  const [cartas, setCartas] = useState([]);
  const { token } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [selectedCard, SetSelectedCard] = useState(null); // esta prop la gatilla el jugador en el playerCards
  const userId = sessionStorage.getItem("user_id");

  useEffect(() => {
    async function fetchImages() {
      var cartas = await cargar_cartas();
      cartas = Object.keys(cartas).map(clave => ( cartas[clave]))
      setCartas(cartas);
      console.log(cartas);
    }
    fetchImages();

    async function fetchGameData() {
      const partida = JSON.parse(sessionStorage.getItem('Partida'))
      setGameInfo(partida);
      console.log(partida);
    }
    fetchGameData();

    }, []);

  return (
    <div className='section'>
      <TableroWidget tablero={gameInfo.tablero} imagenes={cartas} />
      <PlayerCards value={selectedCard} cartas={gameInfo.cartas} imagenes={cartas} setter={SetSelectedCard}></PlayerCards>
    </div>
  );
}

export default InGame;
