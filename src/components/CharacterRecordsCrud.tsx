import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import useSeo from '../hooks/useSeo'

interface CharacterRecord {
  id: number
  characterName: string
  category: string
  note: string
  updatedAt: string
}

interface Props {
  editable: boolean
  title: string
  description: string
}

const storageKey = 'rickmorty-records'

const defaultRecords: CharacterRecord[] = [
  {
    id: 1,
    characterName: 'Rick Sanchez',
    category: 'Administración',
    note: 'Registro inicial para la experiencia de demostración.',
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    characterName: 'Morty Smith',
    category: 'Seguimiento',
    note: 'Ejemplo de lectura permitida para el usuario estándar.',
    updatedAt: new Date().toISOString()
  }
]

const CharacterRecordsCrud = ({ editable, title, description }: Props) => {
  useSeo({ title, description })

  const [records, setRecords] = useState<CharacterRecord[]>(() => {
    const savedRecords = localStorage.getItem(storageKey)

    if (!savedRecords) {
      return defaultRecords
    }

    return JSON.parse(savedRecords) as CharacterRecord[]
  })
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [characterName, setCharacterName] = useState('')
  const [category, setCategory] = useState('')
  const [note, setNote] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(records))
  }, [records])

  const clearForm = () => {
    setSelectedId(null)
    setCharacterName('')
    setCategory('')
    setNote('')
  }

  const validate = () => {
    if (characterName.trim().length < 3) {
      return 'El nombre debe tener al menos 3 caracteres.'
    }

    if (category.trim().length < 3) {
      return 'La categoría es obligatoria y debe tener al menos 3 caracteres.'
    }

    if (note.trim().length < 10) {
      return 'La nota debe tener al menos 10 caracteres.'
    }

    return ''
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setError('')
    setMessage('')

    if (!editable) {
      return
    }

    const validationMessage = validate()

    if (validationMessage) {
      setError(validationMessage)
      return
    }

    if (selectedId) {
      setRecords((currentRecords) => currentRecords.map((record) => (
        record.id === selectedId
          ? {
              ...record,
              characterName: characterName.trim(),
              category: category.trim(),
              note: note.trim(),
              updatedAt: new Date().toISOString()
            }
          : record
      )))
      setMessage('Registro actualizado correctamente.')
    } else {
      const newRecord: CharacterRecord = {
        id: Date.now(),
        characterName: characterName.trim(),
        category: category.trim(),
        note: note.trim(),
        updatedAt: new Date().toISOString()
      }

      setRecords((currentRecords) => [newRecord, ...currentRecords])
      setMessage('Registro creado correctamente.')
    }

    clearForm()
  }

  const handleEdit = (record: CharacterRecord) => {
    setSelectedId(record.id)
    setCharacterName(record.characterName)
    setCategory(record.category)
    setNote(record.note)
    setMessage('')
    setError('')
  }

  const handleDelete = (id: number) => {
    setRecords((currentRecords) => currentRecords.filter((record) => record.id !== id))
    setMessage('Registro eliminado correctamente.')
    if (selectedId === id) {
      clearForm()
    }
  }

  const summary = useMemo(() => ({
    total: records.length,
    editableMode: editable ? 'Modo administrador' : 'Solo lectura'
  }), [editable, records.length])

  return (
    <section className="crud-shell">
      <header className="page-hero">
        <p className="eyebrow">CRUD principal</p>
        <h1>{title}</h1>
        <p>{description}</p>
        <p className="crud-summary">Total de registros: {summary.total} · {summary.editableMode}</p>
      </header>

      <div className="crud-grid">
        <section className="crud-panel">
          <h2>{selectedId ? 'Editar registro' : 'Crear registro'}</h2>
          {editable ? (
            <form className="crud-form" onSubmit={handleSubmit}>
              <label>
                <span>Nombre del personaje</span>
                <input
                  type="text"
                  value={characterName}
                  onChange={(event) => setCharacterName(event.target.value)}
                  placeholder="Rick Sanchez"
                  minLength={3}
                  required
                />
              </label>

              <label>
                <span>Categoría</span>
                <input
                  type="text"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  placeholder="Administración"
                  minLength={3}
                  required
                />
              </label>

              <label>
                <span>Nota</span>
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Escribe una nota descriptiva del registro."
                  minLength={10}
                  required
                  rows={5}
                />
              </label>

              {error && <p className="error" role="alert">{error}</p>}
              {message && <p className="success" role="status">{message}</p>}

              <div className="crud-actions">
                <button type="submit">
                  {selectedId ? 'Actualizar' : 'Guardar'}
                </button>
                <button type="button" className="secondary-button" onClick={clearForm}>
                  Limpiar
                </button>
              </div>
            </form>
          ) : (
            <div className="read-only-note">
              <p>Este perfil solo puede visualizar registros. Las acciones de crear, editar y eliminar están reservadas al administrador.</p>
            </div>
          )}
        </section>

        <section className="crud-panel">
          <h2>Registros guardados</h2>
          <div className="records-list">
            {records.map((record) => (
              <article className="record-card" key={record.id}>
                <div>
                  <h3>{record.characterName}</h3>
                  <p>{record.category}</p>
                  <p>{record.note}</p>
                </div>
                <small>Actualizado: {new Date(record.updatedAt).toLocaleString('es-BO')}</small>

                {editable && (
                  <div className="record-actions">
                    <button type="button" onClick={() => handleEdit(record)}>
                      Editar
                    </button>
                    <button type="button" className="danger-button" onClick={() => handleDelete(record.id)}>
                      Eliminar
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

export default CharacterRecordsCrud