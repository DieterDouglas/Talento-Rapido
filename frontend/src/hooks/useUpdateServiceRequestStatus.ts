import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateServiceRequestStatus } from '../lib/serviceRequestService'
import type { ServiceRequestStatus } from '../enums/ServiceRequestStatus'

export function useUpdateServiceRequestStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: ServiceRequestStatus }) =>
      updateServiceRequestStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-request'] })
    },
  })
}
