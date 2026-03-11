import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites)

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Избранное
      </Typography>

      {favorites.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          В избранном нет фильмов
        </Typography>
      ) : (
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {favorites.map((item) => (
            <Grid key={item.id}>
              <Card
                variant="outlined"
                sx={{ width: 220, height: '100%', borderRadius: 3 }}
              >
                {item.poster ? (
                  <CardMedia
                    component="img"
                    image={item.poster}
                    alt={item.name}
                    sx={{ height: 320, objectFit: 'cover' }}
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
                    }}
                  >
                    Нет постера
                  </Box>
                )}

                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {item.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    ID: {item.id}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  )
}
