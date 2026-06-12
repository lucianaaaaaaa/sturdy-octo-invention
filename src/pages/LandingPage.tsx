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
          <p className="eyebrow">React · TypeScript · JWT · APIs REST</p>
          <h1>Explora el multiverso con una experiencia frontend moderna.</h1>
          <p>
            Esta aplicación demuestra autenticación simulada con Context API y Protected Routes, navegación por roles y consumo de la API pública de Rick and Morty.
          </p>

          <div className="landing-actions">
            <Link className="primary-action" to="/login">
              Ingresar
            </Link>
            <Link className="secondary-action" to="/user">
              Ver demo protegida
            </Link>
          </div>
        </div>

        <aside className="landing-card">
          <h2>Qué incluye</h2>
          <ul>
            <li>Landing page temática</li>
            <li>Login con usuarios predefinidos</li>
            <li>CRUD local con validaciones</li>
            <li>Catálogo de personajes con búsqueda y filtros</li>
          </ul>
        </aside>
      </section>
    </main>
  )
}

export default LandingPage