import type { PropsWithChildren } from 'react'

export function CarouselItem({ children }: PropsWithChildren) {
  return <div className="w-72 shrink-0 sm:w-80">{children}</div>
}
