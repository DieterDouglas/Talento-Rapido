export const ButtonVariant = {
  Primary: 'primary',
  Secondary: 'secondary',
} as const

export type ButtonVariant = (typeof ButtonVariant)[keyof typeof ButtonVariant]
