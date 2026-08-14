export const ServiceSortField = {
  Name: 'name',
  Rating: 'rating',
  ReviewsCount: 'reviews_count',
} as const

export type ServiceSortField = (typeof ServiceSortField)[keyof typeof ServiceSortField]
