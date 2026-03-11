import TextField from '@mui/material/TextField'

export function TextInput({ label, value, onChange, placeholder }) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      variant="outlined"
      size="small"
      fullWidth
    />
  )
}
