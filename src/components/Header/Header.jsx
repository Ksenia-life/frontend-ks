import { NavLink } from 'react-router'
import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import HomeIcon from '@mui/icons-material/Home'
import MovieIcon from '@mui/icons-material/Movie'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteIcon from '@mui/icons-material/Favorite'

function NavButton({ to, icon, children, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      style={{ textDecoration: 'none' }}
      viewTransition
    >
      {({ isActive }) => (
        <Button
          variant={isActive ? 'contained' : 'outlined'}
          startIcon={icon}
          size="small"
        >
          {children}
        </Button>
      )}
    </NavLink>
  )
}

export default function Header() {
  const favorites = useSelector((state) => state.favorites)

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', md: 'center' }}
        spacing={2}
      >
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <NavButton to="/" end icon={<HomeIcon />}>
            Главная
          </NavButton>

          <NavButton to="/films" icon={<MovieIcon />}>
            Список фильмов
          </NavButton>

          <NavButton to="/search" icon={<SearchIcon />}>
            Поиск
          </NavButton>

          <NavButton to="/favorites" icon={<FavoriteIcon />}>
            Избранное ({favorites.length})
          </NavButton>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
        >
          <MovieIcon color="primary" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Movie Explorer
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}