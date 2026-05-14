import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'

const graphqlUrl = import.meta.env.VITE_GRAPHQL_URL

export const api = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: graphqlRequestBaseQuery({
    url: graphqlUrl ?? '',
  }),
  endpoints: () => ({}),
})
