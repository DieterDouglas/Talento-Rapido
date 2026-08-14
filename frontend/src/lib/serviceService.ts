import { api } from './api'
import type { Category } from '../types/Category'
import type { Paginated } from '../types/Paginated'
import type { Service } from '../types/Service'
import type { ServiceSortField } from '../enums/ServiceSortField'
import type { SortDirection } from '../enums/SortDirection'

export type ServiceFilters = {
  search?: string
  categoryId?: number
  page?: number
  sortField?: ServiceSortField
  sortDirection?: SortDirection
}

export async function fetchServices(filters: ServiceFilters = {}): Promise<Paginated<Service>> {
  const { data } = await api.get<Paginated<Service>>('/services', {
    params: {
      search: filters.search || undefined,
      category_id: filters.categoryId,
      page: filters.page,
      sort: filters.sortField,
      direction: filters.sortDirection,
    },
  })

  return data
}

export async function fetchService(id: number): Promise<Service> {
  const { data } = await api.get<Service>(`/services/${id}`)

  return data
}

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await api.get<Category[]>('/categories')

  return data
}

export type CreateServicePayload = {
  category_id: number
  title: string
  description: string
  price: number
  location: string | null
}

export async function createService(payload: CreateServicePayload): Promise<Service> {
  const { data } = await api.post<Service>('/services', payload)

  return data
}

export async function smartSearchServices(query: string): Promise<Service[]> {
  const { data } = await api.post<Service[]>('/services/smart-search', { query })

  return data
}
