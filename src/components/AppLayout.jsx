import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export function AppLayout({ title, children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        px: { xs: 2, md: 3 },
        py: 3,
        background:
          'linear-gradient(180deg, #eaf3ff 0%, #f3f7ff 35%, #eef5f8 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      <Box sx={{ maxWidth: 1440, mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>

        <Paper
          variant="outlined"
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            backgroundColor: 'rgba(255,255,255,0.94)',
            backdropFilter: 'blur(2px)',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)',
          }}
        >
          <Stack spacing={3}>{children}</Stack>
        </Paper>
      </Box>
    </Box>
  )
}
