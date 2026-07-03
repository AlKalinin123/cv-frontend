import { GraphQLClient } from 'graphql-request'
import type { AuthTokens } from '../model/types'

const UPDATE_TOKEN_MUTATION = `
  mutation UpdateToken {
    updateToken {
      access_token
      refresh_token
    }
  }
`

export async function refreshAccessToken(
  refreshToken: string,
): Promise<AuthTokens | null> {
  const url = import.meta.env.VITE_GRAPHQL_URL

  if (!url) {
    return null
  }

  const client = new GraphQLClient(url, {
    headers: {
      authorization: `Bearer ${refreshToken}`,
    },
    credentials: 'include',
  })

  try {
    const data = await client.request<{ updateToken: AuthTokens }>(
      UPDATE_TOKEN_MUTATION,
    )

    return data.updateToken
  } catch {
    return null
  }
}
