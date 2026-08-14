import { Link } from 'react-router-dom'
import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'
import { LinkButton } from '../ui/LinkButton'
import { Logo } from '../ui/Logo'
import { NAV_LINKS } from '../../constants/navigation'
import { AppRoute } from '../../constants/routes'
import { ButtonVariant } from '../../enums/ButtonVariant'
import { useAuth } from '../../hooks/useAuth'
import { NavItem } from './NavItem'

export function Header() {
  const { user, isLoading, signOut } = useAuth()

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
        {isLoading ? null : user ? (
          <>
            <Link to={AppRoute.Profile} className="flex items-center gap-2">
              <Avatar src={user.avatar_url} name={user.name} size={32} />
              <span className="text-sm font-medium text-text">Olá, {user.name}</span>
            </Link>
            <Button variant={ButtonVariant.Secondary} onClick={() => signOut()}>
              Sair
            </Button>
          </>
        ) : (
          <>
            <LinkButton to={AppRoute.Login} variant={ButtonVariant.Primary}>
              Login
            </LinkButton>
            <LinkButton to={AppRoute.Register} variant={ButtonVariant.Primary}>
              Criar Conta
            </LinkButton>
          </>
        )}
      </div>
    </header>
  )
}
