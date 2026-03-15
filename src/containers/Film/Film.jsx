import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

import { getFilmById } from '../../api/actions/films'
import {
  addToFavorites,
  removeFromFavorites,
} from '../../store/favorites/favoritesSlice'

export default function Film() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.favorites)

  const [film, setFilm] = useState(null)
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadFilm() {
      setStatus('loading')
      setErrorMessage('')

      const data = await getFilmById(id)

      if (!data) {
        setStatus('error')
        setErrorMessage('Не удалось загрузить информацию о фильме.')
        return
      }

      setFilm(data)
      setStatus('success')
    }

    loadFilm()
  }, [id])

  const normalizedFilm = useMemo(() => {
    if (!film) return null

    return {
      id: film.kinopoiskId || film.filmId || Number(id),
      filmId: film.kinopoiskId || film.filmId || Number(id),
      name: film.nameRu || film.nameEn || film.nameOriginal || 'Без названия',
      nameRu: film.nameRu || film.nameOriginal || 'Без названия',
      nameEn: film.nameEn || '',
      poster: film.posterUrlPreview || film.posterUrl || '',
      posterUrl: film.posterUrl || film.posterUrlPreview || '',
      posterUrlPreview: film.posterUrlPreview || film.posterUrl || '',
      genres: film.genres || [],
      year: film.year || '',
    }
  }, [film, id])

  const isFavorite = normalizedFilm
    ? favorites.some((item) => item.id === normalizedFilm.id)
    : false

  const handleFavoriteClick = () => {
    if (!normalizedFilm) return

    if (isFavorite) {
      dispatch(removeFromFavorites(normalizedFilm.id))
    } else {
      dispatch(addToFavorites(normalizedFilm))
    }
  }

  const title =
    film?.nameRu || film?.nameEn || film?.nameOriginal || 'Без названия'

  const description =
    film?.description ||
    film?.shortDescription ||
    'Описание для этого фильма пока отсутствует.'

  const poster = film?.posterUrl || film?.posterUrlPreview || ''

  const genresText =
    film?.genres
      ?.map((item) => item.genre)
      .filter(Boolean)
      .join(', ') || '—'

  const countriesText =
    film?.countries
      ?.map((item) => item.country)
      .filter(Boolean)
      .join(', ') || '—'

  const rawRating =
    film?.ratingKinopoisk || film?.ratingImdb || film?.ratingFilmCritics || 0

  const ratingNumber = Number(rawRating) || 0
  const ratingValue = Math.min(5, ratingNumber / 2)

  const webUrl = film?.webUrl || `https://www.kinopoisk.ru/film/${id}/`

  if (status === 'loading') {
    return (
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Stack spacing={2} alignItems="center">
          <CircularProgress />
          <Typography>Загрузка информации о фильме...</Typography>
        </Stack>
      </Paper>
    )
  }

  if (status === 'error') {
    return (
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h4" component="h2">
            Страница фильма
          </Typography>

          <Alert severity="error">{errorMessage}</Alert>

          <Box>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            >
              Назад
            </Button>
          </Box>
        </Stack>
      </Paper>
    )
  }

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h2">
          {title}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '320px 1fr' },
            gap: 3,
            alignItems: 'start',
          }}
        >
          <Box>
            {poster ? (
              <Box
                component="img"
                src={poster}
                alt={title}
                sx={{
                  width: '100%',
                  maxWidth: 320,
                  borderRadius: 3,
                  display: 'block',
                }}
              />
            ) : (
              <Paper
                variant="outlined"
                sx={{
                  height: 420,
                  maxWidth: 320,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 3,
                }}
              >
                <Typography color="text.secondary">Нет постера</Typography>
              </Paper>
            )}
          </Box>

          <Stack spacing={2}>
            <Typography variant="body1">{description}</Typography>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Рейтинг
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center">
                <Rating value={ratingValue} precision={0.5} readOnly />
                <Typography variant="body1">
                  {ratingNumber ? ratingNumber.toFixed(1) : 'Нет оценки'}
                </Typography>
              </Stack>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Информация
              </Typography>

              <Stack spacing={1}>
                <Typography variant="body2">
                  <b>Год:</b> {film?.year || '—'}
                </Typography>
                <Typography variant="body2">
                  <b>Жанры:</b> {genresText}
                </Typography>
                <Typography variant="body2">
                  <b>Страны:</b> {countriesText}
                </Typography>
              </Stack>
            </Box>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {film?.genres?.slice(0, 4).map((item) => (
                <Chip key={item.genre} label={item.genre} variant="outlined" />
              ))}
            </Stack>

            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
              >
                Назад
              </Button>

              <Button
                variant={isFavorite ? 'contained' : 'outlined'}
                color={isFavorite ? 'error' : 'primary'}
                startIcon={
                  isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />
                }
                onClick={handleFavoriteClick}
              >
                {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
              </Button>

              <Button
                component="a"
                href={webUrl}
                target="_blank"
                rel="noreferrer"
                variant="outlined"
                startIcon={<OpenInNewIcon />}
              >
                Открыть на Кинопоиске
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  )
}
