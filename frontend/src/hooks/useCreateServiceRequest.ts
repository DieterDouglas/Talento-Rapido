import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createServiceRequest } from '../lib/serviceRequestService'

export function useCreateServiceRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createServiceRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-requests'] })
    },
  })
}
