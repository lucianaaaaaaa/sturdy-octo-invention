import type { CharactersResponse } from '../types/rickMorty'

const API_BASE = 'https://rickandmortyapi.com/api'

export interface CharacterSearchParams {
  page?: number
  name?: string
  status?: string
}

export const fetchCharacters = async ({ page = 1, name, status }: CharacterSearchParams = {}) => {
  const url = new URL(`${API_BASE}/character`)

  url.searchParams.set('page', String(page))

  if (name) {
    url.searchParams.set('name', name)
  }

  if (status) {
    url.searchParams.set('status', status)
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('No se pudieron cargar los personajes')
  }

  return response.json() as Promise<CharactersResponse>
}