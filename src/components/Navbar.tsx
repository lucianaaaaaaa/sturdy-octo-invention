//muestra información básica del usuario autenticado y permite cerrar sesión.
// Navegación entre rutas
import { useNavigate } from 'react-router-dom'
// Hook autenticación global
import { useAuth } from '../context/AuthContext'

// Componente Navbar
const Navbar = () => {
  // Usuario y logout global
  const { user, logout } = useAuth()
  // Hook navegación
  const navigate = useNavigate()

  const homeByRole = {
    Administrador: '/admin',
    Usuario: '/user'
  }[user?.rol ?? 'Usuario']

  // Cerrar sesion - Logout JWT
  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className="barra">
      <button className="brand" onClick={() => navigate(homeByRole)} type="button">
        Rick & Morty Frontend
      </button>

      <div className="user-meta">
        <span>
          Usuario: <strong>{user?.usuario}</strong>
        </span>
        <span className="role-pill">
          {user?.rol}
        </span>
        <button onClick={handleLogout} type="button">
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}

export default Navbar