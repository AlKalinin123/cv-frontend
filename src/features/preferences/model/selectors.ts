import type { RootState } from '@/app/store'

export const selectTheme = (state: RootState) => state.preferences.theme
export const selectInterfaceLang = (state: RootState) =>
  state.preferences.interfaceLang
export const selectCvLang = (state: RootState) => state.preferences.cvLang
