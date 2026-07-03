import { useTranslation } from 'react-i18next'

export const ProfileLanguages = () => {
  const { t } = useTranslation('common')

  return <div>{t('profile.languages')}</div>
}
