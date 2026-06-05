import { ProfileForm } from '@/features/edit-profile'
import { ProfileSkills } from '@/features/profile-skills'
import { ProfileLanguages } from '@/features/profile-languages'
import { BaseTabs } from '@/shared/ui'
import { useParams } from 'react-router'
import { selectUserById } from '@/entities/user/model/selectors'
import { useSelector } from 'react-redux'
import { useGetUserByIdQuery, type User } from '@/shared/api/graphql/generated'
import { Box, Typography } from '@mui/material'

export const ProfileSettingsTabs = () => {
  const { userId } = useParams<{ userId: string }>()

  const cachedUser = useSelector(userId ? selectUserById(userId) : () => null)

  const { data: fetchedUser } = useGetUserByIdQuery(
    { userId: userId ?? '' },
    {
      skip: !userId || !!cachedUser,
    },
  )

  const user = cachedUser ?? fetchedUser?.user

  const tabs = [
    {
      label: 'Profile',
      content: <ProfileForm user={user as User} />,
    },
    {
      label: 'Skills',
      content: <ProfileSkills />,
    },
    {
      label: 'Languages',
      content: <ProfileLanguages />,
    },
  ]

  return (
    <>
      <BaseTabs tabs={tabs} />
      {!user && (
        <Box sx={{ mt: 4 }}>
          <Typography>User data not found</Typography>
        </Box>
      )}
    </>
  )
}
