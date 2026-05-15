import { useState, type MouseEvent } from 'react'
import {
  Box,
  FormControl,
  InputAdornment,
  IconButton,
  Paper,
  Typography,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { BaseButton, BaseInput } from '@/shared/ui'

interface AuthFormProps {
  title: string
  text: string
  primaryBtnText: string
  secondaryBtnText: string
  onSubmit: () => void
}

export function AuthForm({
  title,
  text,
  primaryBtnText,
  secondaryBtnText,
  onSubmit,
}: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Box component="form">
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: 500,
          maxWidth: 500,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography component="h1" sx={{ fontSize: '24px', fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography component="p" sx={{ fontSize: '16px', fontWeight: 400 }}>
            {text}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl>
            <BaseInput label="Email" type="email" required />
          </FormControl>
          <FormControl>
            <BaseInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? 'hide the password'
                        : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <BaseButton variant="contained" onClick={onSubmit}>
          {primaryBtnText}
        </BaseButton>
        <BaseButton variant="outlined" onClick={() => {}}>
          {secondaryBtnText}
        </BaseButton>
      </Paper>
    </Box>
  )
}
