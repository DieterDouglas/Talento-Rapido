import { useQuery } from '@tanstack/react-query'
import { fetchReceivedServiceRequests } from '../lib/serviceRequestService'
import { useAuth } from './useAuth'

export function useReceivedServiceRequests() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['service-requests', 'received'],
    queryFn: fetchReceivedServiceRequests,
    enabled: Boolean(user),
  })
}
