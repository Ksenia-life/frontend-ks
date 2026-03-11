import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

export function AppLayout({ title, children }) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        {children}
      </Paper>
    </Box>
  )
}
