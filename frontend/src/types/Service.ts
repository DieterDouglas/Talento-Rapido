import type { Category } from './Category'
import type { Review } from './Review'
import type { User } from './User'

export type Service = {
  id: number
  title: string
  description: string
  price: string
  location: string | null
  category: Category
  provider: User
  reviews?: Review[]
  reviews_avg_rating: string | null
  reviews_count: number
  neighbor_distance?: number
}
