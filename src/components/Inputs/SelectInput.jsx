import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export function SelectInput({ label, value, onChange, options }) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel>{label}</InputLabel>

      <Select value={value} label={label} onChange={onChange}>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
