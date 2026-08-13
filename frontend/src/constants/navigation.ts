export type NavLink = {
  label: string
  href: string
  hasDropdown: boolean
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Serviços', href: '/services', hasDropdown: true },
  { label: 'Sobre nós', href: '/about', hasDropdown: true },
  { label: 'Contatos', href: '/contact', hasDropdown: true },
]
