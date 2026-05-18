const KEY = 'auth'

export const authStorage = {
  save(data: { access_token: string; user: { id: string; email: string } }) {
    sessionStorage.setItem(KEY, JSON.stringify(data))
  },

  load() {
    const raw = sessionStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  },

  clear() {
    sessionStorage.removeItem(KEY)
  },
}
