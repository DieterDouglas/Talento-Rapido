import { ButtonVariant } from '../enums/ButtonVariant'

export const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
  [ButtonVariant.Primary]: 'bg-primary text-white hover:bg-primary-dark',
  [ButtonVariant.Secondary]: 'bg-primary-light text-primary hover:bg-primary-light/70',
}

export const BUTTON_BASE_CLASSES = 'inline-flex items-center justify-center rounded-lg px-5 py-2.5 font-semibold transition-colors'
