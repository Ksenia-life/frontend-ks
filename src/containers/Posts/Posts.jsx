import { useEffect, useState } from 'react'
import { getPosts } from '../../api/actions/posts'

import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const LIMIT = 10

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    ;(async () => {
      setStatus('loading')

      const data = await getPosts(LIMIT)

      if (!Array.isArray(data)) {
        setStatus('error')
        return
      }

      setPosts(data)
      setStatus('success')
    })()
  }, [])

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Задание 1: Посты
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Источник: JSONPlaceholder
      </Typography>

      {status === 'loading' && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={24} />
          <Typography color="text.secondary">Загрузка…</Typography>
        </Box>
      )}

      {status === 'error' && (
        <Alert severity="error">
          Не удалось получить посты. Причина может быть не в интернете: проверь
          Console/Network в DevTools.
        </Alert>
      )}

      {status === 'success' && (
        <Stack spacing={2}>
          {posts.map((post) => (
            <Card key={post.id} variant="outlined" sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {post.title}
                </Typography>

                <Typography variant="body1" color="text.secondary">
                  {post.body}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Paper>
  )
}
