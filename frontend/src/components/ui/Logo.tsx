import { Zap } from 'lucide-react'

export function Logo() {
  return (
    <div className="flex items-center gap-1.5 font-bold tracking-wide text-text">
      <Zap className="h-4 w-4 fill-primary text-primary" />
      <span className="text-sm">TALENTO FAST</span>
    </div>
  )
}
