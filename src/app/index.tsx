import { WithProviders } from './providers/with-providers'
import { AppRouter } from './router'
import { Toaster } from 'react-hot-toast'

export function App() {
  return (
    <WithProviders>
      <Toaster />
      <AppRouter />
    </WithProviders>
  )
}
