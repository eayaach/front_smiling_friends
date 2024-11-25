import React from 'react';
import styled from 'styled-components';
import './Card'

// Styled container for the board
const TableroContainer = styled.div`
  position: fixed;
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 columns */
  grid-template-rows: repeat(5, 1fr);    /* 5 rows */
  top: 8%;
  right: 37%;
  padding: 20px;
`;

// Styled image for each cell
const CeldaConImagen = styled.img`
  width: 85px;
  height: 110px;
  background-color: rgba(0,0,0, 0.2);
  cursor: pointer;
`;

function TableroWidget({ tablero = [], imagenes = {}, onCellClick }) {
  
  if (!Array.isArray(tablero) || !tablero.every(row => Array.isArray(row))) {
    console.error('Tablero inválido. Debe ser un array de arrays.');
    return <div>Error: Formato de tablero inválido.</div>;
  }

  const handleCellClick = (filaIndex, celdaIndex) => {
    console.log(`Celda clickeada: fila ${filaIndex}, columna ${celdaIndex}`);
    if (onCellClick) {
      onCellClick(filaIndex, celdaIndex);
    }
  };

  return (
    <TableroContainer>
      {tablero.map((fila, filaIndex) =>
        fila.map((celda, celdaIndex) => {
          const claveUnica = `${filaIndex}-${celdaIndex}-${celda ?? 'empty'}`;
          const imageSrc = imagenes[celda];

          return imageSrc ? (
            <div className='glowing-wrapper'>
            <CeldaConImagen
              key={claveUnica}
              src={imageSrc}
              alt={`Celda ${filaIndex}-${celdaIndex}`}
              className='glowing-power'
              onClick={() => handleCellClick(filaIndex, celdaIndex)} 
            />
            </div>
          ) : (
            <CeldaConImagen
              key={claveUnica}
              onClick={() => handleCellClick(filaIndex, celdaIndex)}
            />
          );
        })
      )}
    </TableroContainer>
  );
}

export { TableroWidget };
