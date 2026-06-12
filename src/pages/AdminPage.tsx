// Página privada administrador
import CharacterCatalog from '../components/CharacterCatalog'
import CharacterRecordsCrud from '../components/CharacterRecordsCrud'
import useSeo from '../hooks/useSeo'

const AdminPage = () => {
  useSeo({
    title: 'Rick & Morty Frontend | Administrador',
    description: 'Panel administrador con CRUD local, validaciones y catálogo público de personajes.'
  })

  return (
    <>
      <CharacterRecordsCrud
        editable
        title='Universo Rick y Morty para administradores'
        description='Gestiona registros locales, aplica validaciones y conserva el control total sobre la información visible en la aplicación.'
      />

      <CharacterCatalog
        accentLabel='Panel de administración'
        title='Catálogo completo de personajes'
        description='Explora el catálogo completo con filtros, paginación y una vista pensada para controlar la experiencia general del sitio.'
      />
    </>
  )
}

export default AdminPage