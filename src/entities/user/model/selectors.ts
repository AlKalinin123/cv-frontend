import type { RootState } from '@/app/store'
import type { User } from '@/shared/api/graphql/generated'

export const selectUsers = (state: RootState) => state.user.users

export const selectUserById = (id: string) => (state: RootState) =>
  state.user.users.find((user: User) => user.id === id)
