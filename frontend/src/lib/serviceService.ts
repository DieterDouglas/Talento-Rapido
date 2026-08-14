import { api } from './api'
import type { Category } from '../types/Category'
import type { Paginated } from '../types/Paginated'
import type { Service } from '../types/Service'

export type ServiceFilters = {
  search?: string
  categoryId?: number
  page?: number
}

export async function fetchServices(filters: ServiceFilters = {}): Promise<Paginated<Service>> {
  const { data } = await api.get<Paginated<Service>>('/services', {
    params: {
      search: filters.search || undefined,
      category_id: filters.categoryId,
      page: filters.page,
    },
  })

  return data
}

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await api.get<Category[]>('/categories')

  return data
}
