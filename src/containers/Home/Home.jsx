import { useEffect, useState } from 'react'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'

import { UserCard } from '../../components/UserCard'
import Description from '../App/Description'

export default function Home() {
  const user = { name: 'Ксения', role: 'Junior Frontend' }

  const [counter, setCounter] = useState(0)
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(true)

  useEffect(() => {
    console.log('Home: mount (смонтировался)')
  }, [])

  useEffect(() => {
    console.log('Home: counter changed (обновление), counter =', counter)
  }, [counter])

  useEffect(() => {
    const onResize = () => console.log('resize')
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      console.log('Home: unmount (размонтирование)')
    }
  }, [])

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Alert severity="success" sx={{ mb: 3 }}>
        ТЕСТ: приложение работает
      </Alert>

      <Box sx={{ mb: 3 }}>
        <UserCard name={user.name} role={user.role} />
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Counter: {counter}
        </Typography>

        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Button variant="contained" onClick={() => setCounter((prev) => prev + 1)}>
            +1
          </Button>

          <Button variant="outlined" onClick={() => setCounter(0)}>
            Сброс
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          sx={{ mb: 2 }}
        >
          <Button
            variant="contained"
            onClick={() => setIsDescriptionVisible((prev) => !prev)}
          >
            {isDescriptionVisible ? 'Скрыть Description' : 'Показать Description'}
          </Button>

          <Chip
            label={isDescriptionVisible ? 'Description показан' : 'Description скрыт'}
            color={isDescriptionVisible ? 'primary' : 'default'}
            variant={isDescriptionVisible ? 'filled' : 'outlined'}
          />
        </Stack>

        {isDescriptionVisible ? (
          <Box sx={{ mt: 2 }}>
            <Description />
          </Box>
        ) : (
          <Typography color="text.secondary">Description скрыт</Typography>
        )}
      </Box>
    </Paper>
  )
}