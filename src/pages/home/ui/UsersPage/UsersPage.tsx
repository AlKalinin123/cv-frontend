import { BaseTable } from '@/shared/ui'
import { useGetUsersQuery } from '@/shared/api/graphql/generated'
import { useDispatch } from 'react-redux'
import { setUsers } from '@/entities/user/model/userSlice'
import { useEffect, useMemo } from 'react'
import type { User } from '@/shared/api/graphql/generated'
import { Box } from '@mui/material'

const headers = [
  {
    value: 'avatar',
    label: '',
  },
  {
    value: 'first_name',
    label: 'First name',
  },
  {
    value: 'last_name',
    label: 'Last name',
  },
  {
    value: 'email',
    label: 'Email',
  },
  {
    value: 'department',
    label: 'Department',
  },
  {
    value: 'position',
    label: 'Position',
  },
]

export const UsersPage = () => {
  const { data, isLoading, error } = useGetUsersQuery()
  const dispatch = useDispatch()

  const users = useMemo(() => data?.users || [], [data])

  useEffect(() => {
    // TODO: fix the type casting
    dispatch(setUsers(users as User[]))
  }, [users, dispatch])

  const tableData = users.map((user) => ({
    avatar: user.profile?.avatar,
    id: user.id,
    first_name: user.profile?.first_name,
    last_name: user.profile?.last_name,
    email: user.email,
    department: user.department?.name,
    position: user.position?.name,
  }))

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '290px',
          width: '100%',
        }}
      >
        <div>Loading...</div>
      </Box>
    )
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '290px',
          width: '100%',
        }}
      >
        <div>Error: {error.message}</div>
      </Box>
    )
  }

  return <BaseTable data={tableData || []} headers={headers} />
}
