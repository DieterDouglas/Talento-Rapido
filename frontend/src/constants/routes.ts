export const AppRoute = {
  Home: '/',
  Login: '/login',
  Register: '/register',
  Services: '/services',
} as const

export type AppRoute = (typeof AppRoute)[keyof typeof AppRoute]
