/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
import { api } from '@/shared/api/graphql/base-api'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type Query = {
  __typename?: 'Query'
  ping?: Maybe<Scalars['Boolean']['output']>
}

export type PingQueryVariables = Exact<{ [key: string]: never }>

export type PingQuery = { ping: boolean | null }

export const PingDocument = `
    query Ping {
  ping
}
    `

const injectedRtkApi = api.injectEndpoints({
  overrideExisting: import.meta.hot != null,
  endpoints: (build) => ({
    Ping: build.query<PingQuery, PingQueryVariables | void>({
      query: (variables) => ({ document: PingDocument, variables }),
    }),
  }),
})

export { injectedRtkApi as api }
export const { usePingQuery, useLazyPingQuery } = injectedRtkApi
