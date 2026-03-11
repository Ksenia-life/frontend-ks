import { useState } from 'react'
import { TextInput } from './TextInput'

const meta = {
  title: 'Inputs/TextInput',
  component: TextInput,
  args: {
    label: 'Имя',
    placeholder: 'Введите имя',
  },
}

export default meta

function TextInputStory(args) {
  const [value, setValue] = useState('')

  return (
    <div style={{ width: 320 }}>
      <TextInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export const Default = {
  render: (args) => <TextInputStory {...args} />,
}

export const WithValue = {
  render: (args) => <TextInputStory {...args} />,
  args: {
    label: 'Поиск',
    placeholder: 'Например: Гарри Поттер',
  },
}
