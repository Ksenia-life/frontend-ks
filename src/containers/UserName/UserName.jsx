import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'

import { setUserName, clearUserName } from '../../store/user/userSlice'

export default function UserName() {
  const dispatch = useDispatch()
  const currentName = useSelector((state) => state.user.name)

  const [name, setName] = useState('')

  const onSave = () => {
    dispatch(setUserName(name.trim()))
    setName('')
  }

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Имя пользователя
      </Typography>

      <Box sx={{ mt: 2, mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Текущее имя в store:
        </Typography>

        <Chip
          label={currentName || 'не задано'}
          color={currentName ? 'primary' : 'default'}
          variant={currentName ? 'filled' : 'outlined'}
        />
      </Box>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', sm: 'center' }}
      >
        <TextField
          label="Введите имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
          size="small"
          sx={{ minWidth: { xs: '100%', sm: 280 } }}
        />

        <Button variant="contained" onClick={onSave} disabled={!name.trim()}>
          Сохранить
        </Button>

        <Button
          variant="outlined"
          onClick={() => dispatch(clearUserName())}
          type="button"
        >
          Очистить
        </Button>
      </Stack>
    </Paper>
  )
}
