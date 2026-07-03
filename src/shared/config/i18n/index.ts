import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enCommon from './locales/en/common.json'
import ruCommon from './locales/ru/common.json'

const INTERFACE_LANG_KEY = 'pref_interface_lang'

void i18n.use(initReactI18next).init({
  resources: {
    en: { common: enCommon },
    ru: { common: ruCommon },
  },
  lng: localStorage.getItem(INTERFACE_LANG_KEY) || 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common'],
  interpolation: { escapeValue: false },
})

export { i18n }
