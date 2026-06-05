import type { RootState } from '@/app/store'

// Selects the full current user object from the auth slice
export const selectCurrentUser = (state: RootState) => state.auth.user

// Selects just the current user's ID safely
export const selectCurrentUserId = (state: RootState) => state.auth.user?.id
