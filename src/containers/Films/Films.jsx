import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { FilmCard } from '../../components/FilmCard'
import { getTopFilms } from '../../api/actions/films'
import {
  addToFavorites,
  removeFromFavorites,
} from '../../store/favorites/favoritesSlice'

export default function Films() {
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.favorites)

  const [films, setFilms] = useState([])
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadFilms() {
      setStatus('loading')
      setErrorMessage('')

      const data = await getTopFilms()

      if (!data?.films?.length && !data?.items?.length) {
        setStatus('error')
        setErrorMessage('Не удалось загрузить список фильмов.')
        return
      }

      setFilms(data.films || data.items || [])
      setStatus('success')
    }

    loadFilms()
  }, [])

  const handleFavoriteToggle = (film) => {
    const id = film.filmId ?? film.kinopoiskId ?? film.id
    const isFavorite = favorites.some((item) => item.id === id)

    const normalizedFilm = {
      id,
      filmId: id,
      name: film.nameRu || film.nameEn || film.name || 'Без названия',
      nameRu: film.nameRu || film.name || 'Без названия',
      nameEn: film.nameEn || '',
      poster: film.posterUrlPreview || film.posterUrl || film.poster || '',
      posterUrl: film.posterUrl || film.poster || '',
      posterUrlPreview:
        film.posterUrlPreview || film.posterUrl || film.poster || '',
      genres: film.genres || [],
      year: film.year || '',
    }

    if (isFavorite) {
      dispatch(removeFromFavorites(id))
    } else {
      dispatch(addToFavorites(normalizedFilm))
    }
  }

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h4" component="h2">
          Список фильмов
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Популярные фильмы из Kinopoisk API
        </Typography>

        {status === 'loading' && (
          <Stack spacing={2} alignItems="center" sx={{ py: 4 }}>
            <CircularProgress />
            <Typography>Загрузка списка фильмов...</Typography>
          </Stack>
        )}

        {status === 'error' && <Alert severity="error">{errorMessage}</Alert>}

        {status === 'success' && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, 250px)',
              justifyContent: 'center',
              gap: 2,
              mt: 2,
            }}
          >
            {films.map((film) => {
              const id = film.filmId ?? film.kinopoiskId ?? film.id
              const isFavorite = favorites.some((item) => item.id === id)

              return (
                <FilmCard
                  key={id}
                  film={film}
                  isFavorite={isFavorite}
                  onFavoriteClick={() => handleFavoriteToggle(film)}
                />
              )
            })}
          </Box>
        )}
      </Stack>
    </Paper>
  )
}
