import { Outlet } from 'react-router'
import { Box, Container } from '@mui/material'
import { Tabs } from '@/widgets/auth-tabs'

export const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      <Box>
        <Tabs />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Container maxWidth="sm">
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}
