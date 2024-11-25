import React from 'react';
import styled from 'styled-components';
import Card from './Card';


const ContenedorCartas = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  height: auto;
  top: 75%;
  right: -1%;
  gap: 10px;
  padding: 2%;
  border-radius: 10px;
  border: 2px solid #ffffff;
  backdrop-filter: blur(5px);
  :hover {
      color:  #00FFFF;
      filter: drop-shadow(0 0 1em #00FFFF);
    }
`;



// este componente debe
function PlayerCards({ cartas = [], imagenes = {}, value, setter}) {
   const handleChange = (event) => {

   }

  return (
      <ContenedorCartas>
        {cartas.map((carta, cartaIndice) => {
            const imageSrc = imagenes[carta.id_imagen];
            // console.log(imageSrc)
            // console.log(carta);
            return (
              <Card
                key={cartaIndice}
                imagen={imageSrc}
                indice={cartaIndice}
                onClick={handleChange} // propiedad que gatillara un cambio en la carta seleccionada en
                // el padre
              />
            );})}
      </ContenedorCartas>
  );
}

export default  PlayerCards;
