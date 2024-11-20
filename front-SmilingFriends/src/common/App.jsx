import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const navigate = useNavigate();

  return (
    <section className='main'>
      <div className="neon-text">Saboteur</div>
      <div className='button-container'>
        <button className="startButtons" onClick={() => navigate('/create_games')}>START</button>
        <button className="startButtons" onClick={() => navigate('/available_games')}>JOIN</button>
      </div>
    </section>
  )
}

export default App
