import { useRouteError, isRouteErrorResponse } from 'react-router'
import { useTranslation } from 'react-i18next'

export const RootErrorBoundary = () => {
  const { t } = useTranslation('common')
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    )
  }

  if (error instanceof Error) {
    return (
      <div>
        <h1>{t('errors.title')}</h1>
        <p>{error.message}</p>
        <p>{t('errors.stackTrace')}</p>
        <pre>{error.stack}</pre>
      </div>
    )
  }

  return <h1>{t('errors.unknown')}</h1>
}
