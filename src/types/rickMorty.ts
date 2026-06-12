export interface CharacterLocation {
  name: string
  url: string
}

export interface Character {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown' | string
  species: string
  type: string
  gender: string
  origin: CharacterLocation
  location: CharacterLocation
  image: string
  episode: string[]
  url: string
  created: string
}

export interface PaginationInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface CharactersResponse {
  info: PaginationInfo
  results: Character[]
}