import { useQuery } from '@tanstack/react-query'
import { fetchMyServiceRequests } from '../lib/serviceRequestService'
import { useAuth } from './useAuth'

export function useReceivedServiceRequests() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['service-requests'],
    queryFn: fetchMyServiceRequests,
    enabled: Boolean(user),
    select: (data) => data.filter((request) => request.service.provider.id === user?.id),
  })
}
