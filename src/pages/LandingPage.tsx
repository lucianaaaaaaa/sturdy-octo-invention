import { Link } from 'react-router-dom'
import useSeo from '../hooks/useSeo'

const LandingPage = () => {
  useSeo({
    title: 'Rick & Morty Frontend | Landing',
    description: 'Aplicación frontend moderna con autenticación simulada, roles y consumo de la API pública de Rick and Morty.'
  })

  return (
    <main className="landing-shell">
      <section className="landing-hero">
        <div>
          <h1 style={{ marginTop: '4rem' }}>Luciana Leaño - Catálogo de personajes de serie "Rick and Morty"</h1>
          <p>
            Una interfaz sencilla para entrar, explorar personajes y manejar registros según el rol.
          </p>

          <div className="landing-actions">
            <Link className="primary-action" to="/login">
              Ingresar
            </Link>
          </div>

          <div className="landing-features" style={{ marginTop: '2rem', backgroundColor: "#fffcec", padding: "1rem", borderRadius: "24px" }}>
            <h2>Características principales</h2>
            <ul>
              <li>Autenticación simulada con usuarios predefinidos.</li>
              <li>Roles de usuario: Administrador y Usuario común.</li>
              <li>Rutas protegidas según el rol.</li>
              <li>Consumo de la API pública de Rick and Morty.</li>
              <li>Interfaz moderna y responsive.</li>
            </ul>
          </div>

          <div className="landing-architecture" style={{ marginTop: '2rem', backgroundColor: "#fffcec", padding: "1rem", borderRadius: "24px" }}>
            <h2>Arquitectura de la aplicación</h2>
            <p>
              La aplicación está estructurada con componentes reutilizables, gestión de estado local y global, y rutas protegidas para garantizar una experiencia de usuario fluida y segura.
            </p>
          </div>

          <div className="landing-demo-users" style={{ marginTop: '2rem', backgroundColor: "#fffcec", padding: "1rem", borderRadius: "24px" }}>
            <h2>Usuarios de demostración</h2>
            <ul>
              <li><strong>Administrador:</strong> usuario: admin, contraseña: admin123</li>
              <li><strong>Usuario común:</strong> usuario: user, contraseña: user123</li>
            </ul>
          </div>

          <div className="landing-conclusion" style={{ marginTop: '2rem', backgroundColor: "#fffcec", padding: "1rem", borderRadius: "24px" }}>
            <h2>Conclusión</h2>
            <p>
              Esta aplicación demuestra cómo implementar autenticación simulada, roles de usuario y consumo de una API pública en un proyecto frontend moderno.
            </p>
          </div>          
          
          <div className="landing-footer">
            <p>Desarrollada por Luciana Leaño - 2026</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LandingPage