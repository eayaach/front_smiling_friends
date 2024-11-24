import React from 'react';
import styled from 'styled-components';
import Card from './Card';


const ContenedorCartas = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  height: auto;
  top: 62%;
  left: 65%;
  gap: 3%;
  padding: 2%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  border: 2px solid #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
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
