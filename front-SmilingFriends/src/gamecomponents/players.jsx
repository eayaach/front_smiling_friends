import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const ContenedorJugadores = styled.div`
  position: fixed;
  left: -1%;
  top: 12%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 2%;
  border-radius: 10px;
  border: 2px solid #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
`;

const Avatar= styled.div`
    img {
    width: 75px;
    height: 75px;
    border-radius: 30%; /* Haz la imagen redonda */
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3), 10px 10px 15px rgba(0, 0, 0, 0.2);
    }
`;

const Jugador = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NombreJugador = styled.span`
  font-size: 1.2rem;
  color: white;
  font-weight: bold;
`;

function Players({ jugadores, imagenes, userId}) {
  return (
    <ContenedorJugadores>
      {jugadores.map((jugador, index) => {
        const imageSrc = imagenes[jugador.id_skin];
        console.log(jugador.id);
        return (userId != jugador.id) && (
          <Jugador key={index}>
            <Avatar> <img src={imageSrc} /></Avatar>
            <NombreJugador>{jugador.usuario}</NombreJugador>
          </Jugador>
        );
      })}
    </ContenedorJugadores>
  );
}

export default Players;

