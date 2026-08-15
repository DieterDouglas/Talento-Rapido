import { api } from './api'
import type { ServiceRequestStatus } from '../enums/ServiceRequestStatus'
import type { ServiceRequestSummary } from '../types/ServiceRequestSummary'

export async function createServiceRequest(serviceId: number): Promise<void> {
  await api.post('/service-requests', { service_id: serviceId })
}

export async function fetchSentServiceRequestsForService(serviceId: number): Promise<ServiceRequestSummary[]> {
  const { data } = await api.get<ServiceRequestSummary[]>('/service-requests/sent', {
    params: { service_id: serviceId },
  })

  return data
}

export async function fetchSentServiceRequests(): Promise<ServiceRequestSummary[]> {
  const { data } = await api.get<ServiceRequestSummary[]>('/service-requests/sent')

  return data
}

export async function fetchReceivedServiceRequests(): Promise<ServiceRequestSummary[]> {
  const { data } = await api.get<ServiceRequestSummary[]>('/service-requests/received')

  return data
}

export async function updateServiceRequestStatus(
  id: number,
  status: ServiceRequestStatus
): Promise<ServiceRequestSummary> {
  const { data } = await api.patch<ServiceRequestSummary>(`/service-requests/${id}/status`, { status })

  return data
}
