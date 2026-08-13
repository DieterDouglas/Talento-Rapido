import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'
import { NAV_LINKS } from '../../constants/navigation'
import { ButtonVariant } from '../../enums/ButtonVariant'
import { NavItem } from './NavItem'

export function Header() {
  return (
    <header className="flex items-center justify-between bg-background px-10 py-4">
      <div className="flex items-center gap-12">
        <Logo />
        <nav className="flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavItem key={link.href} link={link} />
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <Button variant={ButtonVariant.Primary}>Login</Button>
        <Button variant={ButtonVariant.Primary}>Criar Conta</Button>
      </div>
    </header>
  )
}
