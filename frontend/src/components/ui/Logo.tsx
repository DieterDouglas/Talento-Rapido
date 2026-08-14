import { Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AppRoute } from '../../constants/routes'

export function Logo() {
  return (
    <Link to={AppRoute.Home} className="flex items-center gap-1.5 font-bold tracking-wide text-text">
      <Zap className="h-4 w-4 fill-primary text-primary" />
      <span className="text-sm">TALENTO RÁPIDO</span>
    </Link>
  )
}
