import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { AuthForm } from '@/widgets/auth-form'
import { useLazyLoginQuery } from '@/shared/api/graphql/generated'
import type { AuthInput } from '@/shared/api/graphql/generated'
import { loginUser } from '@/features/auth/model/authActions'

export function LoginPage() {
  const { t } = useTranslation('common')
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
      toast.error((err as Error)?.message || t('auth.loginFailed'))
    }
  }

  return (
    <AuthForm
      title={t('auth.welcomeBack')}
      text={t('auth.loginSubtitle')}
      primaryBtnText={t('auth.loginButton')}
      secondaryBtnText={t('auth.forgotPassword')}
      onSubmit={handleLogin}
    />
  )
}
