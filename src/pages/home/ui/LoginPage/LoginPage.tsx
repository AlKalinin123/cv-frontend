import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { AuthForm } from '@/widgets/AuthForm'
import { CustomTabs } from '@/widgets/CustomTabs'
import { Box, Container } from '@mui/system'
import { useLazyLoginQuery } from '@/shared/api/graphql/generated'
import type { AuthInput } from '@/shared/api/graphql/generated'
import { loginUser } from '@/features/auth/model/authActions'

export function LoginPage() {
  const [login] = useLazyLoginQuery()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (authData: AuthInput) => {
    try {
      await loginUser({
        authData,
        login,
        dispatch,
      })

      navigate('/users')
    } catch (err: unknown) {
      console.error(err)
      toast.error((err as Error)?.message || 'Login failed')
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
