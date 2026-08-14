import { useState } from 'react'
import { Header } from '../components/layout/Header'
import { LinkButton } from '../components/ui/LinkButton'
import { Pagination } from '../components/ui/Pagination'
import { ServiceFilters } from '../components/services/ServiceFilters'
import { ServiceGrid } from '../components/services/ServiceGrid'
import { AppRoute } from '../constants/routes'
import { ButtonVariant } from '../enums/ButtonVariant'
import { useServices } from '../hooks/useServices'
import { useCategories } from '../hooks/useCategories'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { ServiceSortField } from '../enums/ServiceSortField'
import { SortDirection } from '../enums/SortDirection'

export function Services() {
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined)
  const [sortField, setSortField] = useState<ServiceSortField | undefined>(undefined)
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)
  const [page, setPage] = useState(1)

  const debouncedSearch = useDebouncedValue(search, 400)

  const { data: categories } = useCategories()
  const {
    data: services,
    isLoading,
    isError,
  } = useServices({
    search: debouncedSearch,
    categoryId,
    sortField,
    sortDirection,
    page,
  })

  function handleSearchChange(value: string) {
    setSearch(value)
    setPage(1)
  }

  function handleCategoryChange(value: number | undefined) {
    setCategoryId(value)
    setPage(1)
  }

  function handleSortFieldChange(field: ServiceSortField | undefined) {
    setSortField(field)
    setPage(1)
  }

  function handleSortDirectionChange(direction: SortDirection) {
    setSortDirection(direction)
    setPage(1)
  }

  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-10 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-text">Serviços</h1>
          <LinkButton to={AppRoute.CreateService} variant={ButtonVariant.Secondary}>
            Cadastrar serviço
          </LinkButton>
        </div>

        <div className="mt-6">
          <ServiceFilters
            search={search}
            onSearchChange={handleSearchChange}
            categoryId={categoryId}
            onCategoryChange={handleCategoryChange}
            categories={categories ?? []}
            sortField={sortField}
            onSortFieldChange={handleSortFieldChange}
            sortDirection={sortDirection}
            onSortDirectionChange={handleSortDirectionChange}
          />
        </div>

        {isLoading && <p className="mt-10 text-center text-text-muted">Carregando serviços...</p>}
        {isError && <p className="mt-10 text-center text-red-600">Não foi possível carregar os serviços.</p>}

        {services && (
          <>
            <ServiceGrid services={services.data} />
            <Pagination currentPage={services.current_page} lastPage={services.last_page} onPageChange={setPage} />
          </>
        )}
      </main>
    </>
  )
}
