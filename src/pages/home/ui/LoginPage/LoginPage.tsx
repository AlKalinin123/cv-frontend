import { AuthForm } from '@/widgets/AuthForm'
import { CustomTabs } from '@/widgets/CustomTabs'
import { Box, Container } from '@mui/system'
import { useLazyLoginQuery } from '@/shared/api/graphql/generated'
import type { AuthInput } from '@/shared/api/graphql/generated'

export function LoginPage() {
  const [login] = useLazyLoginQuery()
  const handleLogin = async (authData: AuthInput) => {
    try {
      const result = await login({ auth: authData }).unwrap()
      console.log(result)
      // result.data.login.access_token
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
            title="Welcome back"
            text="Hello again! Sign in to continue"
            primaryBtnText="Log in"
            secondaryBtnText="Forgot password"
            onSubmit={handleLogin}
          />
        </Container>
      </Box>
    </Box>
  )
}
