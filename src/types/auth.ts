// Usuario autenticado
export interface User {
  id: number
  usuario: string
  rol: 'Administrador' | 'Invitado' | 'Colaborador'
}
// Roles permitidos en el sistema

// Respuesta del login JWT
export interface LoginResponse {
  success: boolean
  token: string
  user: User
}
// Estado del login y Token JWT firmado
// Datos del usuario