import type { Review } from '../../types/Review'
import { RatingStars } from '../ui/RatingStars'

type ReviewListProps = {
  reviews: Review[]
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return <p className="text-sm text-text-muted">Ainda não há avaliações para este serviço.</p>
  }

  return (
    <ul className="flex flex-col gap-4">
      {reviews.map((review) => (
        <li key={review.id} className="rounded-xl border border-primary-light bg-surface p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-text">{review.service_request.requester.name}</span>
            <RatingStars rating={review.rating} />
          </div>
          {review.comment && <p className="mt-2 text-sm text-text-muted">{review.comment}</p>}
          {review.image_url && (
            <img src={review.image_url} alt="" className="mt-3 h-32 w-32 rounded-lg object-cover" />
          )}
        </li>
      ))}
    </ul>
  )
}
