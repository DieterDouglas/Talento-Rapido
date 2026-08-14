import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Button } from '../components/ui/Button'
import { Select } from '../components/ui/Select'
import { TextArea } from '../components/ui/TextArea'
import { TextField } from '../components/ui/TextField'
import { AppRoute, serviceDetailPath } from '../constants/routes'
import { ButtonVariant } from '../enums/ButtonVariant'
import { useAuth } from '../hooks/useAuth'
import { useCategories } from '../hooks/useCategories'
import { useCreateService } from '../hooks/useCreateService'
import { extractErrorMessage, extractFieldErrors } from '../lib/apiErrors'

export function CreateService() {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()
  const { data: categories } = useCategories()
  const createService = useCreateService()

  const [categoryId, setCategoryId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)

  if (isLoading) {
    return null
  }

  if (!user) {
    return <Navigate to={AppRoute.Login} replace />
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setFormError(null)
    setFieldErrors({})

    try {
      const service = await createService.mutateAsync({
        category_id: Number(categoryId),
        title,
        description,
        price: Number(price),
        location: location || null,
      })
      navigate(serviceDetailPath(service.id))
    } catch (error) {
      const errors = extractFieldErrors(error)

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors)
      } else {
        setFormError(extractErrorMessage(error))
      }
    }
  }

  return (
    <>
      <Header />

      <main className="mx-auto max-w-xl px-10 py-10">
        <h1 className="text-2xl font-bold text-text">Cadastrar serviço</h1>
        <p className="mt-1 text-sm text-text-muted">Preencha os dados do serviço que você oferece.</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <Select
            id="category_id"
            label="Categoria"
            placeholder="Selecione uma categoria"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            options={(categories ?? []).map((category) => ({ value: String(category.id), label: category.name }))}
            error={fieldErrors.category_id}
            required
          />

          <TextField
            id="title"
            label="Título"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            error={fieldErrors.title}
            required
          />

          <TextArea
            id="description"
            label="Descrição"
            rows={4}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            error={fieldErrors.description}
            required
          />

          <TextField
            id="price"
            label="Preço (R$)"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            error={fieldErrors.price}
            required
          />

          <TextField
            id="location"
            label="Localização (opcional)"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            error={fieldErrors.location}
          />

          {formError && <p className="text-sm text-red-600">{formError}</p>}

          <Button type="submit" variant={ButtonVariant.Primary} disabled={createService.isPending}>
            {createService.isPending ? 'Cadastrando...' : 'Cadastrar serviço'}
          </Button>
        </form>
      </main>
    </>
  )
}
