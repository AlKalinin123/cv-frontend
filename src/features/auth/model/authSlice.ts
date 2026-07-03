import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { LoginQuery } from '@/shared/api/graphql/generated'
import { authStorage } from './storage'
import type { AuthTokens } from './types'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: LoginQuery['login']['user'] | null
  initialized: boolean
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  initialized: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        access_token: string
        refresh_token: string
        user: LoginQuery['login']['user']
      }>,
    ) => {
      state.accessToken = action.payload.access_token
      state.refreshToken = action.payload.refresh_token
      state.user = action.payload.user
    },
    updateTokens: (state, action: PayloadAction<AuthTokens>) => {
      state.accessToken = action.payload.access_token
      state.refreshToken = action.payload.refresh_token
    },
    clearCredentials: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.user = null

      authStorage.clear()
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload
    },
  },
})

export const {
  setCredentials,
  updateTokens,
  clearCredentials,
  setInitialized,
} = authSlice.actions
export const authReducer = authSlice.reducer
