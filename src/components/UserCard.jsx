import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export function UserCard({ name, role }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="body1" gutterBottom>
          <b>Имя:</b> {name}
        </Typography>

        <Typography variant="body1">
          <b>Роль:</b> {role}
        </Typography>
      </CardContent>
    </Card>
  )
}
