import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router'
import { Breadcrumbs } from '@/widgets/Breadcrumbs'
import { selectUserById } from '@/entities/user/model/selectors'
import { appStore } from '@/app/store'
import { ProfileForm } from '@/widgets/ProfileForm'

export const UserProfilePage = () => {
  const { userId } = useParams()
  const state = appStore.getState()
  const user = userId ? selectUserById(userId)(state) : null

  return (
    <Box>
      <Breadcrumbs />
      {user !== null && (
        <Box sx={{ mt: 4 }}>
          <ProfileForm user={user} />
        </Box>
      )}
      {!user && (
        <Box sx={{ mt: 4 }}>
          <Typography>User data not found</Typography>
        </Box>
      )}
    </Box>
  )
}
