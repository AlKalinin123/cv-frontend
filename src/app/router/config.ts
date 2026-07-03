import { createBrowserRouter, redirect, type UIMatch } from 'react-router'
import { LoginPage } from '@/pages/login-page'
import { SettingsPage } from '@/pages/settings-page'
import { SignupPage } from '@/pages/signup-page'
import { SkillsPage } from '@/pages/skills-page'
import { UsersPage } from '@/pages/users-page'
import { UserProfilePage } from '@/pages/user-profile-page'
import { AuthGuard } from '@/widgets/auth-guard'
import { MainLayout } from '../layouts/main-layout'
import { AuthLayout } from '../layouts/auth-layout'
import { userLoader } from './loaders/user.loader'
import type { User } from '@/shared/api/graphql/generated'
import { RootErrorBoundary } from './ui/RootErrorBoundary'

export const router = createBrowserRouter([
  {
    path: '/',
    ErrorBoundary: RootErrorBoundary,
    loader: () => redirect('/users'),
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
            handle: {
              breadcrumb: 'Users',
            },
            children: [
              {
                index: true,
                Component: UsersPage,
              },
              {
                path: ':userId',
                children: [
                  {
                    path: 'profile',
                    Component: UserProfilePage,
                    loader: userLoader,
                    handle: {
                      breadcrumb: (match: UIMatch<User>) => {
                        const user = match.data
                        return user ? user.email : 'User'
                      },
                    },
                  },
                ],
              },
            ],
          },
          {
            path: '/skills',
            Component: SkillsPage,
          },
          {
            path: '/settings',
            Component: SettingsPage,
          },
        ],
      },
    ],
  },
])
