import type { PropsWithChildren } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { i18n } from '@/shared/config/i18n'
import { appStore } from '../store'
import { appTheme } from '../styles/theme'
import { initAuth } from './initAuth/initAuth'

initAuth(appStore)

export function WithProviders({ children }: PropsWithChildren) {
  return (
    <Provider store={appStore}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  )
}
