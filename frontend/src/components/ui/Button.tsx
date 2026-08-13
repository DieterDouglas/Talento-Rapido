import type { ButtonHTMLAttributes } from 'react'
import { ButtonVariant } from '../../enums/ButtonVariant'

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  [ButtonVariant.Primary]: 'bg-primary text-white hover:bg-primary-dark',
  [ButtonVariant.Secondary]: 'bg-primary-light text-primary hover:bg-primary-light/70',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

export function Button({ variant = ButtonVariant.Primary, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-lg px-5 py-2.5 font-semibold transition-colors ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  )
}
