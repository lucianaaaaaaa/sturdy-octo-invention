// Renderiza rutas hijas
import { Outlet } from 'react-router-dom'
// Navbar principal
import Navbar from '../components/Navbar'

const MainLayout = () => {
  return (
    <div className="app-shell">
      {/* Barra navegación */}
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
      {/* Contenido dinámico */}
    </div>
  )
}

export default MainLayout