import { useQuery } from '@tanstack/react-query'
import { fetchMyServiceRequestsForService } from '../lib/serviceRequestService'
import { useAuth } from './useAuth'

export function useMyServiceRequestsForService(serviceId: number) {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['service-requests', { serviceId }],
    queryFn: () => fetchMyServiceRequestsForService(serviceId),
    enabled: Boolean(user) && Number.isFinite(serviceId),
  })
}
