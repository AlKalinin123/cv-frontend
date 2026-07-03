import type { StoredAuth } from './types'

const KEY = 'auth'

export const authStorage = {
  save(data: StoredAuth) {
    sessionStorage.setItem(KEY, JSON.stringify(data))
  },

  load(): StoredAuth | null {
    const raw = sessionStorage.getItem(KEY)

    if (!raw) {
      return null
    }

    try {
      return JSON.parse(raw) as StoredAuth
    } catch {
      return null
    }
  },

  saveTokens(tokens: Pick<StoredAuth, 'access_token' | 'refresh_token'>) {
    const existing = this.load()

    if (existing?.user) {
      this.save({
        ...existing,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      })
    }
  },

  clear() {
    sessionStorage.removeItem(KEY)
  },
}
