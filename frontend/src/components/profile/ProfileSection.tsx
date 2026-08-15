import type { LucideIcon } from 'lucide-react'
import type { PropsWithChildren } from 'react'

type ProfileSectionProps = PropsWithChildren<{
  title: string
  icon: LucideIcon
  count?: number
}>

export function ProfileSection({ title, icon: Icon, count, children }: ProfileSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold text-text">{title}</h2>
        {Boolean(count) && (
          <span className="rounded-full bg-primary-light px-2 py-0.5 text-xs font-semibold text-primary">
            {count}
          </span>
        )}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  )
}
