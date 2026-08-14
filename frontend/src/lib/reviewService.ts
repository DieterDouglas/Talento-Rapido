import { api } from './api'
import type { Review } from '../types/Review'

export type CreateReviewPayload = {
  rating: number
  comment: string
  image: File | null
}

export async function createReview(serviceRequestId: number, payload: CreateReviewPayload): Promise<Review> {
  const formData = new FormData()
  formData.append('rating', String(payload.rating))

  if (payload.comment) {
    formData.append('comment', payload.comment)
  }

  if (payload.image) {
    formData.append('image', payload.image)
  }

  const { data } = await api.post<Review>(`/service-requests/${serviceRequestId}/review`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return data
}
