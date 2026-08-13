export const AppRoute = {
  Home: '/',
} as const

export type AppRoute = (typeof AppRoute)[keyof typeof AppRoute]
