import React, { useState, useEffect } from 'react';
import './AvailableGames.css'; // Importa el archivo CSS para estilos adicionales

function AvailableGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Simulación de llamada a una API para obtener las partidas
    function fetchGames() {
      const fakeGames = [
        { id: 1, name: "Partida 1", status: "Esperando jugadores", privacy: "Pública" },
        { id: 2, name: "Partida 2", status: "Esperando jugadores", privacy: "Privada" },
      ];
      setGames(fakeGames);
    }
    fetchGames();
  }, []);

  const joinGame = (gameId) => {
    console.log(`Unirse a la partida con ID: ${gameId}`);
  };

  return (
    <div>
      <h2>Partidas Disponibles</h2>
      <table className="games-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Tipo</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {games.map(game => (
            <tr key={game.id}>
              <td>{game.name}</td>
              <td>{game.status}</td>
              <td>{game.privacy}</td>
              <td>
                <button className="join-button" onClick={() => joinGame(game.id)}>
                  Unirse
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AvailableGames;
