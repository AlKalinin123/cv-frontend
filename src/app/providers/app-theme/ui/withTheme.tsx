import React, { useMemo } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { useAppTheme } from '../../../../shared/lib/useTheme'

export const AppThemeProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { mode } = useAppTheme()

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode, // 'light' or 'dark'
        },
      }),
    [mode],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalizes background/text colors for MUI */}
      {children}
    </ThemeProvider>
  )
}
