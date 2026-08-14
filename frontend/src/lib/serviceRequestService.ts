import { api } from './api'

export async function createServiceRequest(serviceId: number): Promise<void> {
  await api.post('/service-requests', { service_id: serviceId })
}
