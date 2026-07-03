import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { WithProviders } from '../providers/with-providers'

export function renderWithProviders(ui: ReactElement) {
  return render(<WithProviders>{ui}</WithProviders>)
}
