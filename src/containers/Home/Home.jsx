import { useNavigate } from 'react-router'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import MovieIcon from '@mui/icons-material/Movie'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteIcon from '@mui/icons-material/Favorite'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

const features = [
  'Просмотр популярных фильмов из Kinopoisk API',
  'Поиск фильмов по ключевому слову и фильтрация по жанрам',
  'Отдельная страница фильма с описанием, рейтингом и ссылкой на Кинопоиск',
  'Добавление фильмов в избранное с сохранением в localStorage',
]

const technologies = [
  'React',
  'React Router',
  'Redux Toolkit',
  'Material UI',
  'Storybook',
  'ESLint',
  'Prettier',
  'Vite',
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" component="h2" gutterBottom>
            Movie Explorer
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Учебное React-приложение для поиска и просмотра информации о
            фильмах. Проект показывает работу с маршрутизацией, Redux, API,
            формами, Material UI и переиспользуемыми компонентами.
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
            <Typography variant="h6">Что умеет приложение</Typography>
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

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            Технологии проекта
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {technologies.map((item) => (
              <Chip key={item} label={item} variant="outlined" />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  )
}
