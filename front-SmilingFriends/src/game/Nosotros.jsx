import React from 'react';

export default function Nosotros() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        height: 'auto',
        maxWidth: '1100px',
      }}
    >
      <div
        style={{
          padding: '2rem',
          backgroundColor: '#f4f4f9',
          borderRadius: '8px',
          width: '100%',
          textAlign: 'center',
          top: '70px',
          left: '245px',
          position: 'relative',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '1.5rem' }}>
          Sobre Nosotros
        </h1>

        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#555', marginBottom: '2rem' }}>
          Somos tres estudiantes de Ingeniería UC, unidos por el objetivo de desarrollar una versión
          moderna de Saboteur, un juego de mesa que nos encanta. 
        </p>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#555', marginBottom: '2rem' }}>
          ¡Esperamos que disfrutes de nuestra
          versión!
        </p>

        <div>
          <h2 style={{ fontSize: '2rem', color: '#333', marginBottom: '1rem' }}>
            Nuestro Equipo
          </h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ fontSize: '1.1rem', color: '#333', padding: '0.5rem 0' }}>
              Elías Ayaach- 3er año, major en Computación
            </li>
            <li style={{ fontSize: '1.1rem', color: '#333', padding: '0.5rem 0' }}>
              Jorge Jacque - 4to año, major en Investigación Operativa
            </li>
            <li style={{ fontSize: '1.1rem', color: '#333', padding: '0.5rem 0' }}>
              Mario Pedemonte - 3er año, major en Computación
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
