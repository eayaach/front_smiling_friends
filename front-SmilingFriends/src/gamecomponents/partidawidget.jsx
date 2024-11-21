import React from 'react';
import styled from 'styled-components';



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


function PartidaWidget({creador, actuales, max, id, game_image}) {

    const handleUserJoin = () => {
        return;
    }
    console.log(game_image)
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