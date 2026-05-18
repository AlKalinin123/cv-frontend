import { authStorage } from '@/features/auth/model/storage'
import { setCredentials } from '@/features/auth/model/authSlice'
import type { AppStore } from '../../store'

export function initAuth(store: AppStore) {
  const saved = authStorage.load()

  if (saved?.access_token) {
    store.dispatch(setCredentials(saved))
  }
}
