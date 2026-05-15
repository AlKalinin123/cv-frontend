import { createBrowserRouter } from 'react-router'
import { HomePage, LoginPage, SignupPage } from '@/pages/home'

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
])
