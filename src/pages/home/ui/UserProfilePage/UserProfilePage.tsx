import { Box } from '@mui/material'
import { Breadcrumbs } from '@/widgets/Breadcrumbs'
import { ProfileSettingsTabs } from '@/widgets/ProfileSettingsTabs'

export const UserProfilePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Breadcrumbs />
      <ProfileSettingsTabs />
    </Box>
  )
}
