import type { Category } from './Category'
import type { User } from './User'

export type Service = {
  id: number
  title: string
  description: string
  price: string
  location: string | null
  category: Category
  provider: User
}
