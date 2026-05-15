import { AuthForm } from '@/widgets/AuthForm'
import { CustomTabs } from '@/widgets/CustomTabs'
import { Box, Container } from '@mui/system'

export function LoginPage() {
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
        <CustomTabs />
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
          <AuthForm
            title="Welcome back"
            text="Hello again! Sign in to continue"
            primaryBtnText="Log in"
            secondaryBtnText="Forgot password"
            onSubmit={() => {
              // TODO: Implement login logic
            }}
          />
        </Container>
      </Box>
    </Box>
  )
}
