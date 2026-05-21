import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@/shared/api/graphql/generated'

type UserState = {
  users: User[]
}

const initialState: UserState = {
  users: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    },
  },
})

export const { setUsers } = userSlice.actions
export const userReducer = userSlice.reducer
