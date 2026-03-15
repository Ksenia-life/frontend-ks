import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export function AppLayout({ title, children }) {
  return (
    <Box sx={{ px: { xs: 2, md: 3 }, py: 3 }}>
      <Box sx={{ maxWidth: 1440, mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>

        <Paper
          variant="outlined"
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 3,
          }}
        >
          <Stack spacing={3}>{children}</Stack>
        </Paper>
      </Box>
    </Box>
  )
}
