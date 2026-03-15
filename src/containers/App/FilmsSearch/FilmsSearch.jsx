import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { searchFilms } from '../../../api/actions/films'
import { TextInput } from '../../../components/Inputs/TextInput'
import { SelectInput } from '../../../components/Inputs/SelectInput'
import { FilmCard } from '../../../components/FilmCard'
import {
  addToFavorites,
  removeFromFavorites,
} from '../../../store/favorites/favoritesSlice'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

const MIN_QUERY_LEN = 2

export default function FilmsSearch() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('all')
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('idle')

  const favorites = useSelector((state) => state.favorites)
  const dispatch = useDispatch()

  const films = useMemo(() => {
    return (data && data.films) || []
  }, [data])

  const genreOptions = useMemo(() => {
    const genresSet = new Set()

    films.forEach((film) => {
      const genres = film?.genres || []

      genres.forEach((item) => {
        if (item?.genre) {
          genresSet.add(item.genre)
        }
      })
    })

    const sortedGenres = Array.from(genresSet).sort((a, b) =>
      a.localeCompare(b, 'ru'),
    )

    return [{ value: 'all', label: 'Все жанры' }].concat(
      sortedGenres.map((item) => ({
        value: item,
        label: item,
      })),
    )
  }, [films])

  const visibleFilms = useMemo(() => {
    if (genre === 'all') {
      return films
    }

    return films.filter((film) => {
      const genres = film?.genres || []
      return genres.some((item) => item?.genre === genre)
    })
  }, [films, genre])

  const handleQueryChange = (event) => {
    const value = event.target.value
    setQuery(value)

    if (value.trim().length < MIN_QUERY_LEN) {
      setData(null)
      setStatus('idle')
      setGenre('all')
    }
  }

  useEffect(() => {
    const trimmedQuery = query.trim()

    if (trimmedQuery.length < MIN_QUERY_LEN) {
      return
    }

    const timeoutId = setTimeout(() => {
      ;(async () => {
        setStatus('loading')

        const response = await searchFilms({
          keyword: trimmedQuery,
          page: 1,
        })

        if (!response) {
          setStatus('error')
          setData(null)
          return
        }

        setData(response)
        setStatus('success')
        setGenre('all')
      })()
    }, 350)

    return () => clearTimeout(timeoutId)
  }, [query])

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Поиск фильмов
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Источник: Кинопоиск API
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          mb: 3,
        }}
      >
        <Box sx={{ minWidth: 320, flex: 1 }}>
          <TextInput
            label="Поиск фильмов"
            value={query}
            onChange={handleQueryChange}
            placeholder="Например: Гарри Поттер"
          />
        </Box>

        <Box sx={{ minWidth: 240 }}>
          <SelectInput
            label="Фильтр по жанру"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            options={genreOptions}
          />
        </Box>
      </Box>

      {status === 'idle' && (
        <Typography color="text.secondary">
          Введи минимум {MIN_QUERY_LEN} символа, чтобы появился список.
        </Typography>
      )}

      {status === 'loading' && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={24} />
          <Typography color="text.secondary">Загрузка...</Typography>
        </Box>
      )}

      {status === 'error' && (
        <Alert severity="error">
          Ошибка запроса к API Кинопоиска. Проверь ключ и попробуй ещё раз.
        </Alert>
      )}

      {status === 'success' && (
        <>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Найдено: <b>{films.length}</b>, показываю:{' '}
            <b>{visibleFilms.length}</b>
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, 250px)',
              justifyContent: 'center',
              gap: 2,
              mt: 2,
            }}
          >
            {visibleFilms.map((film) => {
              const id = film.filmId
              const isFavorite = favorites.some((item) => item.id === id)

              const normalizedFilm = {
                id,
                name: film.nameRu || film.nameEn || 'Без названия',
                poster: film.posterUrlPreview || film.posterUrl || '',
                genres: film.genres || [],
                filmId: film.filmId,
                nameRu: film.nameRu,
                nameEn: film.nameEn,
                posterUrlPreview: film.posterUrlPreview,
                posterUrl: film.posterUrl,
              }

              const handleFavoriteClick = () => {
                if (isFavorite) {
                  dispatch(removeFromFavorites(id))
                } else {
                  dispatch(addToFavorites(normalizedFilm))
                }
              }

              return (
                <FilmCard
                  key={id}
                  film={normalizedFilm}
                  isFavorite={isFavorite}
                  onFavoriteClick={handleFavoriteClick}
                />
              )
            })}
          </Box>
        </>
      )}
    </Paper>
  )
}
