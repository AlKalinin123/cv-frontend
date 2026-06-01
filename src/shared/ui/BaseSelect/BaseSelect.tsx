import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material'

interface BaseSelectProps {
  label: string
  value: string
  labelId?: string
  id?: string
  name?: string
  required?: boolean
  readonly?: boolean
  variant?: 'standard' | 'outlined' | 'filled'
  options: { value: string; label: string }[]
  fullWidth?: boolean
  error?: boolean
  helperText?: string
  onChange?: (event: SelectChangeEvent) => void
  onBlur?: () => void
}

export const BaseSelect = ({
  label,
  value,
  labelId,
  id,
  options,
  fullWidth,
  error,
  helperText,
  variant = 'outlined',
  onChange,
  onBlur,
}: BaseSelectProps) => {
  return (
    <div>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoWidth
        label={label}
        fullWidth={fullWidth}
        error={error}
        variant={variant}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </div>
  )
}
