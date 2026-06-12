// Sistema rutas React
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
// Página login pública
import LoginPage from '../pages/LoginPage'
// Página landing
import LandingPage from '../pages/LandingPage'
// Página administrado
import AdminPage from '../pages/AdminPage'
// Página usuario
import CollaboratorPage from '../pages/CollaboratorPage'
// Pagina acceso denegado
import UnauthorizedPage from '../pages/UnauthorizedPage'
// Pag 404
import NotFoundPage from '../pages/NotFoundPage'
// Layout principal
import MainLayout from '../layouts/MainLayout'
// Proteccion JWT + Roles
import ProtectedRoute from '../components/ProtectedRoute'
// Contexto autenticación
import { useAuth } from '../context/AuthContext'

const roleHome = {
  Administrador: '/admin',
  Usuario: '/user'
} as const

const LandingRoute = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="loading-screen">Preparando sesión...</div>
  }

  if (user) {
    return <Navigate to={roleHome[user.rol]} replace />
  }

  return <LandingPage />
}

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path='/'
          element={<LandingRoute />}
        />

        <Route
          path='/login'
          element={<LoginPage />}
        />

        <Route
          element={<MainLayout />}
        >

          {/* Proteccion rol admin */}
          <Route
            path='/admin'
            element={
              <ProtectedRoute
                allowedRole='Administrador'
              >
                <AdminPage />
              </ProtectedRoute>
            }
          />

          {/* Proteccion rol usuario */}
          <Route
            path='/user'
            element={
              <ProtectedRoute
                allowedRole='Usuario'
              >
                <CollaboratorPage />
              </ProtectedRoute>
            }
          />

          {/* Alias para compatibilidad con rutas previas */}
          <Route
            path='/colaborador'
            element={<Navigate to='/user' replace />}
          />

          <Route
            path='/guest'
            element={<Navigate to='/user' replace />}
          />

        </Route>

        <Route
          path='/unauthorized'
          element={
            <UnauthorizedPage />
          }
        />

        <Route
          path='*'
          element={<NotFoundPage />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default AppRoutes