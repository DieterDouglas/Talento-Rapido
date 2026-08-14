import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { Header } from '../components/layout/Header'
import { Avatar } from '../components/ui/Avatar'
import { Button } from '../components/ui/Button'
import { LinkButton } from '../components/ui/LinkButton'
import { ReviewForm } from '../components/services/ReviewForm'
import { ReviewList } from '../components/services/ReviewList'
import { ServiceRating } from '../components/services/ServiceRating'
import { ButtonVariant } from '../enums/ButtonVariant'
import { useService } from '../hooks/useService'
import { useCreateServiceRequest } from '../hooks/useCreateServiceRequest'
import { useMyServiceRequestsForService } from '../hooks/useMyServiceRequestsForService'
import { useAuth } from '../hooks/useAuth'
import { AppRoute } from '../constants/routes'
import { formatCurrency } from '../lib/currency'

export function ServiceDetail() {
  const { id } = useParams<{ id: string }>()
  const serviceId = Number(id)
  const { user } = useAuth()
  const { data: service, isLoading, isError } = useService(serviceId)
  const { data: myServiceRequests } = useMyServiceRequestsForService(serviceId)
  const createServiceRequest = useCreateServiceRequest()
  const [feedback, setFeedback] = useState<string | null>(null)

  const reviewableRequest = myServiceRequests?.find(
    (request) => request.requester_id === user?.id && request.status === 'completed' && !request.review
  )

  async function handleHire() {
    if (!service) return

    setFeedback(null)

    try {
      await createServiceRequest.mutateAsync(service.id)
      setFeedback('Solicitação enviada! O prestador foi notificado.')
    } catch {
      setFeedback('Não foi possível solicitar o serviço. Tente novamente.')
    }
  }

  return (
    <>
      <Header />

      <main className="mx-auto max-w-4xl px-10 py-10">
        {isLoading && <p className="text-center text-text-muted">Carregando...</p>}
        {isError && <p className="text-center text-red-600">Não foi possível carregar este serviço.</p>}

        {service && (
          <>
            <span className="w-fit rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary">
              {service.category.name}
            </span>

            <h1 className="mt-3 text-3xl font-bold text-text">{service.title}</h1>

            <div className="mt-2">
              <ServiceRating service={service} />
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm text-text-muted">
              <Avatar src={service.provider.avatar_url} name={service.provider.name} size={24} />
              <span className="font-medium text-text">{service.provider.name}</span>
              {service.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {service.location}
                </span>
              )}
            </div>

            <p className="mt-6 whitespace-pre-line text-text">{service.description}</p>

            <div className="mt-8 flex items-center justify-between rounded-xl border border-primary-light bg-surface p-5">
              <span className="text-2xl font-bold text-primary">{formatCurrency(service.price)}</span>

              {!user && (
                <LinkButton to={AppRoute.Login} variant={ButtonVariant.Primary}>
                  Entrar para contratar
                </LinkButton>
              )}

              {user && user.id !== service.provider.id && (
                <Button variant={ButtonVariant.Primary} onClick={handleHire} disabled={createServiceRequest.isPending}>
                  {createServiceRequest.isPending ? 'Enviando...' : 'Contratar serviço'}
                </Button>
              )}

              {user && user.id === service.provider.id && (
                <span className="text-sm font-medium text-text-muted">Este é o seu serviço</span>
              )}
            </div>

            {feedback && <p className="mt-3 text-sm text-text-muted">{feedback}</p>}

            {reviewableRequest && (
              <div className="mt-6">
                <ReviewForm
                  serviceId={service.id}
                  serviceRequestId={reviewableRequest.id}
                  onSuccess={() => setFeedback('Avaliação enviada, obrigado!')}
                />
              </div>
            )}

            <section className="mt-10">
              <h2 className="text-xl font-bold text-text">Avaliações</h2>
              <div className="mt-4">
                <ReviewList reviews={service.reviews ?? []} />
              </div>
            </section>
          </>
        )}
      </main>
    </>
  )
}
