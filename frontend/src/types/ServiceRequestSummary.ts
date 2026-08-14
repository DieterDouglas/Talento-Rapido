export type ServiceRequestSummary = {
  id: number
  service_id: number
  requester_id: number
  status: 'pending' | 'accepted' | 'completed' | 'cancelled'
  review: { id: number } | null
}
