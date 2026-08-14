import type { ServiceRequestStatus } from '../enums/ServiceRequestStatus'

export type ServiceRequestSummary = {
  id: number
  service_id: number
  requester_id: number
  status: ServiceRequestStatus
  requester: { id: number; name: string; avatar_url: string | null }
  service: {
    id: number
    title: string
    price: string
    category: { id: number; name: string }
    provider: { id: number; name: string; avatar_url: string | null }
  }
  review: { id: number; rating: number; comment: string | null; image_url: string | null } | null
}
