import type { LoaderFunctionArgs } from 'react-router'
import { appStore } from '@/app/store'
import { selectUserById } from '@/entities/user/model/selectors'

export const userLoader = async ({ params }: LoaderFunctionArgs) => {
  const userId = params.userId

  if (!userId) {
    throw new Error('User ID is missing')
  }

  const state = appStore.getState()
  const user = selectUserById(userId)(state)

  return user
}
