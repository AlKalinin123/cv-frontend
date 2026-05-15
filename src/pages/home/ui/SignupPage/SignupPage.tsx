import { Box, Container } from '@mui/system'
import { AuthForm } from '@/widgets/AuthForm'
import { CustomTabs } from '@/widgets/CustomTabs'

export function SignupPage() {
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
            title="Register now"
            text="Welcome! Sign up to continue"
            primaryBtnText="Create account"
            secondaryBtnText="I have an account"
            onSubmit={() => {
              // TODO: Implement signup logic
            }}
          />
        </Container>
      </Box>
    </Box>
  )
}
