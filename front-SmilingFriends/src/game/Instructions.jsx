import './Instructions.css';
import React, { useState, useEffect } from 'react';
import cartainicio from '../img/Cartas/32.png'
import cartaoro from '../img/Cartas/33.png'
import cartacarbon from '../img/Cartas/34.png'
import {cargar_cartas}  from '../common/images';


export default function Instructions() {
  const [image_dir, setImages] = useState({});

  useEffect(() => {
    async function fetchImages() {
      const image_dir = await cargar_cartas();
      setImages(image_dir);
    }

    fetchImages();
  }, []);
  return (
    <>
       <div className='section'>

        <div className="title">
            <div className="neon-text">Saboteur</div>
        </div>

        <div className='box'>
          <div className="text-element">
            <h2>1. Asignación de roles</h2>
            <p>A cada jugador se le asigna una clase al azar, que puede ser "Saboteur" o "Minero".</p>
          </div>

          <div className="text-element">
            <h2>2. Turnos de los jugadores</h2>
            <p>Los jugadores jugarán por turnos, los cuales serán decididos al azar.</p>
          </div>

          <div className="text-element">
            <h2>3. Tablero del juego</h2>
            <div>
              <ul>
                <li>El tablero está compuesto por una matriz de 5x7 casillas.</li>
                <li>El inicio de los jugadores estará en la casilla (5, 4).</li>
                <li>Las casillas (1,1), (1,3) y (1,5) serán los tres puntos donde puede estar el oro.</li>
                <li>La ubicación del oro se decide al azar al principio del juego.</li>
              </ul>
            </div>
            <div>
              <span className='imagenes'>
                <div className='img-element'>
                  <img src={image_dir[32]} className='card'></img>
                  <p> carta de inicio</p>
                </div>
                <div className='img-element'>
                  <img src={image_dir[33]}  className='card'></img>
                  <p> carta de oro</p>
                </div>
                <div className='img-element'>
                  <img src={image_dir[34]}  className='card'></img>
                  <p> carta de carbon</p>
                </div>
              </span>
            </div>
          </div>
          <div className="text-element">
            <h2>4. Cartas del juego</h2>
            <p>
              Cada jugador recibe 4 cartas al azar y debe usar o botar una carta en su turno,
              luego debe robar una nueva carta del mazo. Los tipos de cartas son:
            </p>
            <ul>
              <div className='horizontal-element'>
              <li>Carta de bloqueo: Permite bloquear a cualquier jugador si no está bloqueado.</li>
              <div>
              <span className='imagenes'>
                <div className='img-element'>
                  <img src='' className='card'></img>
                  <img src={image_dir[13]}  className='card'></img>
                  <p> bloqueo doble</p>
                </div>
                <div className='img-element'>
                  <img src={image_dir[8]}  className='card'></img>
                  <p> bloqueo simple</p>
                </div>
                <div className='img-element'>
                  <img src={image_dir[7]}  className='card'></img>
                  <p> bloqueo triple</p>
                </div>
              </span>
              </div>
              </div>

              <div className='horizontal-element'>
              <li>Carta de desbloqueo: Permite desbloquear a un jugador bloqueado, si coincide el tipo de bloqueo.</li>
              <div>
              <span className='imagenes'>
                <div className='img-element'>
                  <img src={image_dir[2]} className='card'></img>
                  <p> Desbloqueo simple</p>
                </div>
                <div className='img-element'>
                  <img src={image_dir[4]}  className='card'></img>
                  <p> Desbloqueo doble</p>
                </div>
                <div className='img-element'>
                  <img src={image_dir[6]}  className='card'></img>
                  <p> Desbloqueo triple</p>
                </div>
              </span>
              </div>
              </div>

              <div className='horizontal-element'>
              <li>Carta de camino: Se usa para construir caminos en casillas libres.</li>
              <div>
              <span className='imagenes'>
                <div className='img-element'>
                  <img src={image_dir[20]} className='card'></img>
                  <p> cruce triple</p>
                </div>
                <div className='img-element'>
                  <img src={image_dir[24] }  className='card'></img>
                  <p> cruce doble</p>
                </div>
                <div className='img-element'>
                  <img src={image_dir[29]}  className='card'></img>
                  <p> camino bloqueado</p>
                </div>
              </span>
              </div>
              </div>

              <div className='horizontal-element'>
              <li>Carta de mapa: Permite revisar una de las tres cartas finales para anunciar si hay oro.</li>
              <div>
              <span className='imagenes'>
                <div className='img-element'>
                  <img src={image_dir[15]} className='card'></img>
                  <p> Mapa </p>
                </div>
              </span>
              </div>
              <li>Carta de derrumbe: Destruye caminos ya construidos por los jugadores.</li>
              <div>
              <span className='imagenes'>
                <div className='img-element'>
                  <img src={image_dir[14]} className='card'></img>
                  <p> Derrumbe</p>
                </div>
              </span>
              </div>
              </div>
            </ul>
            <p>Tipos de cartas de bloqueo y desbloqueo:</p>
            <ul>
              <li>Linterna</li>
              <li>Pica</li>
              <li>Carreta</li>
            </ul>
            </div>


          <div className="text-element">
            <h2>5. Reglas de bloqueo y desbloqueo</h2>
            <ul>
              <li>Solo se puede bloquear a un jugador si no está bloqueado previamente.</li>
              <li>Un jugador bloqueado solo puede botar cartas o desbloquearse.</li>
              <li>Solo se puede desbloquear a un jugador con una carta que coincida con el tipo de bloqueo.</li>
            </ul>
          </div>

          <div className="text-element">
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

          <div className="text-element">
            <h2>7. Reglas de los caminos</h2>
            <ul>
              <li>Las cartas de camino solo se pueden colocar en casillas libres, si existe un camino compatible adyacente.</li>
              <li>Los caminos tienen cuatro entradas (arriba, abajo, izquierda y derecha) que deben conectarse con los caminos adyacentes.</li>
            </ul>
          </div>

          <div className="text-element">
            <h2>8. Condiciones de victoria</h2>
            <ul>
              <li>El juego termina cuando los jugadores construyen un camino hasta el oro o cuando se agotan las cartas del mazo.</li>
              <li>Los saboteurs ganan si se agotan las cartas del mazo.</li>
              <li>Los mineros ganan si llegan al oro.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
