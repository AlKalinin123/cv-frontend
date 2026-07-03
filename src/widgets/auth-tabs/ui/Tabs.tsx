import { useNavigate, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/system'
import { Tabs as MuiTabs, Tab } from '@mui/material'

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export function Tabs() {
  const { t } = useTranslation('common')
  const navigate = useNavigate()
  const location = useLocation()

  const value =
    location.pathname === '/auth/login'
      ? 0
      : location.pathname === '/auth/signup'
        ? 1
        : 0

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) {
      navigate('/auth/login')
    } else if (newValue === 1) {
      navigate('/auth/signup')
    }
  }

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
      <MuiTabs
        value={value}
        onChange={handleChange}
        aria-label="auth tabs"
        centered
        sx={{ height: '100%' }}
      >
        <Tab label={t('auth.login')} {...a11yProps(0)} />
        <Tab label={t('auth.signup')} {...a11yProps(1)} />
      </MuiTabs>
    </Box>
  )
}
