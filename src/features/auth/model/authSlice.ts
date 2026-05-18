import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { LoginQuery } from '@/shared/api/graphql/generated'

interface AuthState {
  accessToken: string | null
  user: LoginQuery['login']['user'] | null
  initialized: boolean
}

const initialState: AuthState = {
  accessToken: null,
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
        user: LoginQuery['login']['user']
      }>,
    ) => {
      state.accessToken = action.payload.access_token
      state.user = action.payload.user
    },
    clearCredentials: (state) => {
      state.accessToken = null
      state.user = null

      sessionStorage.removeItem('auth')
    },
    setInitialized: (state, action) => {
      state.initialized = action.payload
    },
  },
})

export const { setCredentials, clearCredentials, setInitialized } =
  authSlice.actions
export const authReducer = authSlice.reducer
