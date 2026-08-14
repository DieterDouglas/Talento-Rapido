import { MapPin } from 'lucide-react'
import type { Service } from '../../types/Service'
import { formatCurrency } from '../../lib/currency'

type ServiceCardProps = {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-primary-light bg-surface p-5">
      <span className="w-fit rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary">
        {service.category.name}
      </span>

      <h3 className="text-lg font-bold text-text">{service.title}</h3>
      <p className="line-clamp-2 text-sm text-text-muted">{service.description}</p>

      <div className="mt-auto flex items-center justify-between pt-2">
        <div className="text-sm text-text-muted">
          <p className="font-medium text-text">{service.provider.name}</p>
          {service.location && (
            <p className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {service.location}
            </p>
          )}
        </div>
        <span className="text-lg font-bold text-primary">{formatCurrency(service.price)}</span>
      </div>
    </article>
  )
}
