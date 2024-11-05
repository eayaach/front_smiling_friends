import './Instructions.css';

export default function Instructions() {
  return (
    <>
      <h2>Reglas del Juego - Saboteur y Mineros</h2>
      
      <div className="title">
        <h1>Saboteur</h1>
      </div>

      <div className="section">
        <h2>1. Asignación de roles</h2>
        <p>A cada jugador se le asigna una clase al azar, que puede ser "Saboteur" o "Minero".</p>
      </div>

      <div className="section">
        <h2>2. Turnos de los jugadores</h2>
        <p>Los jugadores jugarán por turnos, los cuales serán decididos al azar.</p>
      </div>

      <div className="section">
        <h2>3. Tablero del juego</h2>
        <ul>
          <li>El tablero está compuesto por una matriz de 5x7 casillas.</li>
          <li>El inicio de los jugadores estará en la casilla (5, 4).</li>
          <li>Las casillas (1,1), (1,3) y (1,5) serán los tres puntos donde puede estar el oro.</li>
          <li>La ubicación del oro se decide al azar al principio del juego.</li>
        </ul>
      </div>

      <div className="section">
        <h2>4. Cartas del juego</h2>
        <p>
          Cada jugador recibe 4 cartas al azar y debe usar o botar una carta en su turno,
          luego debe robar una nueva carta del mazo. Los tipos de cartas son:
        </p>
        <ul>
          <li>Carta de bloqueo: Permite bloquear a cualquier jugador si no está bloqueado.</li>
          <li>Carta de desbloqueo: Permite desbloquear a un jugador bloqueado, si coincide el tipo de bloqueo.</li>
          <li>Carta de camino: Se usa para construir caminos en casillas libres.</li>
          <li>Carta de mapa: Permite revisar una de las tres cartas finales para anunciar si hay oro.</li>
          <li>Carta de derrumbe: Destruye caminos ya construidos por los jugadores.</li>
        </ul>
        <p>Tipos de cartas de bloqueo y desbloqueo:</p>
        <ul>
          <li>Linterna</li>
          <li>Pica</li>
          <li>Carreta</li>
        </ul>
      </div>

      <div className="section">
        <h2>5. Reglas de bloqueo y desbloqueo</h2>
        <ul>
          <li>Solo se puede bloquear a un jugador si no está bloqueado previamente.</li>
          <li>Un jugador bloqueado solo puede botar cartas o desbloquearse.</li>
          <li>Solo se puede desbloquear a un jugador con una carta que coincida con el tipo de bloqueo.</li>
        </ul>
      </div>

      <div className="section">
        <h2>6. Objetos sorpresa</h2>
        <p>
          En las casillas libres habrá 5 objetos sorpresa al azar que otorgarán uno de los siguientes beneficios:
        </p>
        <ul>
          <li>Objeto de turno doble: Permite jugar una carta adicional en su turno.</li>
          <li>Objeto de inmunidad a bloqueo (linterna, pica o carreta): Impide el bloqueo de ese tipo.</li>
        </ul>
        <p>Si un jugador intenta bloquear a otro con inmunidad, perderá su turno.</p>
      </div>

      <div className="section">
        <h2>7. Reglas de los caminos</h2>
        <ul>
          <li>Las cartas de camino solo se pueden colocar en casillas libres, si existe un camino compatible adyacente.</li>
          <li>Los caminos tienen cuatro entradas (arriba, abajo, izquierda y derecha) que deben conectarse con los caminos adyacentes.</li>
        </ul>
      </div>

      <div className="section">
        <h2>8. Condiciones de victoria</h2>
        <ul>
          <li>El juego termina cuando los jugadores construyen un camino hasta el oro o cuando se agotan las cartas del mazo.</li>
          <li>Los saboteurs ganan si se agotan las cartas del mazo.</li>
          <li>Los mineros ganan si llegan al oro.</li>
        </ul>
      </div>

    </>
  );
}
