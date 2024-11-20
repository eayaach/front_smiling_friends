import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import axios from 'axios';
import './CreateGames.css';
import { Link, useNavigate } from 'react-router-dom';
import { SocketContext } from '../contexts/sockets/SocketContext';

export default function CreateGames() {
  const token = localStorage.getItem('token');
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [jugadores_max, setJugadores] = useState(4);
  const { gameId, setGameId } = useContext(AuthContext);
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();
  const increment = () => {

    if(jugadores_max < 5 ){
        setJugadores(jugadores_max+1);
    }
  }
  const decrement = () => {

    if(jugadores_max > 4 ){
        setJugadores(jugadores_max-1);
    }
  }
  const handleChange = (event) => {
    const newValue = parseInt(event.target.value, 10); // Asegúrate de convertir a número
    setJugadores(newValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { jugadores_max: parseInt(jugadores_max, 10) };

    try {
      // Crear la partida
      const partidaResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/partidas/create`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(partidaResponse);
      const partidaId = partidaResponse.data.id; // Guardamos el ID en una variable local
      setGameId(partidaId); // Actualizamos el estado (aunque no lo usamos aquí directamente)

      console.log("Se creó la partida con éxito");

      // Crear la solicitud para unir al creador
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/solicitudes/create`,
        { id_partida: partidaId, id_jugador: user_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("El jugador se unió a la partida con éxito");
      // Redirigimos a la sala de espera
      navigate(`/waiting_room/${partidaId}`);
    } catch (error) {
      console.error("Ocurrió un error:", error);

      if (error.response && error.response.data && error.response.data.msg) {
        setMsg(error.response.data.msg);
      } else {
        setMsg("Usuario no encontrado o credenciales incorrectas");
      }
      setError(true);
    }
  };



  return (
    <>
      <h1 className='neon-text'>New Game</h1>
      <div className="NewGameContainer">
        <label>Number of Players:</label>
        <div className="number-input">
            <button onClick={decrement} className="minus"></button>
            <input className="quantity" min="4" name="quantity" value={jugadores_max} type="number" onChange={handleChange}/>
            <button onClick={increment} className="plus"></button>
        </div>
        {error && <div className="error-message">{msg}</div>}
        <button className="CreateButton" onClick={handleSubmit}>Create</button>
      </div>
    </>

  );
}