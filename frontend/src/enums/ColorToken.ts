export const ColorToken = {
  Primary: 'primary',
  PrimaryDark: 'primary-dark',
  PrimaryLight: 'primary-light',
  Background: 'background',
  Surface: 'surface',
  TextMuted: 'text-muted',
} as const

export type ColorToken = (typeof ColorToken)[keyof typeof ColorToken]
