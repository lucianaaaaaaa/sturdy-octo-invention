// Sistema rutas React
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Página login pública
import LoginPage from '../pages/LoginPage'
// Página administrado
import AdminPage from '../pages/AdminPage'
// Página invitado
import GuestPage from '../pages/GuestPage'
// Página colaborador
import CollaboratorPage from '../pages/CollaboratorPage'
// Pagina acceso denegado
import UnauthorizedPage from '../pages/UnauthorizedPage'
// Pag 404
import NotFoundPage from '../pages/NotFoundPage'
// Layout principal
import MainLayout from '../layouts/MainLayout'
// Proteccion JWT + Roles
import ProtectedRoute from '../components/ProtectedRoute'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path='/'
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

          {/* Proteccion rol colaborador */}
          <Route
            path='/colaborador'
            element={
              <ProtectedRoute
                allowedRole='Colaborador'
              >
                <CollaboratorPage />
              </ProtectedRoute>
            }
          />

          {/* Proteccion rol invitado */}
          <Route
            path='/guest'
            element={
              <ProtectedRoute
                allowedRole='Invitado'
              >
                <GuestPage />
              </ProtectedRoute>
            }
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