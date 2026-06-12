import type { DemoCredentials, JwtPayload, LoginResponse, User } from '../types/auth'

const demoAccounts: Array<DemoCredentials & { id: number }> = [
  { id: 1, usuario: 'admin', password: 'admin123', rol: 'Administrador' },
  { id: 2, usuario: 'user', password: 'user123', rol: 'Usuario' }
]

const TOKEN_TTL_MS = 1000 * 60 * 60 * 8

const encodePayload = (payload: JwtPayload) => btoa(JSON.stringify(payload))

const decodePayload = (token: string) => {
  const parts = token.split('.')

  if (parts.length !== 3) {
    throw new Error('Invalid token')
  }

  return JSON.parse(atob(parts[1])) as JwtPayload
}

export const readStoredUser = (): User | null => {
  const token = localStorage.getItem('token')

  if (!token) {
    return null
  }

  try {
    const payload = decodePayload(token)

    if (payload.exp < Date.now()) {
      return null
    }

    return {
      id: payload.sub,
      usuario: payload.usuario,
      rol: payload.rol
    }
  } catch {
    return null
  }
}

const createToken = (user: User) => {
  const payload: JwtPayload = {
    sub: user.id,
    usuario: user.usuario,
    rol: user.rol,
    exp: Date.now() + TOKEN_TTL_MS
  }

  return `header.${encodePayload(payload)}.signature`
}

const toUser = (account: DemoCredentials & { id: number }): User => ({
  id: account.id,
  usuario: account.usuario,
  rol: account.rol
})

// Login local con JWT simulado para la demo frontend
export const loginRequest = async (usuario: string, password: string): Promise<LoginResponse> => {
  const account = demoAccounts.find((item) => item.usuario === usuario && item.password === password)

  if (!account) {
    throw new Error('Invalid credentials')
  }

  const user = toUser(account)

  return {
    success: true,
    token: createToken(user),
    user
  }
}

// Verifica el token guardado en localStorage
export const verifyRequest = async (): Promise<{ user: User }> => {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('Missing token')
  }

  const payload = decodePayload(token)

  if (payload.exp < Date.now()) {
    throw new Error('Expired token')
  }

  return {
    user: {
      id: payload.sub,
      usuario: payload.usuario,
      rol: payload.rol
    }
  }
}

// Cierra sesión local
export const logoutRequest = async () => {
  return { success: true }
}

export const demoUsers = demoAccounts.map((account) => ({
  id: account.id,
  usuario: account.usuario,
  rol: account.rol
}))