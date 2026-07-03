import { TextField } from '@mui/material'

interface BaseInputProps {
  fullWidth?: boolean
  required?: boolean
  readonly?: boolean
  id?: string
  label?: string
  defaultValue?: string
  value?: string
  variant?: 'standard' | 'outlined' | 'filled'
  type?: 'text' | 'email' | 'password'
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  name?: string
  error?: boolean
  helperText?: string
  size?: 'small' | 'medium'
  placeholder?: string
}

export const BaseInput = ({
  fullWidth = true,
  required,
  readonly,
  id,
  label,
  defaultValue,
  value,
  variant = 'outlined',
  type = 'text',
  startAdornment,
  endAdornment,
  onChange,
  onBlur,
  name,
  error,
  helperText,
  size = 'small',
  placeholder = '',
}: BaseInputProps) => {
  return (
    <TextField
      fullWidth={fullWidth}
      required={required}
      id={id}
      label={label}
      defaultValue={defaultValue}
      value={value}
      variant={variant}
      type={type}
      slotProps={{
        input: {
          readOnly: readonly,
          startAdornment,
          endAdornment,
        },
      }}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      error={error}
      helperText={helperText}
      size={size}
      placeholder={placeholder}
    />
  )
}
