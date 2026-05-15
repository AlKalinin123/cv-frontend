import { TextField } from '@mui/material'

interface BaseInputProps {
  required?: boolean
  readonly?: boolean
  id?: string
  label?: string
  defaultValue?: string
  variant?: 'standard' | 'outlined' | 'filled'
  type?: 'text' | 'email' | 'password'
  endAdornment?: React.ReactNode
}

export const BaseInput = ({
  required,
  readonly,
  id,
  label,
  defaultValue,
  variant,
  type,
  endAdornment,
}: BaseInputProps) => {
  return (
    <TextField
      required={required}
      id={id}
      label={label}
      defaultValue={defaultValue}
      variant={variant}
      type={type}
      slotProps={{
        input: {
          readOnly: readonly,
          endAdornment,
        },
      }}
    />
  )
}
