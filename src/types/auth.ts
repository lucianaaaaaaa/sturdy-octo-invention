// Usuario autenticado
export interface User {
  id: number
  usuario: string
  rol: 'Administrador' | 'Usuario'
}
// Roles permitidos en el sistema

// Credenciales utilizadas en la demo local
export interface DemoCredentials {
  usuario: string
  password: string
  rol: User['rol']
}

// Respuesta del login JWT
export interface LoginResponse {
  success: boolean
  token: string
  user: User
}
// Estado del login y Token JWT firmado
// Datos del usuario

// Payload JWT simulado para la app frontend
export interface JwtPayload {
  sub: number
  usuario: string
  rol: User['rol']
  exp: number
}