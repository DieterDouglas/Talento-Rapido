import type { PropsWithChildren } from 'react'

export function Highlight({ children }: PropsWithChildren) {
  return <span className="text-primary">{children}</span>
}
