import type { PropsWithChildren } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { i18n } from '@/shared/config/i18n'
import { appStore } from '../store'
import { appTheme } from '../styles/theme'
import { AuthInitProvider } from './auth-init'

export function WithProviders({ children }: PropsWithChildren) {
  return (
    <Provider store={appStore}>
      <AuthInitProvider>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={appTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </I18nextProvider>
      </AuthInitProvider>
    </Provider>
  )
}
