import { Button } from './Button'
import { ButtonVariant } from '../../enums/ButtonVariant'

type PaginationProps = {
  currentPage: number
  lastPage: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, lastPage, onPageChange }: PaginationProps) {
  if (lastPage <= 1) {
    return null
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <Button
        variant={ButtonVariant.Secondary}
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Anterior
      </Button>
      <span className="text-sm text-text-muted">
        Página {currentPage} de {lastPage}
      </span>
      <Button
        variant={ButtonVariant.Secondary}
        disabled={currentPage >= lastPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Próxima
      </Button>
    </div>
  )
}
