// Página de vista no autorizada
import { Link } from 'react-router-dom'
import useSeo from '../hooks/useSeo'

const UnauthorizedPage = () => {
  useSeo({
    title: 'Rick & Morty Frontend | Acceso denegado',
    description: 'Página de acceso denegado para rutas protegidas.'
  })

  return (
    <section className="empty-state unauthorized-state">
      <h1>Acceso denegado</h1>
      <p>No tienes permisos para ver esta sección con el rol actual.</p>
      <Link className="button-link" to="/">
        Volver al inicio
      </Link>
    </section>
  )
}

export default UnauthorizedPage