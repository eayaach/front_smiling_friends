import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import { SocketContext } from '../contexts/sockets/SocketContext';
import PartidaWidget from '../gamecomponents/partidawidget';
import { cargar_cartas, cargar_skins } from '../common/images';
import { TableroWidget } from '../gamecomponents/Tablero';
import PlayerCards from '../gamecomponents/PlayerCards';
import Players from '../gamecomponents/players';
import Me from '../gamecomponents/Me';

function InGame() {
  const [gameInfo, setGameInfo] = useState({ jugadores: [], cartas: [], tablero: null });
  const [error, setError] = useState(false);
  const [cartas, setCartas] = useState([]);
  const [skins, setSkins] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga
  const [selectedCard, setSelectedCard] = useState(null); // Carta seleccionada
  const { token } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const userId = sessionStorage.getItem("user_id");

  useEffect(() => {
    async function fetchData() {
      try {
        // Cargar cartas e imágenes
        const cartasData = await cargar_cartas();
        const cartas = Object.keys(cartasData).map(clave => cartasData[clave]);
        setCartas(cartas);

        // Cargar skins
        const skinsData = await cargar_skins();
        const skins = Object.keys(skinsData).map(clave => skinsData[clave]);
        setSkins(skins);

        // Obtener datos de la partida desde el sessionStorage
        const partida = JSON.parse(sessionStorage.getItem("Partida"));
        setGameInfo(partida);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Manejador de clics en las celdas del tablero
  const handleCellClick = (filaIndex, celdaIndex) => {
    if (!selectedCard) {
      console.log("No hay carta seleccionada.");
      return;
    }

    // Actualiza el tablero con la carta seleccionada
    setGameInfo((prevGameInfo) => {
      const nuevoTablero = [...prevGameInfo.tablero];
      nuevoTablero[filaIndex][celdaIndex] = selectedCard.id_imagen; // Actualiza con el ID de la imagen
      return { ...prevGameInfo, tablero: nuevoTablero };
    });

    // Desseleccionar la carta después de colocarla
    setSelectedCard(null);
  };

  return (
    <div className="section">
      {isLoading ? (
        <div>Cargando datos...</div> // Puedes usar un componente de carga más visual
      ) : (
        <>
          <TableroWidget
            tablero={gameInfo.tablero}
            imagenes={cartas}
            onCellClick={handleCellClick} // Pasa el manejador al tablero
          />
          <PlayerCards
            value={selectedCard}
            cartas={gameInfo.cartas}
            imagenes={cartas}
            setter={setSelectedCard} // Establecer la carta seleccionada
          />
          <Players jugadores={gameInfo.jugadores} imagenes={skins} userId={userId} />
          <Me jugadores={gameInfo.jugadores} imagenes={skins} userId={userId} is_evil={gameInfo.is_evil} />
        </>
      )}
    </div>
  );
}

export default InGame;
