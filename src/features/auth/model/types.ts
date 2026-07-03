import type { LoginQuery } from '@/shared/api/graphql/generated'

export type AuthUser = LoginQuery['login']['user']

export type StoredAuth = {
  access_token: string
  refresh_token: string
  user: AuthUser
}

export type AuthTokens = {
  access_token: string
  refresh_token: string
}
