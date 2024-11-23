import React,  { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth/AuthContext';



const CustomBackground = styled.div`
  background-image: url(${props => props.game_image[0]});
  background-size: cover;
  background-position: center;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0,0, 0.2); /* Blanco semi-transparente */
    z-index: -1; /* Asegura que el overlay esté detrás del contenido */
    border-radius: 10px;
  }
`;


function PartidaWidget({creador, actuales, max, id, game_image, game_id}) {
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    const { gameId, setGameId } = useContext(AuthContext);
    const handleUserJoin = async () => {
      try {
        console.log("partida de id: ", game_id)
        console.log(userId)
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/solicitudes/create`,
          { id_partida: game_id, id_jugador: userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("te uniste con exito")
        setGameId(game_id)

        navigate(`/waiting_room/${game_id}`);
      } catch(error){
        console.log(error)
      }
    };

    return (
        <>
        <CustomBackground className="box" game_image={game_image}>
            <h2> {`Partida de ${creador}`}</h2>
            <h3> {`${actuales}/${max}`}</h3>
            <button onClick={handleUserJoin}> Unirse</button>
        </CustomBackground>
        </>
    )
}

export default PartidaWidget;