import { BaseTable } from '@/shared/ui'
import { Grid, Paper } from '@mui/material'
import { BaseSidebar } from '@/shared/ui'
import { useGetUsersQuery } from '@/shared/api/graphql/generated'

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
  const { data } = useGetUsersQuery()

  const users = data?.users || []

  const tableData = users.map((user) => ({
    avatar: user.profile?.avatar,
    id: user.id,
    first_name: user.profile?.first_name,
    last_name: user.profile?.last_name,
    email: user.email,
    department: user.department?.name,
    position: user.position?.name,
  }))

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 12, md: 12 }}>
        <Paper>Users page</Paper>
      </Grid>
      <Grid size={{ xs: 12, sm: 4, md: 2 }} sx={{ p: 2 }}>
        <BaseSidebar />
      </Grid>
      <Grid size={{ xs: 12, sm: 8, md: 10 }} sx={{ p: 2 }}>
        <BaseTable data={tableData || []} headers={headers} />
      </Grid>
    </Grid>
  )
}
