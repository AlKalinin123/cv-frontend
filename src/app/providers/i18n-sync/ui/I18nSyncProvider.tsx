import { useEffect, type PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { selectInterfaceLang } from '@/features/preferences/model/selectors'

export function I18nSyncProvider({ children }: PropsWithChildren) {
  const interfaceLang = useSelector(selectInterfaceLang)
  const { i18n } = useTranslation()

  useEffect(() => {
    if (i18n.language !== interfaceLang) {
      void i18n.changeLanguage(interfaceLang)
    }
  }, [interfaceLang, i18n])

  return children
}
