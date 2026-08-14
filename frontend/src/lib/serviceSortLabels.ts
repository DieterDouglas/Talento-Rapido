import { ServiceSortField } from '../enums/ServiceSortField'
import { SortDirection } from '../enums/SortDirection'

export const SERVICE_SORT_FIELD_LABELS: Record<ServiceSortField, string> = {
  [ServiceSortField.Name]: 'Nome',
  [ServiceSortField.Rating]: 'Avaliação',
  [ServiceSortField.ReviewsCount]: 'Número de avaliações',
}

export const SORT_DIRECTION_LABELS: Record<SortDirection, string> = {
  [SortDirection.Asc]: 'Crescente',
  [SortDirection.Desc]: 'Decrescente',
}
