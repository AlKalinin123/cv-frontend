import { Navigate, Outlet, useLocation } from 'react-router'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import type { RootState } from '@/app/store'

export function AuthGuard() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const isAuthenticated = !!accessToken

  const location = useLocation()

  if (!isAuthenticated) {
    toast.error('Please login to access this page', {
      position: 'top-right',
      duration: 3000,
    })
    return <Navigate to="/auth/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
