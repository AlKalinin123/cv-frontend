import { Box } from '@mui/material'
import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { ProfileSettingsTabs } from '@/widgets/profile-settings-tabs'

export const UserProfilePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Breadcrumbs />
      <ProfileSettingsTabs />
    </Box>
  )
}
