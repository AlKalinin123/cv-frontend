import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import type { RootState } from '@/app/store'
import { performTokenRefresh } from '@/features/auth/lib/performTokenRefresh'

const graphqlUrl = import.meta.env.VITE_GRAPHQL_URL

const PUBLIC_ENDPOINTS = new Set(['Login', 'Signup'])

function isUnauthorizedResult(result: {
  error?: unknown
  meta?: { response?: { status?: number; errors?: unknown[] } }
}): boolean {
  if (!result.error) {
    return false
  }

  const status = result.meta?.response?.status

  if (status === 401) {
    return true
  }

  const errors = result.meta?.response?.errors

  if (Array.isArray(errors)) {
    return errors.some((error) => {
      if (!error || typeof error !== 'object') {
        return false
      }

      const extensions = (error as { extensions?: { code?: string } })
        .extensions

      return extensions?.code === 'UNAUTHENTICATED'
    })
  }

  return false
}

const rawBaseQuery = graphqlRequestBaseQuery({
  url: graphqlUrl ?? '',
  requestHeaders: {
    credentials: 'include',
  },
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<
  { document: string; variables?: unknown },
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions)

  if (isUnauthorizedResult(result) && !PUBLIC_ENDPOINTS.has(api.endpoint)) {
    const refreshed = await performTokenRefresh(
      api.getState as () => RootState,
      api.dispatch,
    )

    if (refreshed) {
      result = await rawBaseQuery(args, api, extraOptions)
    }
  }

  return result
}

export const api = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
