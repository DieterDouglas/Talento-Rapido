import { isAxiosError } from 'axios'

export function extractFieldErrors(error: unknown): Record<string, string> {
  if (!isAxiosError(error) || !error.response) {
    return {}
  }

  const errors = error.response.data?.errors as Record<string, string[]> | undefined

  if (!errors) {
    return {}
  }

  return Object.fromEntries(Object.entries(errors).map(([field, messages]) => [field, messages[0]]))
}

export function extractErrorMessage(error: unknown): string {
  if (isAxiosError(error) && error.response?.data?.message) {
    return error.response.data.message as string
  }

  return 'Algo deu errado. Tente novamente.'
}
