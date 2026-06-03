import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { AuthForm } from '@/widgets/auth-form'
import { useSignupMutation } from '@/shared/api/graphql/generated'
import type { AuthInput } from '@/shared/api/graphql/generated'
import { signupUser } from '@/features/auth/model/authActions'

export function SignupPage() {
  const [signup] = useSignupMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignup = async (authData: AuthInput) => {
    try {
      await signupUser({
        authData,
        signup,
        dispatch,
      })

      navigate('/')
    } catch (err: unknown) {
      console.error(err)
      toast.error((err as Error)?.message || 'Signup failed')
    }
  }

  return (
    <AuthForm
      title="Register now"
      text="Welcome! Sign up to continue"
      primaryBtnText="Create account"
      secondaryBtnText="I have an account"
      onSubmit={handleSignup}
    />
  )
}
