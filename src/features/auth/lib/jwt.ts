export function getTokenExpiration(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1] ?? '')) as {
      exp?: number
    }

    return typeof payload.exp === 'number' ? payload.exp : null
  } catch {
    return null
  }
}

export function isTokenExpired(
  token: string | null | undefined,
  skewSeconds = 30,
): boolean {
  if (!token) {
    return true
  }

  const exp = getTokenExpiration(token)

  if (!exp) {
    return true
  }

  return Date.now() >= (exp - skewSeconds) * 1000
}
