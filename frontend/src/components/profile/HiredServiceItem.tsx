import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ReviewForm } from '../services/ReviewForm'
import { Button } from '../ui/Button'
import { RatingStars } from '../ui/RatingStars'
import { serviceDetailPath } from '../../constants/routes'
import { ButtonVariant } from '../../enums/ButtonVariant'
import { ServiceRequestStatus } from '../../enums/ServiceRequestStatus'
import { formatCurrency } from '../../lib/currency'
import { SERVICE_REQUEST_STATUS_LABELS } from '../../lib/serviceRequestStatusLabels'
import type { ServiceRequestSummary } from '../../types/ServiceRequestSummary'

type HiredServiceItemProps = {
  request: ServiceRequestSummary
}

export function HiredServiceItem({ request }: HiredServiceItemProps) {
  const [isReviewing, setIsReviewing] = useState(false)
  const canReview = request.status === ServiceRequestStatus.Completed && !request.review

  return (
    <div className="flex h-full flex-col rounded-xl border border-primary-light bg-surface p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <Link
            to={serviceDetailPath(request.service.id)}
            className="block truncate font-semibold text-text hover:text-primary"
          >
            {request.service.title}
          </Link>
          <p className="truncate text-sm text-text-muted">
            {request.service.category.name} · {request.service.provider.name}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="font-bold text-primary">{formatCurrency(request.service.price)}</p>
          <span className="text-xs font-medium text-text-muted">
            {SERVICE_REQUEST_STATUS_LABELS[request.status]}
          </span>
        </div>
      </div>

      <div className="mt-auto pt-3">
        {request.review && (
          <div className="flex items-start gap-3">
            <div>
              <RatingStars rating={request.review.rating} />
              {request.review.comment && (
                <p className="mt-1 line-clamp-2 text-sm text-text-muted">{request.review.comment}</p>
              )}
            </div>
            {request.review.image_url && (
              <img src={request.review.image_url} alt="" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
            )}
          </div>
        )}

        {canReview && !isReviewing && (
          <Button variant={ButtonVariant.Secondary} onClick={() => setIsReviewing(true)}>
            Avaliar
          </Button>
        )}

        {canReview && isReviewing && (
          <ReviewForm
            serviceId={request.service.id}
            serviceRequestId={request.id}
            onSuccess={() => setIsReviewing(false)}
          />
        )}
      </div>
    </div>
  )
}
