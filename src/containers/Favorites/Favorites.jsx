import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import { FilmCard } from '../../components/FilmCard'
import { removeFromFavorites } from '../../store/favorites/favoritesSlice'

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites)
  const dispatch = useDispatch()

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Избранное
      </Typography>

      {favorites.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          В избранном пока нет фильмов
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
          {favorites.map((film) => (
            <FilmCard
              key={film.id}
              film={film}
              isFavorite
              onFavoriteClick={() => dispatch(removeFromFavorites(film.id))}
            />
          ))}
        </Box>
      )}
    </Paper>
  )
}
