import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material'
import { useMatches, Link as RouterLink } from 'react-router'

export const Breadcrumbs = () => {
  const matches = useMatches()

  const breadcrumbs = matches.filter((match) => match.handle?.breadcrumb)

  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map((match, index) => {
        const isLast = index === breadcrumbs.length - 1

        const breadcrumb = match.handle?.breadcrumb

        const label =
          typeof breadcrumb === 'function' ? breadcrumb(match) : breadcrumb

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
