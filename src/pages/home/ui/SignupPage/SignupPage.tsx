import { Box, Container } from '@mui/system'
import { AuthForm } from '@/widgets/AuthForm'
import { CustomTabs } from '@/widgets/CustomTabs'
import { useSignupMutation } from '@/shared/api/graphql/generated'
import type { AuthInput } from '@/shared/api/graphql/generated'

export function SignupPage() {
  const [signup] = useSignupMutation()

  const handleSignup = async (authData: AuthInput) => {
    try {
      console.log(authData)
      const result = await signup({ auth: authData }).unwrap()
      console.log(result)
      // result.data.signup.access_token
    } catch (err) {
      console.error(err)
      // handle error
    }
  }

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
            onSubmit={handleSignup}
          />
        </Container>
      </Box>
    </Box>
  )
}
