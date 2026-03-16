import { useNavigate } from 'react-router'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import MovieIcon from '@mui/icons-material/Movie'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteIcon from '@mui/icons-material/Favorite'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

const features = [
  'Список фильмов — просматривайте популярные фильмы из Kinopoisk API',
  'Поиск фильмов — находите фильмы по названию и фильтруйте результаты по жанру',
  'Избранное — сохраняйте понравившиеся фильмы для быстрого доступа',
  'Детальная информация — открывайте страницу фильма с описанием, рейтингом и ссылкой на Кинопоиск',
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" component="h2" gutterBottom>
            Приложение для поиска фильмов
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Добро пожаловать в Movie Explorer — учебное React-приложение для
            работы с фильмами. Здесь можно просматривать популярные фильмы,
            искать их по названию, открывать подробную информацию и сохранять
            понравившиеся карточки в избранное.
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Начните со списка фильмов или воспользуйтесь поиском, чтобы быстро
            найти что-то конкретное.
          </Typography>
        </Box>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          flexWrap="wrap"
        >
          <Button
            variant="contained"
            startIcon={<MovieIcon />}
            onClick={() => navigate('/films')}
          >
            Открыть список фильмов
          </Button>

          <Button
            variant="outlined"
            startIcon={<SearchIcon />}
            onClick={() => navigate('/search')}
          >
            Перейти к поиску
          </Button>

          <Button
            variant="outlined"
            startIcon={<FavoriteIcon />}
            onClick={() => navigate('/favorites')}
          >
            Посмотреть избранное
          </Button>
        </Stack>

        <Divider />

        <Box>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <InfoOutlinedIcon color="primary" />
            <Typography variant="h6">Возможности приложения</Typography>
          </Stack>

          <Stack spacing={2}>
            {features.map((item) => (
              <Paper
                key={item}
                variant="outlined"
                sx={{ p: 2, borderRadius: 2 }}
              >
                <Typography variant="body1">{item}</Typography>
              </Paper>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  )
}
