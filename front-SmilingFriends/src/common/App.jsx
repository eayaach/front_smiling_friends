import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const navigate = useNavigate();

  return (
    <div className='Main'>
      <div className="card">
        <button>START</button>
        <button onClick={() => navigate('/available_games')}>JOIN</button>
      </div>
      <div class="neon-text">Saboteur</div>

    </div>
  )
}

export default App
