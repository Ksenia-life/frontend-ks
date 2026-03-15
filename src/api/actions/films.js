import { getApiResource } from '../utils'

const API_KEY = (import.meta.env.VITE_API_KEY || '').trim()

export const searchFilms = async ({ keyword, page = 1 }) => {
  if (!API_KEY) return null

  const params = new URLSearchParams({
    keyword,
    page: String(page),
  })

  const result = await getApiResource(
    `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?${params.toString()}`,
    {
      method: 'GET',
      headers: {
        'X-API-KEY': API_KEY,
      },
    },
  )

  if (!result.ok) return null

  return result.data
}

export const getFilmById = async (id) => {
  if (!API_KEY || !id) return null

  const result = await getApiResource(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`,
    {
      method: 'GET',
      headers: {
        'X-API-KEY': API_KEY,
      },
    },
  )

  if (!result.ok) return null

  return result.data
}

export const getTopFilms = async ({
  type = 'TOP_100_POPULAR_FILMS',
  page = 1,
} = {}) => {
  if (!API_KEY) return null

  const params = new URLSearchParams({
    type,
    page: String(page),
  })

  const result = await getApiResource(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?${params.toString()}`,
    {
      method: 'GET',
      headers: {
        'X-API-KEY': API_KEY,
      },
    },
  )

  if (!result.ok) return null

  return result.data
}
