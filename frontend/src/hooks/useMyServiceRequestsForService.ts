import { useQuery } from '@tanstack/react-query'
import { fetchSentServiceRequestsForService } from '../lib/serviceRequestService'
import { useAuth } from './useAuth'

export function useMyServiceRequestsForService(serviceId: number) {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['service-requests', 'sent', { serviceId }],
    queryFn: () => fetchSentServiceRequestsForService(serviceId),
    enabled: Boolean(user) && Number.isFinite(serviceId),
  })
}
