// Página 404 Not Found
import useSeo from '../hooks/useSeo'

const NotFoundPage = () => {
  useSeo({
    title: 'Rick & Morty Frontend | 404',
    description: 'La ruta solicitada no existe.'
  })

  return (
    <section className="empty-state unauthorized-state">
      <h1>404</h1>
      <p>La ruta solicitada no existe.</p>
    </section>
  )
}

export default NotFoundPage