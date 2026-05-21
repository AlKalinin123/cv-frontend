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
        <Box>
          <Box>
            <ProfileForm />
          </Box>
          <Box>
            {user?.profile.first_name && user?.profile.last_name && (
              <Typography variant="h6">
                {user?.profile.first_name} {user?.profile.last_name}
              </Typography>
            )}
            <Typography variant="h6">{user?.email}</Typography>
            <p>
              A member since{' '}
              {user?.created_at
                ? new Date(Number(user.created_at)).toDateString()
                : ''}
            </p>
          </Box>
        </Box>
      )}
    </Box>
  )
}
