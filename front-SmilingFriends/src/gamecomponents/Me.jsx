import React from 'react';
import styled from 'styled-components';
import { GiOldLantern, GiMineWagon,  GiWarPick} from "react-icons/gi";

const ContenedorMe = styled.div`
  position: fixed;
  right: -1%;
  top: 35%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 2%;
  border-radius: 10px;
  border: 2px solid #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
`;

const MiAvatar= styled.div`
    img {
    width: 100px;
    height: 100px;
    border-radius: 30%; /* Haz la imagen redonda */
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3), 10px 10px 15px rgba(0, 0, 0, 0.2);
    }
`;

const Jugador = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
`;

const NombreJugador = styled.span`
  font-size: 2rem;
  color: white;
  font-weight: bold;
`;
const Saboteur = styled.span`
  font-size: 1rem;
  color: red;
  font-weight: bold;
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
    color: red; /* Cambia el color según sea necesario */
  }
`;


function Me({ jugadores, imagenes, userId, is_evil}) {
  return (
      <ContenedorMe>
      {jugadores.map((jugador, index) => {
        const imageSrc = imagenes[jugador.id_skin];
        console.log(jugador.id);
        return (userId == jugador.id) && (
          <Jugador key={index + 21177}>
            <MiAvatar> <img src={imageSrc} /></MiAvatar>
            <NombreJugador>yo</NombreJugador>
            { is_evil && <Saboteur>Saboteur</Saboteur>}
          </Jugador>
        );
      })}
      <IconosWrapper>
        <GiOldLantern />
        <GiMineWagon />
        <GiWarPick/>
      </IconosWrapper>
      </ContenedorMe>
  );
}

export default Me;

