import { useEffect, useMemo, useState } from 'react'
import { searchPersons } from '../../../api/actions/persons'
import { TextInput } from '../../../components/Inputs/TextInput'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

const hasApiKey = Boolean((import.meta.env.VITE_API_KEY || '').trim())
const MIN_QUERY_LEN = 2

export default function Persons() {
  const [name, setName] = useState('Джеймс')
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('idle')

  const items = useMemo(() => data?.items ?? [], [data])

  const handleNameChange = (e) => {
    const value = e.target.value
    setName(value)

    if (value.trim().length < MIN_QUERY_LEN) {
      setData(null)
      setStatus('idle')
    }
  }

  useEffect(() => {
    const q = name.trim()

    if (q.length < MIN_QUERY_LEN) {
      return
    }

    const timeoutId = setTimeout(() => {
      ;(async () => {
        setStatus('loading')

        const response = await searchPersons({ name: q, page: 1 })

        if (!response) {
          setStatus('error')
          setData(null)
          return
        }

        setData(response)
        setStatus('success')
      })()
    }, 350)

    return () => clearTimeout(timeoutId)
  }, [name])

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Задание 2: Поиск персон
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Источник: Кинопоиск API
      </Typography>

      {!hasApiKey && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Нужен ключ API. Создай файл <b>.env</b> в корне проекта и добавь
          строку <b>VITE_API_KEY=...</b>
        </Alert>
      )}

      <Box sx={{ mb: 3, maxWidth: 520 }}>
        <TextInput
          label="Поиск персон по имени"
          value={name}
          onChange={handleNameChange}
          placeholder="Например: Джеймс Кэмерон"
        />
      </Box>

      {status === 'idle' && (
        <Typography color="text.secondary">
          Введи минимум {MIN_QUERY_LEN} символа, чтобы начать поиск.
        </Typography>
      )}

      {status === 'loading' && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={24} />
          <Typography color="text.secondary">Загрузка…</Typography>
        </Box>
      )}

      {status === 'error' && (
        <Alert severity="error">
          Не получилось сходить в API Кинопоиска. Частые причины: нет ключа,
          неверный ключ, закончился лимит запросов или заблокирован CORS.
        </Alert>
      )}

      {status === 'success' && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            mt: 2,
          }}
        >
          {items.slice(0, 12).map((p) => (
            <Card
              key={p.kinopoiskId ?? `${p.nameRu}-${p.sex}`}
              variant="outlined"
              sx={{ width: 220, borderRadius: 3 }}
            >
              {p.posterUrl ? (
                <CardMedia
                  component="img"
                  image={p.posterUrl}
                  alt={p.nameRu ?? ''}
                  sx={{ height: 300, objectFit: 'cover' }}
                />
              ) : (
                <Box
                  sx={{
                    height: 300,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'text.secondary',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  Нет фото
                </Box>
              )}

              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {p.nameRu || p.nameEn || 'Без имени'}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {p.profession || 'Профессия не указана'}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Paper>
  )
}
