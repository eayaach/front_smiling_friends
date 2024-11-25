import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import { GiOldLantern, GiMineWagon,  GiWarPick} from "react-icons/gi";
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
`
const IconosWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: center;
  align-items: center;
  svg {
    width: 25px; /* Aumenta el tamaño de los íconos */
    height: 25px;
    color: red; /* Cambia el color según sea necesario */
  }
`;

const NombreJugador = styled.span`
  font-size: 1rem;
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
            <JugadorWrapper>
              <Avatar> <img src={imageSrc} /></Avatar>
              <NombreJugador>{jugador.usuario}</NombreJugador>
            </JugadorWrapper>
            <IconosWrapper>
              <GiOldLantern />
              <GiMineWagon />
              <GiWarPick/>
            </IconosWrapper>
          </Jugador>
        );
      })}
    </ContenedorJugadores>
  );
}

export default Players;

