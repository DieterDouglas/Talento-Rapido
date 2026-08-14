import { ServiceRequestStatus } from '../enums/ServiceRequestStatus'

export const SERVICE_REQUEST_STATUS_LABELS: Record<ServiceRequestStatus, string> = {
  [ServiceRequestStatus.Pending]: 'Pendente',
  [ServiceRequestStatus.Accepted]: 'Aceito',
  [ServiceRequestStatus.Completed]: 'Concluído',
  [ServiceRequestStatus.Cancelled]: 'Cancelado',
}
