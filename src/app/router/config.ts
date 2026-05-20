import { createBrowserRouter } from 'react-router'
import {
  HomePage,
  LoginPage,
  SignupPage,
  UsersPage,
  UserProfilePage,
} from '@/pages/home'
import { AuthGuard } from '@/widgets/AuthGuard'
import { MainLayout } from '../layouts/main-layout'
import { AuthLayout } from '../layouts/auth-layout'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    Component: AuthLayout,
    children: [
      {
        path: '/auth/login',
        Component: LoginPage,
      },
      {
        path: '/auth/signup',
        Component: SignupPage,
      },
    ],
  },
  {
    Component: AuthGuard,
    children: [
      {
        Component: MainLayout,
        children: [
          {
            path: '/users',
            Component: UsersPage,
          },
          {
            path: '/users/:userId/profile',
            Component: UserProfilePage,
          },
        ],
      },
    ],
  },
])
