import { BaseSelect } from '@/shared/ui/BaseSelect/BaseSelect'
import { Box, type SelectChangeEvent } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  selectTheme,
  selectInterfaceLang,
  selectCvLang,
} from '@/features/preferences/model/selectors'
import {
  setTheme,
  setInterfaceLang,
  setCvLang,
} from '@/features/preferences/model/slice'
import { isPrefTheme } from '@/features/preferences/model/types'

export const SettingsPage = () => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()

  const theme = useSelector(selectTheme)
  const interfaceLang = useSelector(selectInterfaceLang)
  const cvLang = useSelector(selectCvLang)

  const appearanceOptions = [
    { value: 'light', label: t('settings.theme.light') },
    { value: 'dark', label: t('settings.theme.dark') },
    { value: 'deviceSettings', label: t('settings.theme.deviceSettings') },
  ]

  const languageOptions = [
    { value: 'en', label: t('settings.languages.en') },
    { value: 'ru', label: t('settings.languages.ru') },
  ]

  const handleAppearanceChange = (event: SelectChangeEvent) => {
    const value = event.target.value
    if (isPrefTheme(value)) {
      dispatch(setTheme(value))
    }
  }

  const handleInterfaceLangChange = (event: SelectChangeEvent) => {
    dispatch(setInterfaceLang(event.target.value))
  }

  const handleCvLangChange = (event: SelectChangeEvent) => {
    dispatch(setCvLang(event.target.value))
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
        width: '600px',
        margin: '0 auto',
      }}
    >
      <BaseSelect
        label={t('settings.appearance')}
        value={theme}
        options={appearanceOptions}
        onChange={handleAppearanceChange}
        fullWidth
      />
      <BaseSelect
        label={t('settings.interfaceLanguage')}
        value={interfaceLang}
        options={languageOptions}
        onChange={handleInterfaceLangChange}
        fullWidth
      />
      <BaseSelect
        label={t('settings.cvLanguage')}
        value={cvLang}
        options={languageOptions}
        onChange={handleCvLangChange}
        fullWidth
      />
    </Box>
  )
}
