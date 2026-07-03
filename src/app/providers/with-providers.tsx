import type { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { i18n } from '@/shared/config/i18n'
import { appStore } from '../store'
import { AuthInitProvider } from './auth-init'
import { AppThemeProvider } from './app-theme'
import { I18nSyncProvider } from './i18n-sync'

export function WithProviders({ children }: PropsWithChildren) {
  return (
    <Provider store={appStore}>
      <AuthInitProvider>
        <I18nextProvider i18n={i18n}>
          <I18nSyncProvider>
            <AppThemeProvider>{children}</AppThemeProvider>
          </I18nSyncProvider>
        </I18nextProvider>
      </AuthInitProvider>
    </Provider>
  )
}
