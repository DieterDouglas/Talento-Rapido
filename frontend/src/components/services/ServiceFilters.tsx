import { SearchInput } from '../ui/SearchInput'
import { Select } from '../ui/Select'
import type { Category } from '../../types/Category'
import { ServiceSortField } from '../../enums/ServiceSortField'
import { SortDirection } from '../../enums/SortDirection'
import { SERVICE_SORT_FIELD_LABELS, SORT_DIRECTION_LABELS } from '../../lib/serviceSortLabels'

type ServiceFiltersProps = {
  search: string
  onSearchChange: (value: string) => void
  categoryId: number | undefined
  onCategoryChange: (categoryId: number | undefined) => void
  categories: Category[]
  sortField: ServiceSortField | undefined
  onSortFieldChange: (field: ServiceSortField | undefined) => void
  sortDirection: SortDirection
  onSortDirectionChange: (direction: SortDirection) => void
}

export function ServiceFilters({
  search,
  onSearchChange,
  categoryId,
  onCategoryChange,
  categories,
  sortField,
  onSortFieldChange,
  sortDirection,
  onSortDirectionChange,
}: ServiceFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
      <div className="min-w-60 flex-1">
        <SearchInput
          placeholder="O que você precisa ?"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <Select
        className="sm:w-56"
        placeholder="Todas as categorias"
        value={categoryId ?? ''}
        onChange={(event) => onCategoryChange(event.target.value ? Number(event.target.value) : undefined)}
        options={categories.map((category) => ({ value: String(category.id), label: category.name }))}
      />

      <Select
        className="sm:w-56"
        placeholder="Mais recentes"
        value={sortField ?? ''}
        onChange={(event) =>
          onSortFieldChange(event.target.value ? (event.target.value as ServiceSortField) : undefined)
        }
        options={Object.values(ServiceSortField).map((field) => ({
          value: field,
          label: SERVICE_SORT_FIELD_LABELS[field],
        }))}
      />

      {sortField && (
        <Select
          className="sm:w-44"
          value={sortDirection}
          onChange={(event) => onSortDirectionChange(event.target.value as SortDirection)}
          options={Object.values(SortDirection).map((direction) => ({
            value: direction,
            label: SORT_DIRECTION_LABELS[direction],
          }))}
        />
      )}
    </div>
  )
}
