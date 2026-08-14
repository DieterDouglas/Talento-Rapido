export type Review = {
  id: number
  rating: number
  comment: string | null
  image_url: string | null
  created_at: string
  service_request: {
    requester: {
      id: number
      name: string
    }
  }
}
