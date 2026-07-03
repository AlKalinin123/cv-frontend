import { RouterProvider } from 'react-router'
import { router } from './config'

export function AppRouter() {
  return <RouterProvider router={router} />
}
