import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { NavLink } from '../../constants/navigation'

type NavItemProps = {
  link: NavLink
}

export function NavItem({ link }: NavItemProps) {
  return (
    <Link to={link.href} className="flex items-center gap-1 text-sm font-medium text-text hover:text-primary">
      {link.label}
      {link.hasDropdown && <ChevronDown className="h-4 w-4" />}
    </Link>
  )
}
