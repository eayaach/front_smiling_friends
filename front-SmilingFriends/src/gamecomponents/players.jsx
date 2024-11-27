import React from 'react';
import styled from 'styled-components';
import { GiOldLantern, GiMineWagon, GiWarPick } from "react-icons/gi";

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

const Avatar = styled.div`
  img {
    width: 75px;
    height: 75px;
    border-radius: 30%; /* Haz la imagen redonda */
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3), 10px 10px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Jugador = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const JugadorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
`;

const IconosWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: center;
  align-items: center;
  svg {
    width: 25px; /* Aumenta el tamaño de los íconos */
    height: 25px;
  }
`;

const Icono = styled.div`
  svg {
    color: ${(props) => (props.isBlocked ? 'red' : 'white')};
  }
`;

const NombreJugador = styled.span`
  font-size: 1rem;
  color: white;
  font-weight: bold;
`;

function Players({ jugadores, imagenes, userId, onPlayerSelect }) {
  return (
    <ContenedorJugadores>
      {jugadores.map((jugador, index) => {
        const imageSrc = imagenes[jugador.id_skin];
        const bloqueo = jugador.bloqueo || []; // Asegúrate de que `bloqueo` sea un array.

        return userId !== jugador.id && (
          <Jugador key={index} onClick={() => onPlayerSelect(jugador.id)}>
            <JugadorWrapper>
              <Avatar>
                <img src={imageSrc} alt={`Avatar de ${jugador.usuario}`} />
              </Avatar>
              <NombreJugador>{jugador.usuario}</NombreJugador>
            </JugadorWrapper>
            <IconosWrapper>
              <Icono isBlocked={bloqueo[0] === 1}>
                <GiOldLantern />
              </Icono>
              <Icono isBlocked={bloqueo[1] === 1}>
                <GiMineWagon />
              </Icono>
              <Icono isBlocked={bloqueo[2] === 1}>
                <GiWarPick />
              </Icono>
            </IconosWrapper>
          </Jugador>
        );
      })}
    </ContenedorJugadores>
  );
}

export default Players;
