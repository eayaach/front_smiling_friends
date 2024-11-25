import React, { useState, useEffect } from "react";
import styled from 'styled-components';


const Round = styled.div`
  position: fixed;
  background: linear-gradient(145deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8));
  border: 2px solid rgba(0, 255, 255, 0.8); /* Crea un borde brillante */
  border-radius: 15px; /* Esquinas redondeadas */
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5),
              0 0 30px rgba(0, 255, 255, 0.3); /* Sombra con brillo */
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 10px;
  width: 20wv;
  height: 5vh;
  font-size: 0.8em;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.8),
               0 0 10px rgba(0, 255, 255, 0.6); /* Brillo en el texto */
  animation: glow 1.5s infinite alternate; /* Animación para brillo */
  @keyframes glow {
  from {
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5),
                0 0 30px rgba(0, 255, 255, 0.3);
  }
  to {
    box-shadow: 0 0 25px rgba(0, 255, 255, 0.8),
                0 0 50px rgba(0, 255, 255, 0.5);
     }
  }
  right: -0.5%;
  top: 20%;
`;



function MessageBox({ msg, mazo }) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (msg) {
      setIsVisible(true); // Mostrar el box cuando `msg` cambie
      const timer = setTimeout(() => {
        setIsVisible(false); // Ocultar el box después de 3 segundos
      }, 3000); // Cambia el tiempo según sea necesario (3000 ms = 3 segundos)

      return () => clearTimeout(timer); // Limpiar el temporizador si `msg` cambia antes de que termine
    }
  }, [msg]); // Ejecutar cada vez que `msg` cambie

  return (
    <Round>
        {isVisible? (msg) : (`Cartas restantes ${mazo}`)}
    </Round>
  );
}

export default MessageBox;
