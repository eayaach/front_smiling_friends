import React, { useEffect } from 'react';
import styled from 'styled-components';
import Card from './Card';

// Styled container for cards
const ContenedorCartas = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  height: auto;
  bottom: -1%;
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

const DiscardButton = styled.button`
  position: fixed;
  bottom: 200px;
  right: 180px;
  background: linear-gradient(145deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8));
  border: 2px solid rgba(255, 0, 0, 0.8); 
  border-radius: 15px; 
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.5),
              0 0 30px rgba(255, 0, 0, 0.3); 
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  max-width: 200px;
  text-align: center;
  text-shadow: 0 0 5px rgba(255, 0, 0, 0.8),
               0 0 10px rgba(255, 0, 0, 0.6);
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

  /* Animación exclusiva para el botón */
  animation: buttonGlow 1.5s infinite alternate;

  @keyframes buttonGlow {
    from {
      box-shadow: 0 0 15px rgba(255, 0, 0, 0.5),
                  0 0 30px rgba(255, 0, 0, 0.3);
    }
    to {
      box-shadow: 0 0 25px rgba(255, 0, 0, 0.8),
                  0 0 50px rgba(255, 0, 0, 0.5);
    }
  }

  :hover {
    background-color: rgba(255, 0, 0, 0.8);
    box-shadow: 0 0 25px rgba(255, 0, 0, 0.8),
                0 0 50px rgba(255, 0, 0, 0.6);
  }

  :disabled {
    background: linear-gradient(145deg, rgba(128, 128, 128, 0.5), rgba(64, 64, 64, 0.8));
    border: 2px solid rgba(192, 192, 192, 0.8);
    box-shadow: 0 0 10px rgba(128, 128, 128, 0.5),
                0 0 20px rgba(128, 128, 128, 0.3);
    cursor: not-allowed;
    text-shadow: 0 0 5px rgba(128, 128, 128, 0.8),
                 0 0 10px rgba(128, 128, 128, 0.6);
  }
`;


function PlayerCards({ cartas = [], imagenes = {}, value, setter, OnDiscard }) {
  // Handle the card selection and update the state in the parent component
  const handleChange = (indice) => {
    const cartaSeleccionada = cartas[indice]; // Get the selected card data
    console.log(`Carta seleccionada: índice ${indice}, datos:`, cartaSeleccionada);
    setter([cartaSeleccionada, indice]); // Adjust to store index for queries
  };

  return (
    <>
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
      <DiscardButton onClick={OnDiscard} disabled={!value}>
        Descartar
      </DiscardButton>
    </>
  );
}

export default PlayerCards;
