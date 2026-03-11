import { useState } from 'react'
import { SelectInput } from './SelectInput'

const options = [
  { value: 'all', label: 'Все жанры' },
  { value: 'drama', label: 'Драма' },
  { value: 'comedy', label: 'Комедия' },
  { value: 'fantasy', label: 'Фэнтези' },
]

const meta = {
  title: 'Inputs/SelectInput',
  component: SelectInput,
  args: {
    label: 'Жанр',
    options,
  },
}

export default meta

function SelectInputStory(args) {
  const [value, setValue] = useState('all')

  return (
    <div style={{ width: 320 }}>
      <SelectInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export const Default = {
  render: (args) => <SelectInputStory {...args} />,
}
