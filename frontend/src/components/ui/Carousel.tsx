import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef, type PropsWithChildren } from 'react'

export function Carousel({ children }: PropsWithChildren) {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scroll(direction: 'left' | 'right') {
    const container = scrollRef.current

    if (!container) return

    const amount = container.clientWidth * 0.8
    container.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-light bg-surface p-2 text-primary shadow-md hover:bg-primary-light"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth px-2 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 rounded-full border border-primary-light bg-surface p-2 text-primary shadow-md hover:bg-primary-light"
        aria-label="Próximo"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
