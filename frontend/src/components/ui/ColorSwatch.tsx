import { ColorToken } from '../../enums/ColorToken'

const SWATCH_CLASSES: Record<ColorToken, string> = {
  [ColorToken.Primary]: 'bg-primary text-white',
  [ColorToken.PrimaryDark]: 'bg-primary-dark text-white',
  [ColorToken.PrimaryLight]: 'bg-primary-light text-text',
  [ColorToken.Background]: 'bg-background text-text border border-primary-light',
  [ColorToken.Surface]: 'bg-surface text-text border border-primary-light',
  [ColorToken.TextMuted]: 'bg-surface text-text-muted border border-primary-light',
}

type ColorSwatchProps = {
  token: ColorToken
}

export function ColorSwatch({ token }: ColorSwatchProps) {
  return (
    <div className={`flex h-20 items-center justify-center rounded-lg text-sm font-medium ${SWATCH_CLASSES[token]}`}>
      {token}
    </div>
  )
}
