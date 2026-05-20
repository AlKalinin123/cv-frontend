import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import type { RootState } from '@/app/store'

const graphqlUrl = import.meta.env.VITE_GRAPHQL_URL

export const api = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: graphqlRequestBaseQuery({
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
  }),
  endpoints: () => ({}),
})
