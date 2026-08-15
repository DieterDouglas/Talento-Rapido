import { useQuery } from '@tanstack/react-query'
import { fetchSentServiceRequests } from '../lib/serviceRequestService'
import { useAuth } from './useAuth'

export function useMyServiceRequests() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['service-requests', 'sent'],
    queryFn: fetchSentServiceRequests,
    enabled: Boolean(user),
  })
}
