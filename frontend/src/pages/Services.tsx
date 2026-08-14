import { useState } from 'react'
import { Header } from '../components/layout/Header'
import { Pagination } from '../components/ui/Pagination'
import { ServiceFilters } from '../components/services/ServiceFilters'
import { ServiceGrid } from '../components/services/ServiceGrid'
import { useServices } from '../hooks/useServices'
import { useCategories } from '../hooks/useCategories'
import { useDebouncedValue } from '../hooks/useDebouncedValue'

export function Services() {
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined)
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

  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-10 py-10">
        <h1 className="text-2xl font-bold text-text">Serviços</h1>

        <div className="mt-6">
          <ServiceFilters
            search={search}
            onSearchChange={handleSearchChange}
            categoryId={categoryId}
            onCategoryChange={handleCategoryChange}
            categories={categories ?? []}
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
