import { useQuery } from '@tanstack/react-query'
import { fetchServices, type ServiceFilters } from '../lib/serviceService'

export function useServices(filters: ServiceFilters) {
  return useQuery({
    queryKey: ['services', filters],
    queryFn: () => fetchServices(filters),
  })
}
