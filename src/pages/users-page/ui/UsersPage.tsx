import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/material'
import { BaseTable } from '@/shared/ui'
import { useGetUsersQuery, UserRole } from '@/shared/api/graphql/generated'
import { setUsers } from '@/entities/user/model/userSlice'
import type { User } from '@/shared/api/graphql/generated'
import { selectCurrentUser } from '@/features/auth/model/selectors'

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
  const navigate = useNavigate()
  const users = useMemo(() => data?.users || [], [data])

  const currentUser = useSelector(selectCurrentUser)
  const isAdmin = currentUser?.role === UserRole.Admin

  useEffect(() => {
    // TODO: fix the type casting
    dispatch(setUsers(users as User[]))
  }, [users, dispatch])

  const handleRowClick = (id: string) => {
    if (isAdmin) {
      navigate(`/users/${id}/profile`)
    }
  }

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

  return (
    <BaseTable
      data={tableData || []}
      headers={headers}
      onRowClick={(id) => handleRowClick(id)}
    />
  )
}
