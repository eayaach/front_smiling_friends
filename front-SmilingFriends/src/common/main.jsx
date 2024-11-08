import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Routing from './Routing.jsx'
import AuthProvider from '../contexts/auth/AuthProvider.jsx'
import SocketProvider from '../contexts/sockets/SocketProvider.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
        <SocketProvider><Routing /></SocketProvider>
      </AuthProvider>
  </React.StrictMode>,
)
