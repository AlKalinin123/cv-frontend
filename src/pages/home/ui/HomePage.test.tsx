import { screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/app/test/render-with-providers'
import { i18n } from '@/shared/config/i18n'
import { HomePage } from './HomePage'

describe('HomePage', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders welcome heading', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByRole('heading', { name: 'Welcome' })).toBeInTheDocument()
  })
})
