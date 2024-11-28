import { useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AuthContext } from '../contexts/auth/AuthContext';

function App() {
  const navigate = useNavigate();
  const { isAdmin, isOnline } = useContext(AuthContext);

  const handleStartClick = () => {
    if (!isOnline) {
      navigate('/login'); // Redirige al login si no está online
    } else {
      navigate('/create_games'); // Redirige a la página de crear juegos si está online
    }
  };

  const handleJoinClick = () => {
    if (!isOnline) {
      navigate('/login'); // Redirige al login si no está online
    } else {
      navigate('/available_games'); // Redirige a la página de juegos disponibles si está online
    }
  };

  return (
    <section className='main'>
      <div className="neon-text">Saboteur</div>
      <div className='button-container'>
        {(sessionStorage.getItem("Partida")) && <button  className="startButtons" onClick={() => navigate('/ingame')}>Partida</button>}
        {!(sessionStorage.getItem("Partida")) && <div>
        <button className="startButtons" onClick={handleStartClick}>START</button>
        <button className="startButtons" onClick={handleJoinClick}>JOIN</button>
        </div>}
      </div>
      <div className='admin-stuff'>
        {isOnline && isAdmin && <button onClick={() => navigate('/admin_panel')}>ADMIN PANEL</button>}
        {isOnline && <button  onClick={() => navigate('/make_admin')}>MAKE ADMIN</button>}
      </div>
    </section>
  )
}

export default App
