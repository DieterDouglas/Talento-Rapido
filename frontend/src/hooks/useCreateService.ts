import { useMutation } from '@tanstack/react-query'
import { createService } from '../lib/serviceService'

export function useCreateService() {
  return useMutation({
    mutationFn: createService,
  })
}
