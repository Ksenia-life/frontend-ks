import { useEffect, useMemo, useState } from 'react'
import { searchFilms } from '../../../api/actions/films'
import { TextInput } from '../../../components/Inputs/TextInput'
import { SelectInput } from '../../../components/Inputs/SelectInput'

import { useDispatch, useSelector } from 'react-redux'
import {
  addToFavorites,
  removeFromFavorites,
} from '../../../store/favorites/favoritesSlice'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'

import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'

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
      const genres = (film && film.genres) || []
      genres.forEach((g) => {
        if (g && g.genre) genresSet.add(g.genre)
      })
    })

    const sorted = Array.from(genresSet).sort((a, b) =>
      a.localeCompare(b, 'ru'),
    )

    return [{ value: 'all', label: 'Все жанры' }].concat(
      sorted.map((g) => ({ value: g, label: g })),
    )
  }, [films])

  const visibleFilms = useMemo(() => {
    if (genre === 'all') return films

    return films.filter((film) => {
      const genres = (film && film.genres) || []
      return genres.some((g) => g && g.genre === genre)
    })
  }, [films, genre])

  const handleQueryChange = (e) => {
    const value = e.target.value
    setQuery(value)

    if (value.trim().length < MIN_QUERY_LEN) {
      setData(null)
      setStatus('idle')
      setGenre('all')
    }
  }

  useEffect(() => {
    const q = query.trim()

    if (q.length < MIN_QUERY_LEN) {
      return
    }

    const timeoutId = setTimeout(() => {
      ;(async () => {
        setStatus('loading')

        const response = await searchFilms({ keyword: q, page: 1 })

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
        Задание 3: Поиск и фильтр фильмов
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
            label="Поиск фильмов (реальное время)"
            value={query}
            onChange={handleQueryChange}
            placeholder="Например: Гарри Поттер"
          />
        </Box>

        <Box sx={{ minWidth: 240 }}>
          <SelectInput
            label="Фильтр по жанру"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
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
          <Typography color="text.secondary">Загрузка…</Typography>
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
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            {visibleFilms.slice(0, 16).map((film) => {
              const title =
                (film && (film.nameRu || film.nameEn)) || 'Без названия'

              const genresText = ((film && film.genres) || [])
                .slice(0, 2)
                .map((g) => (g && g.genre) || '')
                .filter(Boolean)
                .join(', ')

              const isFavorite = favorites.some((el) => el.id === film.filmId)

              const onFavoriteClick = () => {
                if (isFavorite) {
                  dispatch(removeFromFavorites(film.filmId))
                } else {
                  dispatch(
                    addToFavorites({
                      id: film.filmId,
                      name: title,
                      poster: film.posterUrlPreview || '',
                    }),
                  )
                }
              }

              return (
                <Card
                  key={film.filmId}
                  variant="outlined"
                  sx={{
                    width: 170,
                    borderRadius: 3,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {film.posterUrlPreview ? (
                    <CardMedia
                      component="img"
                      image={film.posterUrlPreview}
                      alt={title}
                      sx={{ height: 250, objectFit: 'cover' }}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: 250,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'text.secondary',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      Нет постера
                    </Box>
                  )}

                  <IconButton
                    onClick={onFavoriteClick}
                    aria-label={
                      isFavorite
                        ? 'Удалить из избранного'
                        : 'Добавить в избранное'
                    }
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(255,255,255,0.9)',
                    }}
                  >
                    {isFavorite ? (
                      <StarIcon color="warning" />
                    ) : (
                      <StarBorderIcon />
                    )}
                  </IconButton>

                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ fontWeight: 700 }}
                    >
                      {title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {genresText || 'Жанр не указан'}
                    </Typography>
                  </CardContent>
                </Card>
              )
            })}
          </Box>
        </>
      )}
    </Paper>
  )
}
