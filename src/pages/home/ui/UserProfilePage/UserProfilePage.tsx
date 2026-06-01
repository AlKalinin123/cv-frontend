import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router'
import { Breadcrumbs } from '@/widgets/Breadcrumbs'
import { selectUserById } from '@/entities/user/model/selectors'
import { ProfileForm } from '@/widgets/ProfileForm'
import { useSelector } from 'react-redux'
import { useGetUserByIdQuery, type User } from '@/shared/api/graphql/generated'

export const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>()

  const cachedUser = useSelector(userId ? selectUserById(userId) : () => null)

  const { data: fetchedUser } = useGetUserByIdQuery(
    { userId: userId ?? '' },
    {
      skip: !userId || !!cachedUser,
    },
  )

  const user = cachedUser ?? fetchedUser?.user

  return (
    <Box>
      <Breadcrumbs />
      {user !== null && (
        <Box sx={{ mt: 4 }}>
          {/* TODO: fix type casting */}
          <ProfileForm user={user as User} />
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
