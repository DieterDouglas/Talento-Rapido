import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createReview } from '../lib/reviewService'

export function useCreateReview(serviceId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: Parameters<typeof createReview>[1] & { serviceRequestId: number }) =>
      createReview(payload.serviceRequestId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services', serviceId] })
      queryClient.invalidateQueries({ queryKey: ['service-requests'] })
    },
  })
}
