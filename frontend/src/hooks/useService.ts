import { useQuery } from '@tanstack/react-query'
import { fetchService } from '../lib/serviceService'

export function useService(id: number) {
  return useQuery({
    queryKey: ['services', id],
    queryFn: () => fetchService(id),
    enabled: Number.isFinite(id),
  })
}
