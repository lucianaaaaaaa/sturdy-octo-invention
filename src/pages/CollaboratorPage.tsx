// Página privada colaboradores
import CharacterCatalog from '../components/CharacterCatalog'
import CharacterRecordsCrud from '../components/CharacterRecordsCrud'
import useSeo from '../hooks/useSeo'

const CollaboratorPage = () => {
  useSeo({
    title: 'Rick & Morty Frontend | Usuario',
    description: 'Vista de usuario con acceso de solo lectura a registros y exploración de personajes.'
  })

  return (
    <>
      <CharacterRecordsCrud
        editable={false}
        title='Vista de usuario'
        description='Los usuarios pueden visualizar registros, pero no crear, modificar ni eliminar.'
      />

      <CharacterCatalog
        accentLabel='Panel de usuario'
        title='Seguimiento curado de personajes'
        description='Diseñado para revisar personajes por estado y especies, con una lectura rápida para trabajo en equipo y análisis de contenido.'
      />
    </>
  )
}

export default CollaboratorPage