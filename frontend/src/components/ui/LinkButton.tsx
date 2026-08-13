import { Link, type LinkProps } from 'react-router-dom'
import { ButtonVariant } from '../../enums/ButtonVariant'
import { BUTTON_BASE_CLASSES, BUTTON_VARIANT_CLASSES } from '../../lib/buttonStyles'

type LinkButtonProps = LinkProps & {
  variant?: ButtonVariant
}

export function LinkButton({ variant = ButtonVariant.Primary, className = '', ...props }: LinkButtonProps) {
  return (
    <Link
      className={`${BUTTON_BASE_CLASSES} ${BUTTON_VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  )
}
