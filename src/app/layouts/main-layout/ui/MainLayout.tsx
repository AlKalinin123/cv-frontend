import { Outlet } from 'react-router'
import { Grid, Paper } from '@mui/material'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/side-bar'

export const MainLayout = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 12, md: 12 }}>
        <Paper>
          <Header />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, sm: 4, md: 2 }} sx={{ p: 2 }}>
        <Sidebar />
      </Grid>
      <Grid size={{ xs: 12, sm: 8, md: 10 }} sx={{ p: 2 }}>
        <Outlet />
      </Grid>
    </Grid>
  )
}
