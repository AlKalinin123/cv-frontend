import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import { BaseTable } from '@/shared/ui'
import { useGetUsersQuery, UserRole } from '@/shared/api/graphql/generated'
import { setUsers } from '@/entities/user/model/userSlice'
import type { User } from '@/shared/api/graphql/generated'
import { selectCurrentUser } from '@/features/auth/model/selectors'

export const UsersPage = () => {
  const { t } = useTranslation('common')
  const { data, isLoading, error } = useGetUsersQuery()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useMemo(() => data?.users || [], [data])

  const headers = [
    { value: 'avatar', label: '' },
    { value: 'first_name', label: t('users.firstName') },
    { value: 'last_name', label: t('users.lastName') },
    { value: 'email', label: t('users.email') },
    { value: 'department', label: t('users.department') },
    { value: 'position', label: t('users.position') },
  ]

  const currentUser = useSelector(selectCurrentUser)
  const isAdmin = currentUser?.role === UserRole.Admin

  useEffect(() => {
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
        <div>{t('common.loading')}</div>
      </Box>
    )
  }

  if (error && typeof error === 'object' && 'message' in error) {
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
        <div>
          {t('common.error')}:{' '}
          {(error as { message?: string })?.message || t('common.unknownError')}
        </div>
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
