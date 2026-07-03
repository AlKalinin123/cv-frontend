import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useMatches, Link as RouterLink, type UIMatch } from 'react-router'

type BreadcrumbHandle<T = unknown> = {
  breadcrumb?: string | ((match: UIMatch<T>) => React.ReactNode)
}

type BreadcrumbMatch<T = unknown> = UIMatch<T, BreadcrumbHandle<T>>

export const Breadcrumbs = () => {
  const { t } = useTranslation('common')
  const matches = useMatches()

  const breadcrumbs = matches.filter(
    (match) =>
      match.handle && 'breadcrumb' in (match.handle as BreadcrumbHandle),
  ) as BreadcrumbMatch[]

  const resolveLabel = (
    breadcrumb: BreadcrumbHandle['breadcrumb'],
    match: BreadcrumbMatch,
  ) => {
    if (typeof breadcrumb === 'function') {
      return breadcrumb(match)
    }

    return breadcrumb?.includes('.') ? t(breadcrumb) : breadcrumb
  }

  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map((match, index) => {
        const isLast = index === breadcrumbs.length - 1
        const breadcrumb = (match.handle as BreadcrumbHandle)?.breadcrumb
        const label = resolveLabel(breadcrumb, match)

        if (isLast) {
          return <Typography key={match.pathname}>{label}</Typography>
        }

        return (
          <Link
            key={match.pathname}
            component={RouterLink}
            to={match.pathname}
            underline="hover"
            color="inherit"
          >
            {label}
          </Link>
        )
      })}
    </MuiBreadcrumbs>
  )
}
