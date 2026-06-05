const THEME_KEY = 'pref_theme'
const INT_LANG_KEY = 'pref_interface_lang'
const CV_LANG_KEY = 'pref_cv_lang'

export const preferencesStorage = {
  getTheme: () => localStorage.getItem(THEME_KEY) || 'light',
  setTheme: (theme: string) => localStorage.setItem(THEME_KEY, theme),

  getInterfaceLang: () => localStorage.getItem(INT_LANG_KEY) || 'en',
  setInterfaceLang: (lang: string) => localStorage.setItem(INT_LANG_KEY, lang),

  getCvLang: () => localStorage.getItem(CV_LANG_KEY) || 'en',
  setCvLang: (lang: string) => localStorage.setItem(CV_LANG_KEY, lang),
}
