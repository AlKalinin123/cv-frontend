import type { AppDispatch, RootState } from '@/app/store'
import { isTokenExpired } from '../lib/jwt'
import { refreshAccessToken } from '../lib/refreshAccessToken'
import { clearCredentials, updateTokens } from '../model/authSlice'
import { authStorage } from '../model/storage'

let refreshPromise: Promise<boolean> | null = null

export function performTokenRefresh(
  getState: () => RootState,
  dispatch: AppDispatch,
): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = doRefresh(getState, dispatch).finally(() => {
      refreshPromise = null
    })
  }

  return refreshPromise
}

async function doRefresh(
  getState: () => RootState,
  dispatch: AppDispatch,
): Promise<boolean> {
  const { refreshToken } = getState().auth

  if (!refreshToken || isTokenExpired(refreshToken)) {
    dispatch(clearCredentials())
    return false
  }

  const tokens = await refreshAccessToken(refreshToken)

  if (!tokens) {
    dispatch(clearCredentials())
    return false
  }

  dispatch(updateTokens(tokens))

  const { user } = getState().auth

  if (user) {
    authStorage.save({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      user,
    })
  }

  return true
}
