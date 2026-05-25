//Inicializa React
// Librería principal React
import React from 'react'
// Renderizado React DOM
import ReactDOM from 'react-dom/client'
// Componente principal App
import App from './App'
import './index.css'
// Contexto global JWT
import { AuthProvider } from './context/AuthContext'

// Crear aplicación React
ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    {/* Contexto autenticación */}
    <AuthProvider>
      {/* Aplicación principal */}
      <App />
    </AuthProvider>
  </React.StrictMode>
)