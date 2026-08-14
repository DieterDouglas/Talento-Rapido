import { RatingStars } from '../ui/RatingStars'
import type { Service } from '../../types/Service'

type ServiceRatingProps = {
  service: Pick<Service, 'reviews_avg_rating' | 'reviews_count'>
}

export function ServiceRating({ service }: ServiceRatingProps) {
  const average = service.reviews_avg_rating ? Number(service.reviews_avg_rating) : null

  return (
    <div className="flex items-center gap-2">
      <RatingStars rating={average ? Math.round(average) : 0} />
      <span className="text-xs text-text-muted">
        {average ? `${average.toFixed(1)} (${service.reviews_count})` : 'Sem avaliações'}
      </span>
    </div>
  )
}
