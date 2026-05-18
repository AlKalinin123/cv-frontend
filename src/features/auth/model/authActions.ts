import { setCredentials } from './authSlice'
import { authStorage } from './storage'
import type { AppDispatch } from '@/app/store'
import type {
  useLazyLoginQuery,
  useSignupMutation,
} from '@/shared/api/graphql/generated'

type LoginTrigger = ReturnType<typeof useLazyLoginQuery>[0]
type SignupTrigger = ReturnType<typeof useSignupMutation>[0]

interface LoginUserParams {
  authData: {
    email: string
    password: string
  }
  login: LoginTrigger
  dispatch: AppDispatch
}

interface SignupUserParams {
  authData: {
    email: string
    password: string
  }
  signup: SignupTrigger
  dispatch: AppDispatch
}

export const loginUser = async ({
  authData,
  login,
  dispatch,
}: LoginUserParams) => {
  const result = await login({
    auth: authData,
  }).unwrap()

  const payload = {
    access_token: result.login.access_token,
    user: result.login.user,
  }

  dispatch(setCredentials(payload))
  authStorage.save(payload)

  return result
}

export const signupUser = async ({
  authData,
  signup,
  dispatch,
}: SignupUserParams) => {
  const result = await signup({
    auth: authData,
  }).unwrap()

  const payload = {
    access_token: result.signup.access_token,
    user: result.signup.user,
  }

  dispatch(setCredentials(payload))
  authStorage.save(payload)

  return result
}
