import { BaseSelect } from '@/shared/ui/BaseSelect/BaseSelect'
import { Box, type SelectChangeEvent } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
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

const appearanceOptions = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'deviceSettings', label: 'Device Settings' },
]

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'ru', label: 'Russian' },
]

export const SettingsPage = () => {
  const dispatch = useDispatch()

  // Read data from synchronized global state
  const theme = useSelector(selectTheme)
  const interfaceLang = useSelector(selectInterfaceLang)
  const cvLang = useSelector(selectCvLang)

  const handleAppearanceChange = (event: SelectChangeEvent) => {
    dispatch(setTheme(event.target.value))
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
        label="Appearance"
        value={theme}
        options={appearanceOptions}
        onChange={handleAppearanceChange}
        fullWidth
      />
      <BaseSelect
        label="Interface Language"
        value={interfaceLang}
        options={languageOptions}
        onChange={handleInterfaceLangChange}
        fullWidth
      />
      <BaseSelect
        label="CV Language"
        value={cvLang}
        options={languageOptions}
        onChange={handleCvLangChange}
        fullWidth
      />
    </Box>
  )
}
