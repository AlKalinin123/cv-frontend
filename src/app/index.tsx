import { WithProviders } from './providers/with-providers'
import { AppRouter } from './router'

export function App() {
  return (
    <WithProviders>
      <AppRouter />
    </WithProviders>
  )
}
