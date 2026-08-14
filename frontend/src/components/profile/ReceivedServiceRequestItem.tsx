import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'
import { RatingStars } from '../ui/RatingStars'
import { ButtonVariant } from '../../enums/ButtonVariant'
import { ServiceRequestStatus } from '../../enums/ServiceRequestStatus'
import { formatCurrency } from '../../lib/currency'
import { SERVICE_REQUEST_STATUS_LABELS } from '../../lib/serviceRequestStatusLabels'
import { useUpdateServiceRequestStatus } from '../../hooks/useUpdateServiceRequestStatus'
import type { ServiceRequestSummary } from '../../types/ServiceRequestSummary'

type ReceivedServiceRequestItemProps = {
  request: ServiceRequestSummary
}

export function ReceivedServiceRequestItem({ request }: ReceivedServiceRequestItemProps) {
  const updateStatus = useUpdateServiceRequestStatus()

  return (
    <div className="rounded-xl border border-primary-light bg-surface px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar src={request.requester.avatar_url} name={request.requester.name} size={36} />
          <div>
            <p className="font-semibold text-text">{request.service.title}</p>
            <p className="text-sm text-text-muted">Solicitado por {request.requester.name}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-bold text-primary">{formatCurrency(request.service.price)}</p>
          <span className="text-xs font-medium text-text-muted">
            {SERVICE_REQUEST_STATUS_LABELS[request.status]}
          </span>
        </div>
      </div>

      {updateStatus.isError && (
        <p className="mt-3 text-sm text-red-600">Não foi possível atualizar o pedido. Tente novamente.</p>
      )}

      {request.status === ServiceRequestStatus.Pending && (
        <div className="mt-3 flex gap-2">
          <Button
            variant={ButtonVariant.Primary}
            disabled={updateStatus.isPending}
            onClick={() => updateStatus.mutate({ id: request.id, status: ServiceRequestStatus.Accepted })}
          >
            Aceitar
          </Button>
          <Button
            variant={ButtonVariant.Secondary}
            disabled={updateStatus.isPending}
            onClick={() => updateStatus.mutate({ id: request.id, status: ServiceRequestStatus.Cancelled })}
          >
            Recusar
          </Button>
        </div>
      )}

      {request.status === ServiceRequestStatus.Accepted && (
        <div className="mt-3 flex gap-2">
          <Button
            variant={ButtonVariant.Primary}
            disabled={updateStatus.isPending}
            onClick={() => updateStatus.mutate({ id: request.id, status: ServiceRequestStatus.Completed })}
          >
            Marcar como concluído
          </Button>
          <Button
            variant={ButtonVariant.Secondary}
            disabled={updateStatus.isPending}
            onClick={() => updateStatus.mutate({ id: request.id, status: ServiceRequestStatus.Cancelled })}
          >
            Cancelar
          </Button>
        </div>
      )}

      {request.status === ServiceRequestStatus.Completed && request.review && (
        <div className="mt-3 flex items-center gap-2">
          <RatingStars rating={request.review.rating} />
          {request.review.comment && <p className="text-sm text-text-muted">{request.review.comment}</p>}
        </div>
      )}
    </div>
  )
}
