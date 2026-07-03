import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { AuthForm } from '@/widgets/auth-form'
import { useSignupMutation } from '@/shared/api/graphql/generated'
import type { AuthInput } from '@/shared/api/graphql/generated'
import { signupUser } from '@/features/auth/model/authActions'

export function SignupPage() {
  const { t } = useTranslation('common')
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
      toast.error((err as Error)?.message || t('auth.signupFailed'))
    }
  }

  return (
    <AuthForm
      title={t('auth.registerNow')}
      text={t('auth.signupSubtitle')}
      primaryBtnText={t('auth.createAccount')}
      secondaryBtnText={t('auth.haveAccount')}
      onSubmit={handleSignup}
    />
  )
}
