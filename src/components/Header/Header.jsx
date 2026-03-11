import { NavLink } from 'react-router'
import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'

import HomeIcon from '@mui/icons-material/Home'
import ArticleIcon from '@mui/icons-material/Article'
import PeopleIcon from '@mui/icons-material/People'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
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
  const userName = useSelector((state) => state.user.name)
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
            Домашняя
          </NavButton>

          <NavButton to="/posts" icon={<ArticleIcon />}>
            Посты
          </NavButton>

          <NavButton to="/persons" icon={<PeopleIcon />}>
            Персоны
          </NavButton>

          <NavButton to="/search" icon={<SearchIcon />}>
            Поиск фильмов
          </NavButton>

          <NavButton to="/user" icon={<PersonIcon />}>
            Имя
          </NavButton>

          <NavButton to="/favorites" icon={<FavoriteIcon />}>
            Избранное ({favorites.length})
          </NavButton>
        </Box>

        <Chip
          label={userName ? `Привет, ${userName}` : 'Имя не задано'}
          color={userName ? 'primary' : 'default'}
          variant={userName ? 'filled' : 'outlined'}
        />
      </Stack>
    </Paper>
  )
}
