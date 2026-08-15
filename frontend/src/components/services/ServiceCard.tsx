import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Service } from '../../types/Service'
import { formatCurrency } from '../../lib/currency'
import { serviceDetailPath } from '../../constants/routes'
import { Avatar } from '../ui/Avatar'
import { ServiceRating } from './ServiceRating'

type ServiceCardProps = {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      to={serviceDetailPath(service.id)}
      className="flex h-full flex-col gap-3 rounded-xl border border-primary-light bg-surface p-5 transition-shadow hover:shadow-md"
    >
      <span className="w-fit rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary">
        {service.category.name}
      </span>

      <h3 className="text-lg font-bold text-text">{service.title}</h3>
      <ServiceRating service={service} />
      <p className="line-clamp-2 text-sm text-text-muted">{service.description}</p>

      <div className="mt-auto flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Avatar src={service.provider.avatar_url} name={service.provider.name} size={28} />
          <div>
            <p className="font-medium text-text">{service.provider.name}</p>
            {service.location && (
              <p className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {service.location}
              </p>
            )}
          </div>
        </div>
        <span className="text-lg font-bold text-primary">{formatCurrency(service.price)}</span>
      </div>
    </Link>
  )
}
