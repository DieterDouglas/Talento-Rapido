import { Search } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'

export function SearchInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-primary-light bg-surface px-4 py-3">
      <Search className="h-5 w-5 shrink-0 text-primary" />
      <input
        type="text"
        className="w-full bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none"
        {...props}
      />
    </div>
  )
}
