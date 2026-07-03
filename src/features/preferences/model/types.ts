export type ThemeMode = 'light' | 'dark'
export type PrefTheme = 'light' | 'dark' | 'deviceSettings'

export const DEFAULT_THEME: PrefTheme = 'deviceSettings'

export const isPrefTheme = (value: string | null): value is PrefTheme =>
  value === 'light' || value === 'dark' || value === 'deviceSettings'
