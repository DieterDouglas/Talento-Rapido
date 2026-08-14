import { Menu, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
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

type HeaderSectionProps = {
  onNavigate?: () => void
}

function HeaderNavLinks({ onNavigate }: HeaderSectionProps) {
  return (
    <>
      {NAV_LINKS.map((link) => (
        <NavItem key={link.href} link={link} />
      ))}
      <Link
        to={AppRoute.SmartSearch}
        onClick={onNavigate}
        className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark"
      >
        <Sparkles className="h-4 w-4" />
        Busca com IA
      </Link>
    </>
  )
}

function HeaderAuthActions({ onNavigate }: HeaderSectionProps) {
  const { user, isLoading, signOut } = useAuth()

  if (isLoading) {
    return null
  }

  if (user) {
    return (
      <>
        <Link to={AppRoute.Profile} onClick={onNavigate} className="flex items-center gap-2">
          <Avatar src={user.avatar_url} name={user.name} size={32} />
          <span className="text-sm font-medium text-text">Olá, {user.name}</span>
        </Link>
        <Button
          variant={ButtonVariant.Secondary}
          onClick={() => {
            signOut()
            onNavigate?.()
          }}
        >
          Sair
        </Button>
      </>
    )
  }

  return (
    <>
      <LinkButton to={AppRoute.Login} variant={ButtonVariant.Primary} onClick={onNavigate}>
        Login
      </LinkButton>
      <LinkButton to={AppRoute.Register} variant={ButtonVariant.Primary} onClick={onNavigate}>
        Criar Conta
      </LinkButton>
    </>
  )
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="inset-x-0 top-0 bg-primary-light px-6 py-4 lg:px-10">
      <div className="flex items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          <HeaderNavLinks />
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <HeaderAuthActions />
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="text-text lg:hidden"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="mt-4 flex flex-col gap-4 border-t border-primary-light pt-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            <HeaderNavLinks onNavigate={() => setIsMenuOpen(false)} />
          </nav>

          <div className="flex flex-col gap-3">
            <HeaderAuthActions onNavigate={() => setIsMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  )
}
