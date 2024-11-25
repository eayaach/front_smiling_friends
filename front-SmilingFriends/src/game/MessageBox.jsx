import React, { useState, useEffect } from "react";

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
      <div style={styles.messageBox}>
        {isVisible? (msg) : (`Cartas restantes ${mazo}`)}
      <div style={styles.bubbleArrow}></div> {/* Triángulo inferior */}
    </div>
  );
}

const styles = {
  messageBox: {
    position: "absolute", // Corregir el typo
    top: "55vh",
    left: "8vw",
    display: "inline-block",
    maxWidth: "250px", // Ancho máximo del mensaje
    minWidth: "200px",
    minHeight: "50px", // Ajustar el tamaño mínimo
    padding: "15px 20px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    borderRadius: "25px", // Bordes redondeados para el efecto de burbuja
    border: "2px solid black", // Borde negro para el contorno
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Sombra para el efecto flotante
    textAlign: "center",
  },
  bubbleArrow: {
    position: "absolute", // Asegurar que sea absoluto
    bottom: "-20px", // Posicionar debajo del box
    left: "10%", // Centrar horizontalmente
    width: "0",
    height: "0",
    borderStyle: "solid",
    borderWidth: "20px 20px 0 20px", // Triángulo equilátero
    borderColor: "black transparent transparent transparent", // Color del triángulo
  },
};



export default MessageBox;
