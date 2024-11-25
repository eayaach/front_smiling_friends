import React from 'react';
import styled from 'styled-components';

const TableroContainer = styled.div`
  position: fixed;
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 columnas */
  grid-template-rows: repeat(5, 1fr);   /* 5 filas */
  top: 8%;
  right: 32%;
  padding: 20px;
`;

const CeldaConImagen = styled.img`
  width: 85px;
  height: 110px;
  background-color: rgba(0,0,0, 0.2)
`;


function TableroWidget({ tablero = [], imagenes = {} }) {
  if (!Array.isArray(tablero) || !tablero.every(row => Array.isArray(row))) {
    console.error('Tablero inválido. Debe ser un array de arrays.');
    return <div>Error: Formato de tablero inválido.</div>;
  }

  return (
    <TableroContainer>
      {tablero.map((fila, filaIndex) =>
        fila.map((celda, celdaIndex) => {
          const claveUnica = `${filaIndex}-${celdaIndex}-${celda ?? 'empty'}`;
          const imageSrc = imagenes[celda];
          console.log(celda);
          return imageSrc ? (
            <CeldaConImagen
              key={claveUnica}
              src={imageSrc}
              alt={`Celda ${filaIndex}-${celdaIndex}`}
            />
          ) : (
            <CeldaConImagen key={claveUnica}>
            </CeldaConImagen>
          );
        })
      )}
    </TableroContainer>
  );
}

export { TableroWidget };
