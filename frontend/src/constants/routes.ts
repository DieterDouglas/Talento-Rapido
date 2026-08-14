export const AppRoute = {
  Home: '/',
  Login: '/login',
  Register: '/register',
  Services: '/services',
  CreateService: '/services/new',
  ServiceDetail: '/services/:id',
  Profile: '/profile',
} as const

export type AppRoute = (typeof AppRoute)[keyof typeof AppRoute]

export function serviceDetailPath(id: number | string): string {
  return `/services/${id}`
}
