import { Button } from '@mui/material'

interface BaseButtonProps {
  disabled?: boolean
  variant?: 'text' | 'outlined' | 'contained'
  text?: string
  children?: React.ReactNode
  onClick?: () => void
}

export const BaseButton = ({
  variant,
  disabled,
  text,
  children,
  onClick,
}: BaseButtonProps) => {
  return (
    <Button variant={variant} disabled={disabled} onClick={onClick}>
      {text || children || 'Button'}
    </Button>
  )
}
