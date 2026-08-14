export const ServiceRequestStatus = {
  Pending: 'pending',
  Accepted: 'accepted',
  Completed: 'completed',
  Cancelled: 'cancelled',
} as const

export type ServiceRequestStatus = (typeof ServiceRequestStatus)[keyof typeof ServiceRequestStatus]
