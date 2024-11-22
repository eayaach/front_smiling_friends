import { useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AuthContext } from '../contexts/auth/AuthContext';

function App() {
  const navigate = useNavigate();
  const { isAdmin, isOnline } = useContext(AuthContext);

  return (
    <section className='main'>
      <div className="neon-text">Saboteur</div>
      <div className='button-container'>
        <button className="startButtons" onClick={() => navigate('/create_games')}>START</button>
        <button className="startButtons" onClick={() => navigate('/available_games')}>JOIN</button>
        {isOnline && isAdmin && <button className="startButtons" onClick={() => navigate('/admin_panel')}>ADMIN PANEL</button>}
        {isOnline && <button className="startButtons" onClick={() => navigate('/make_admin')}>MAKE ADMIN</button>}
      </div>
    </section>
  )
}

export default App
