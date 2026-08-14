import { useQuery } from '@tanstack/react-query'
import { fetchMyServiceRequests } from '../lib/serviceRequestService'
import { useAuth } from './useAuth'

export function useMyServiceRequests() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['service-requests', 'mine'],
    queryFn: fetchMyServiceRequests,
    enabled: Boolean(user),
    select: (data) => data.filter((request) => request.requester_id === user?.id),
  })
}
