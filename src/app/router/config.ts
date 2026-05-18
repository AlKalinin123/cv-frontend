import { createBrowserRouter } from 'react-router'
import { HomePage, LoginPage, SignupPage, UsersPage } from '@/pages/home'
import { AuthGuard } from '@/widgets/AuthGuard'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/auth/login',
    Component: LoginPage,
  },
  {
    path: '/auth/signup',
    Component: SignupPage,
  },
  {
    Component: AuthGuard,
    children: [
      {
        path: '/users',
        Component: UsersPage,
      },
    ],
  },
])
