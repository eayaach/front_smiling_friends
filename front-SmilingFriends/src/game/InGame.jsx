import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import axios from 'axios';
import { SocketContext } from '../contexts/sockets/SocketContext';
import PartidaWidget from '../gamecomponents/partidawidget';
import {cargar_cartas} from '../common/images'
import { TableroWidget } from '../gamecomponents/Tablero';

function InGame() {
  const [gameInfo, setGameInfo] = useState({}); // Partidas
  const [error, setError] = useState(false);
  const [cartas, setCartas] = useState([]);
  const { token } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    async function fetchImages() {
      var cartas = await cargar_cartas();
      cartas = Object.keys(cartas).map(clave => ({ [clave]: cartas[clave] }))
      console.log(cartas);
      setCartas(cartas);
    }
    fetchImages();

    }, []);

  useEffect(() => {
    console.log("antes de entrar al socket");
    if (!socket?.current) return;
    console.log("entrando al socket");
    const handleGameUpdate = (data) => {
      setGameInfo(data);
      console.log("esto recibi: ", data)
    };

    socket.current?.on('PartidaInfo', handleGameUpdate);

    return () => {
      socket.current?.off('PartidaInfo', handleGameUpdate);
    };
  }, [socket.current]);

  return (
    <div>
        hola
      {/* <TableroWidget tablero={gameInfo.tablero} imagenes={cartas} /> */}
    </div>
  );
}

export default InGame;
