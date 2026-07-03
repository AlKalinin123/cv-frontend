import { Navigate, Outlet, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { CircularProgress, Box } from '@mui/material'
import type { RootState } from '@/app/store'

export function AuthGuard() {
  const { t } = useTranslation('common')
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const initialized = useSelector((state: RootState) => state.auth.initialized)
  const isAuthenticated = !!accessToken

  const location = useLocation()

  if (!initialized) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!isAuthenticated) {
    toast.error(t('auth.loginRequired'), {
      position: 'top-right',
      duration: 3000,
    })
    return <Navigate to="/auth/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
