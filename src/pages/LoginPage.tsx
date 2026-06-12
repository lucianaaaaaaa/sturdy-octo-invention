// Hooks React
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
// Navegación rutas
import { useNavigate } from 'react-router-dom'
// Context autenticación JWT
import { useAuth } from '../context/AuthContext'
// Credenciales demo
import { demoUsers } from '../api/authApi'
// SEO
import useSeo from '../hooks/useSeo'

const LoginPage = () => {
  useSeo({
    title: 'Rick & Morty Frontend | Login',
    description: 'Acceso con usuarios predefinidos, autenticación simulada y rutas protegidas.'
  })

  // Estado usuario input
  const [usuario, setUsuario] = useState('')
  // Estado password input
  const [password, setPassword] = useState('')
  // Estado mensaje error
  const [error, setError] = useState('')
  // Función login global
  const { login, user } = useAuth()
  // Navegación paginas
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      return
    }

    navigate(user.rol === 'Administrador' ? '/admin' : '/user', { replace: true })
  }, [navigate, user])
  // Enviar formulario login
  const handleSubmit = async ( e: FormEvent ) => {
    e.preventDefault()
    setError('')

    // Consumir login API
    const success = await login(usuario,password)

    // Login incorrecto
    if (!success) { 
      setError('Credenciales incorrectas')
      return
    }

    const account = demoUsers.find((item) => item.usuario === usuario)

    if (!account) {
      return
    }

    // Obtener rol usuario
    const rol = account.rol

    if (rol === 'Administrador')
    {
      // Redir administrador
      navigate('/admin')
    }
    else if (rol === 'Usuario')
    {
      // Redir usuario
      navigate('/user')
    }
  }

  return (
    <section className="login-grid">
      <div className="login-copy">
        <div className="hint-card">
          <h2>Credenciales de prueba</h2>
          <ul>
            <li><strong>admin / admin123</strong></li>
            <li><strong>user / user123</strong></li>
          </ul>
        </div>
      </div>

      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Ingresar</h2>

        {/* Input usuario */}        
        <input
          type='text'
          placeholder='Usuario'
          value={usuario}
          onChange={(e) => setUsuario(e.target.value) }
          autoComplete='username'
        />

        {/* Input password */}
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value) }
          autoComplete='current-password'
        />

        {/* Botón login */}
        <button type='submit'>
          Ingresar
        </button>

      </form>

      {/* Mensaje error */}
      {
        error && (
          <p className="error" role='alert'>
            {error}
          </p>
        )
      }
    </section>
  )
}

export default LoginPage