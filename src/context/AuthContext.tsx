/* eslint-disable react-refresh/only-export-components */
//centraliza toda la autenticación JWT del sistema.
//para compartir el usuario autenticado y las funciones login/logout en toda la app
// Hooks y tipos de React
import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
// Funciones API JWT
import { loginRequest, logoutRequest, readStoredUser } from '../api/authApi'
// Tipo User
import type { User } from '../types/auth'

// Estructura global del contexto
interface AuthContextProps {
  user: User | null
  loading: boolean
  login: ( usuario: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}

// Contexto global autenticacion
const AuthContext = createContext({} as AuthContextProps)

// Provider principal JWT
export const AuthProvider = ({ children }: { children: ReactNode }) => {
   // Estado usuario
  const [user, setUser] = useState<User | null>(() => readStoredUser())
  // Estado loading
  const loading = false

  // Login usuario
  const login = async (usuario: string,password: string) => {
    try {
      // Consumir login API
      const response = await loginRequest(usuario,password)
      // Guardar JWT
      localStorage.setItem('token',response.token)
      // Guardar usuario
      setUser(response.user)
      // Login correcto
      return true
    } catch {
      // Login incorrecto
      localStorage.removeItem('token')
      setUser(null)
      return false
    }
  }

  // Logout sistema
  const logout = async () => {
    // Consumir logout API
    await logoutRequest().catch(() => undefined)
    // Eliminar token JWT
    localStorage.removeItem('token')
    // Limpiar usuario
    setUser(null)
  }

  // Compartir autenticación global
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }} >
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado autenticacion
export const useAuth = () => useContext(AuthContext)