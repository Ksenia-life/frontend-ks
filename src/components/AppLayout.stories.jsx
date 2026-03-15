import Typography from '@mui/material/Typography'
import { AppLayout } from './AppLayout'

const meta = {
  title: 'Components/AppLayout',
  component: AppLayout,
  args: {
    title: 'Movie Explorer',
  },
}

export default meta

export const Default = {
  render: (args) => (
    <AppLayout {...args}>
      <Typography>Это пример содержимого внутри layout-компонента</Typography>
    </AppLayout>
  ),
}
