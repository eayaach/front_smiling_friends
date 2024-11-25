import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './Card.css'
// Cambiar CardBox a un div
const CardBox = styled.div`
  width: 85px;   // Size from the first script
  height: 110px; // Size from the first script
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; /* Asegura que el cursor cambie al pasar sobre la carta */

`;

function Card({ indice, imagen, onClick }) {
  const [currentIndice, setCurrentIndice] = useState(null);
  const [currentImg, setCurrentImg] = useState(null);

  useEffect(() => {
    setCurrentImg(imagen);
    setCurrentIndice(indice);
  }, [imagen, indice]); // Corregimos dependencias para evitar referencias inválidas

  return (
    <CardBox onClick={() => onClick(indice)} className='glowing-wrapper'> {/* Manejar clic aquí */}
      <img
        src={currentImg}
        alt={`Carta ${currentIndice}`}
        style={{ width: '100%', height: '100%' }}
      />
    </CardBox>
  );
}

export default Card;
