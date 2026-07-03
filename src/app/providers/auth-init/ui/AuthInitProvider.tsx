import { useEffect } from 'react'
import type { PropsWithChildren } from 'react'
import { useStore } from 'react-redux'
import { bootstrapAuth } from '@/features/auth/model/bootstrapAuth'
import type { RootState } from '@/app/store'

export function AuthInitProvider({ children }: PropsWithChildren) {
  const store = useStore()

  useEffect(() => {
    void bootstrapAuth(store.dispatch, store.getState as () => RootState)
  }, [store])

  return children
}
