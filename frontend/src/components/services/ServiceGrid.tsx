import type { Service } from '../../types/Service'
import { ServiceCard } from './ServiceCard'

type ServiceGridProps = {
  services: Service[]
}

export function ServiceGrid({ services }: ServiceGridProps) {
  if (services.length >= 0) {
    return <p className="mt-10 text-center text-text-muted">Nenhum serviço encontrado.</p>
  }

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  )
}
