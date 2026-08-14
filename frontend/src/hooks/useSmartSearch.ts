import { useMutation } from '@tanstack/react-query'
import { smartSearchServices } from '../lib/serviceService'

export function useSmartSearch() {
  return useMutation({
    mutationFn: smartSearchServices,
  })
}
