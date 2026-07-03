import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery, type PaletteMode } from '@mui/material'
import { selectTheme } from '@/features/preferences/model/selectors'
import { setTheme } from '@/features/preferences/model/slice'
import {
  DEFAULT_THEME,
  isPrefTheme,
  type PrefTheme,
  type ThemeMode,
} from '@/features/preferences/model/types'

const resolveMode = (
  preference: PrefTheme,
  prefersDarkMode: boolean,
): ThemeMode =>
  preference === 'deviceSettings'
    ? prefersDarkMode
      ? 'dark'
      : 'light'
    : preference

export const useAppTheme = () => {
  const dispatch = useDispatch()
  const preference = useSelector(selectTheme)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const safePreference: PrefTheme = isPrefTheme(preference)
    ? preference
    : DEFAULT_THEME
  const mode: PaletteMode = resolveMode(safePreference, prefersDarkMode)

  const handleSetTheme = (newTheme: PrefTheme) => {
    dispatch(setTheme(newTheme))
  }

  return { mode, preference: safePreference, setTheme: handleSetTheme }
}
