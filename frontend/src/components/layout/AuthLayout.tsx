import type { PropsWithChildren } from 'react'

type AuthLayoutProps = PropsWithChildren<{
  title: string
  subtitle: string
}>

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 px-6">
      <div>
        <h1 className="text-2xl font-bold text-text">{title}</h1>
        <p className="text-text-muted">{subtitle}</p>
      </div>
      {children}
    </main>
  )
}
