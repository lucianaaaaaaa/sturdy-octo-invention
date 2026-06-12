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
          <h1>Luciana Leaño - Catálogo de personajes de serie "Rick and Morty"</h1>
          <p>
            Una interfaz sencilla para entrar, explorar personajes y manejar registros según el rol.
          </p>

          <div className="landing-actions">
            <a className="primary-action" href="/login">
              Ingresar
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LandingPage