import { configureStore } from '@reduxjs/toolkit'
import { api } from '@/shared/api/graphql/generated'
import { authReducer } from '../../features/auth/model/authSlice'
import { userReducer } from '../../entities/user/model/userSlice'
import { preferencesReducer } from '../../features/preferences/model/slice'

export type AppStore = ReturnType<typeof configureStore>

export const appStore = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    user: userReducer,
    preferences: preferencesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch
