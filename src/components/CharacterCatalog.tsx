import { useEffect, useMemo, useState } from 'react'
import { fetchCharacters } from '../api/charactersApi'
import type { Character } from '../types/rickMorty'

interface Props {
  title: string
  description: string
  accentLabel: string
}

const statusOptions = ['All', 'Alive', 'Dead', 'unknown'] as const

const CharacterCatalog = ({ title, description, accentLabel }: Props) => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<(typeof statusOptions)[number]>('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadCharacters = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await fetchCharacters({
          page,
          name: query.trim() || undefined,
          status: status === 'All' ? undefined : status
        })

        if (!controller.signal.aborted) {
          setCharacters(data.results)
          setPages(data.info.pages)
        }
      } catch {
        if (!controller.signal.aborted) {
          setCharacters([])
          setPages(1)
          setError('No se encontraron personajes con esos filtros.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadCharacters()

    return () => controller.abort()
  }, [page, query, status])

  const stats = useMemo(() => ({
    total: characters.length,
    alive: characters.filter((item) => item.status === 'Alive').length,
    dead: characters.filter((item) => item.status === 'Dead').length,
    unknown: characters.filter((item) => item.status === 'unknown').length
  }), [characters])

  return (
    <section className="catalog-shell">
      <header className="page-hero">
        <p className="eyebrow">{accentLabel}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>

      <section className="stats-grid" aria-label="Resumen de personajes">
        <article>
          <span>Total visibles</span>
          <strong>{stats.total}</strong>
        </article>
        <article>
          <span>Vivos</span>
          <strong>{stats.alive}</strong>
        </article>
        <article>
          <span>Muertos</span>
          <strong>{stats.dead}</strong>
        </article>
        <article>
          <span>Desconocidos</span>
          <strong>{stats.unknown}</strong>
        </article>
      </section>

      <div className="filters-row">
        <label className="filter-field">
          <span>Buscar personaje</span>
          <input
            type="search"
            placeholder="Ej. Rick, Morty, Summer..."
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
          />
        </label>

        <label className="filter-field">
          <span>Estado</span>
          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as (typeof statusOptions)[number])
              setPage(1)
            }}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading ? (
        <div className="loading-grid" aria-busy="true">
          {Array.from({ length: 8 }).map((_, index) => (
            <article className="skeleton-card" key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="empty-state" role="status">
          <h2>Sin resultados</h2>
          <p>{error}</p>
          <button type="button" onClick={() => { setQuery(''); setStatus('All'); setPage(1) }}>
            Limpiar filtros
          </button>
        </div>
      ) : (
        <>
          <div className="character-grid">
            {characters.map((character) => (
              <article className="character-card" key={character.id}>
                <img src={character.image} alt={character.name} loading="lazy" />
                <div className="character-card__body">
                  <div className="card-topline">
                    <span className={`status status-${character.status.toLowerCase()}`}>
                      {character.status}
                    </span>
                    <span className="species-tag">{character.species}</span>
                  </div>
                  <h2>{character.name}</h2>
                  <p>{character.gender} · {character.location.name}</p>
                  <dl>
                    <div>
                      <dt>Origen</dt>
                      <dd>{character.origin.name}</dd>
                    </div>
                    <div>
                      <dt>Episodios</dt>
                      <dd>{character.episode.length}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>

          <div className="pagination-row" aria-label="Paginación de personajes">
            <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1}>
              Anterior
            </button>
            <span>
              Página {page} de {pages}
            </span>
            <button type="button" onClick={() => setPage((current) => Math.min(pages, current + 1))} disabled={page >= pages}>
              Siguiente
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default CharacterCatalog