import { useState, type FormEvent } from 'react'
import { Sparkles } from 'lucide-react'
import { Header } from '../components/layout/Header'
import { Button } from '../components/ui/Button'
import { TextArea } from '../components/ui/TextArea'
import { ServiceGrid } from '../components/services/ServiceGrid'
import { ButtonVariant } from '../enums/ButtonVariant'
import { useSmartSearch } from '../hooks/useSmartSearch'
import { extractErrorMessage } from '../lib/apiErrors'

export function SmartSearch() {
  const [query, setQuery] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const smartSearch = useSmartSearch()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setHasSearched(true)
    smartSearch.mutate(query)
  }

  return (
    <>
      <Header />

      <main className="mx-auto max-w-4xl px-10 py-10">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-text">Busca inteligente</h1>
        </div>
        <p className="mt-1 text-sm text-text-muted">
          Descreva com suas palavras o que você precisa. Uma IA vai encontrar os serviços mais parecidos com o que
          você procura.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <TextArea
            id="query"
            label="O que você está procurando?"
            placeholder="Ex: preciso de alguém pra consertar um vazamento na pia da cozinha"
            rows={3}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            required
          />

          <Button type="submit" variant={ButtonVariant.Primary} disabled={smartSearch.isPending || !query.trim()}>
            {smartSearch.isPending ? 'Buscando...' : 'Buscar com IA'}
          </Button>
        </form>

        {smartSearch.isError && (
          <p className="mt-6 text-center text-red-600">{extractErrorMessage(smartSearch.error)}</p>
        )}

        {hasSearched && smartSearch.isSuccess && (
          <div className="mt-8">
            <ServiceGrid services={smartSearch.data} />
          </div>
        )}
      </main>
    </>
  )
}
