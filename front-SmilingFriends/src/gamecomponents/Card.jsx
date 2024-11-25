import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import './Card.css'
// Cambiar CardBox a un div
const CardBox = styled.div`
  width: 100px;
  height: 135px;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}
`;


function Card({ indice, imagen }) {
  // Renombrar el estado para evitar conflictos
  const [currentIndice, setCurrentIndice] = useState(null);
  const [currentImg, setCurrentImg] = useState(null);
  useEffect(() => {
    setCurrentImg(imagen);
    setCurrentIndice(indice);
  }, [currentImg, currentIndice]);
  console.log(currentImg);
  return (
    <CardBox className='glowing-wrapper'>
      <img src={imagen} alt={currentIndice} style={{ width: '100%', height: '100%' }} className='glowing-power'/>
    </CardBox>
  );
}

export default Card;
