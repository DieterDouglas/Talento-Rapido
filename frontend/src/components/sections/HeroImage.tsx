import { ImageOff } from 'lucide-react'

export function HeroImage() {
  return (
    <div className="flex aspect-square w-full max-w-md items-center justify-center rounded-full border-[14px] border-primary bg-primary-light">
      <ImageOff className="h-16 w-16 text-primary" strokeWidth={1.5} />
    </div>
  )
}
