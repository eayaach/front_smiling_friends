import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Routing from './Routing.jsx'
import AuthProvider from '../auth/AuthProvider'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
        <Routing />
      </AuthProvider>
  </React.StrictMode>,
)
