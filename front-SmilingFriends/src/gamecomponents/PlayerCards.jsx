import React from 'react';
import styled from 'styled-components';
import Card from './Card';

// Styled container for cards
const ContenedorCartas = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  height: auto;
  top: 75%;
  right: -1%;
  gap: 10px;
  padding: 2%;
  background-color: rgba(0, 0, 0, 0.5); // Translucent background
  border-radius: 10px;
  border: 2px solid #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  :hover {
      color:  #00FFFF;
      filter: drop-shadow(0 0 1em #00FFFF);
    }
`;

function PlayerCards({ cartas = [], imagenes = {}, value, setter }) {
  // Handle the card selection and update the state in the parent component
  const handleChange = (indice) => {
    const cartaSeleccionada = cartas[indice];  // Get the selected card data
    console.log(`Carta seleccionada: índice ${indice}, datos:`, cartaSeleccionada);
    setter(cartaSeleccionada);  // Update the parent state with the selected card
  };

  return (
    <ContenedorCartas>
      {cartas.map((carta, cartaIndice) => {
        const imageSrc = imagenes[carta.id_imagen]; // Get the image source for the card

        return (
          <Card
            key={cartaIndice}
            indice={cartaIndice}
            imagen={imageSrc}
            onClick={() => handleChange(cartaIndice)} // Call handleChange on click to update parent state
          />
        );
      })}
    </ContenedorCartas>
  );
}

export default PlayerCards;
