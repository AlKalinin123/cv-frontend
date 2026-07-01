import type { AppDispatch, RootState } from '@/app/store'
import { isTokenExpired } from '../lib/jwt'
import { performTokenRefresh } from '../lib/performTokenRefresh'
import { clearCredentials, setCredentials, setInitialized } from './authSlice'
import { authStorage } from './storage'

export async function bootstrapAuth(
  dispatch: AppDispatch,
  getState: () => RootState,
) {
  const saved = authStorage.load()

  if (saved?.access_token && saved.user) {
    dispatch(
      setCredentials({
        access_token: saved.access_token,
        refresh_token: saved.refresh_token ?? '',
        user: saved.user,
      }),
    )
  } else if (saved) {
    authStorage.clear()
    dispatch(clearCredentials())
  }

  const { accessToken, refreshToken } = getState().auth

  if (refreshToken && isTokenExpired(accessToken)) {
    await performTokenRefresh(getState, dispatch)
  } else if (accessToken && isTokenExpired(accessToken)) {
    dispatch(clearCredentials())
  }

  dispatch(setInitialized(true))
}
