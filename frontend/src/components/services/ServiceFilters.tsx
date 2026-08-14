import { SearchInput } from '../ui/SearchInput'
import { Select } from '../ui/Select'
import type { Category } from '../../types/Category'

type ServiceFiltersProps = {
  search: string
  onSearchChange: (value: string) => void
  categoryId: number | undefined
  onCategoryChange: (categoryId: number | undefined) => void
  categories: Category[]
}

export function ServiceFilters({
  search,
  onSearchChange,
  categoryId,
  onCategoryChange,
  categories,
}: ServiceFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex-1">
        <SearchInput
          placeholder="O que você precisa ?"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
      <Select
        className="sm:w-64"
        placeholder="Todas as categorias"
        value={categoryId ?? ''}
        onChange={(event) => onCategoryChange(event.target.value ? Number(event.target.value) : undefined)}
        options={categories.map((category) => ({ value: String(category.id), label: category.name }))}
      />
    </div>
  )
}
