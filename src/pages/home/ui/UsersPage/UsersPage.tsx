import { BaseTable } from '@/shared/ui'
import { Grid, Paper } from '@mui/material'
import { BaseSidebar } from '@/shared/ui'

export const UsersPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 12, md: 12 }}>
        <Paper>Users page</Paper>
      </Grid>
      <Grid size={{ xs: 12, sm: 4, md: 2 }}>
        <BaseSidebar />
      </Grid>
      <Grid size={{ xs: 12, sm: 8, md: 10 }}>
        <BaseTable />
      </Grid>
    </Grid>
  )
}
