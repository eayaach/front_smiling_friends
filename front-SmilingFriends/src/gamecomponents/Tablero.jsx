import React from 'react';
import styled from 'styled-components';

const TableroContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 columnas */
  grid-template-rows: repeat(5, 1fr);   /* 5 filas */
  gap: 10px;
  padding: 20px;
`;

const CeldaConImagen = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const CeldaPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

function TableroWidget({ tablero, imagenes }) {
  return (
      <TableroContainer>
        {tablero.map((fila, filaIndex) =>
          fila.map((celda, celdaIndex) => {
            let imageSrc = imagenes[celda];
            return imageSrc ? (
              <CeldaConImagen
                key={`${filaIndex}-${celdaIndex}`}
                src={imageSrc}
                alt={`Celda ${filaIndex}-${celdaIndex}`}
              />
            ) : (
              <CeldaPlaceholder key={`${filaIndex}-${celdaIndex}`}>
                Sin Imagen
              </CeldaPlaceholder>
            );
          })
        )}
      </TableroContainer>
  );
}

export { TableroWidget };
