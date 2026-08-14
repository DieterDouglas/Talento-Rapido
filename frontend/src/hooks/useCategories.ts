import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '../lib/serviceService'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })
}
