import { useNavigate } from 'react-router'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'

export default function FilmCard({
  film,
  isFavorite = false,
  onFavoriteClick,
  showFavoriteButton = true,
}) {
  const navigate = useNavigate()

  const id = film?.filmId ?? film?.kinopoiskId ?? film?.id
  const title = film?.nameRu || film?.nameEn || film?.name || 'Без названия'
  const poster = film?.posterUrlPreview || film?.posterUrl || film?.poster || ''
  const genresText = (film?.genres || [])
    .map((item) => item?.genre)
    .filter(Boolean)
    .slice(0, 2)
    .join(', ')

  const handleOpenFilm = () => {
    if (!id) return
    navigate(`/film/${id}`)
  }

  const handleFavoriteClick = (event) => {
    event.stopPropagation()

    if (onFavoriteClick) {
      onFavoriteClick()
    }
  }

  return (
    <Card
      variant="outlined"
      sx={{
        width: 250,
        borderRadius: 3,
        position: 'relative',
        display: 'flex',
      }}
    >
      <CardActionArea
        onClick={handleOpenFilm}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        {poster ? (
          <CardMedia
            component="img"
            image={poster}
            alt={title}
            sx={{
              height: 320,
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
        ) : (
          <Box
            sx={{
              height: 320,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.secondary',
              borderBottom: '1px solid',
              borderColor: 'divider',
              flexShrink: 0,
            }}
          >
            Нет постера
          </Box>
        )}

        <CardContent
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            component="div"
            gutterBottom
            sx={{
              fontWeight: 700,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: 50,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: 22,
            }}
          >
            {genresText || `ID: ${id}`}
          </Typography>
        </CardContent>
      </CardActionArea>

      {showFavoriteButton && (
        <IconButton
          onClick={handleFavoriteClick}
          aria-label={
            isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'
          }
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(255,255,255,0.9)',
          }}
        >
          {isFavorite ? <StarIcon color="warning" /> : <StarBorderIcon />}
        </IconButton>
      )}
    </Card>
  )
}
