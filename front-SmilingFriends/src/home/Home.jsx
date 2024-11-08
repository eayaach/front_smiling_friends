import React from 'react';
import styled from 'styled-components';
import * as IoIcons from 'react-icons/io';
import {Link} from 'react-router-dom';

const HomeIcon = styled.div`
  display: flex;
  align-items: center;
  color: rgba(255,255,255,1);
  width: 70px; /* Aumenta el ancho */
  font-size: 3.5em; /* Aumenta el tamaño del icono */
  cursor: pointer;
  position: fixed; /* Fija la posición en la esquina superior derecha */
  top: 1rem; /* Ajusta la distancia desde el borde superior */
  right: 1rem; /* Ajusta la distancia desde el borde derecho */
  z-index: 1000;
`;

export default function Home() {
    return (
        <>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <HomeIcon>
                    <IoIcons.IoMdHome />
                </HomeIcon>
            </Link>
        </>
    );
}
