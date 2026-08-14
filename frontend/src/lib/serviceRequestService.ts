import { api } from './api'
import type { ServiceRequestSummary } from '../types/ServiceRequestSummary'

export async function createServiceRequest(serviceId: number): Promise<void> {
  await api.post('/service-requests', { service_id: serviceId })
}

export async function fetchMyServiceRequestsForService(serviceId: number): Promise<ServiceRequestSummary[]> {
  const { data } = await api.get<ServiceRequestSummary[]>('/service-requests', {
    params: { service_id: serviceId },
  })

  return data
}

export async function fetchMyServiceRequests(): Promise<ServiceRequestSummary[]> {
  const { data } = await api.get<ServiceRequestSummary[]>('/service-requests')

  return data
}
