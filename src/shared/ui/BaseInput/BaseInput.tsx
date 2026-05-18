import { TextField } from '@mui/material'

interface BaseInputProps {
  required?: boolean
  readonly?: boolean
  id?: string
  label?: string
  defaultValue?: string
  value?: string
  variant?: 'standard' | 'outlined' | 'filled'
  type?: 'text' | 'email' | 'password'
  endAdornment?: React.ReactNode
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const BaseInput = ({
  required,
  readonly,
  id,
  label,
  defaultValue,
  value,
  variant,
  type,
  endAdornment,
  onChange,
}: BaseInputProps) => {
  return (
    <TextField
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
          endAdornment,
        },
      }}
      onChange={onChange}
    />
  )
}
