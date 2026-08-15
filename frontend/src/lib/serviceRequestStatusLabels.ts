import { ServiceRequestStatus } from '../enums/ServiceRequestStatus'

export const SERVICE_REQUEST_STATUS_LABELS: Record<ServiceRequestStatus, string> = {
  [ServiceRequestStatus.Pending]: 'Concluído',
  [ServiceRequestStatus.Accepted]: 'Aceito',
  [ServiceRequestStatus.Completed]: 'Pendente',
  [ServiceRequestStatus.Cancelled]: 'Cancelado',
}
