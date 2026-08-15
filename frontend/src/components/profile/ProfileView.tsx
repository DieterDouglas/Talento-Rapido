import { Briefcase, Inbox, MessageCircle, Phone, ShoppingBag } from 'lucide-react'
import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'
import { Carousel } from '../ui/Carousel'
import { CarouselItem } from '../ui/CarouselItem'
import { EmptyState } from '../ui/EmptyState'
import { ButtonVariant } from '../../enums/ButtonVariant'
import type { User } from '../../types/User'
import { useMyServices } from '../../hooks/useMyServices'
import { useMyServiceRequests } from '../../hooks/useMyServiceRequests'
import { useReceivedServiceRequests } from '../../hooks/useReceivedServiceRequests'
import { toWhatsAppLink } from '../../lib/phoneMask'
import { ServiceCard } from '../services/ServiceCard'
import { HiredServiceItem } from './HiredServiceItem'
import { ProfileSection } from './ProfileSection'
import { ReceivedServiceRequestItem } from './ReceivedServiceRequestItem'

type ProfileViewProps = {
  user: User
  onEdit: () => void
}

export function ProfileView({ user, onEdit }: ProfileViewProps) {
  const { data } = useMyServices()
  const { data: myServiceRequests } = useMyServiceRequests()
  const { data: receivedServiceRequests } = useReceivedServiceRequests()

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
      <section className="flex flex-col items-center gap-6 rounded-2xl border border-primary-light bg-surface p-8 shadow-sm sm:flex-row sm:items-center">
        <div className="rounded-full ring-4 ring-primary-light">
          <Avatar src={user.avatar_url} name={user.name} size={104} />
        </div>

        <div className="flex flex-1 flex-col items-center gap-1.5 text-center sm:items-start sm:text-left">
          <h1 className="text-2xl font-bold text-text">{user.name}</h1>
          <p className="text-sm text-text-muted">{user.email}</p>

          {user.phone ? (
            <div className="mt-1 flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-text-muted" />
              {user.is_whatsapp ? (
                <a
                  href={toWhatsAppLink(user.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text hover:text-primary"
                >
                  <span>{user.phone}</span>
                  <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                    <MessageCircle className="h-3 w-3" />
                    WhatsApp
                  </span>
                </a>
              ) : (
                <span className="text-text">{user.phone}</span>
              )}
            </div>
          ) : (
            <p className="mt-1 text-sm text-text-muted">Nenhum telefone cadastrado</p>
          )}
        </div>

        <Button variant={ButtonVariant.Secondary} onClick={onEdit}>
          Editar perfil
        </Button>
      </section>

      <ProfileSection title="Serviços Prestados" icon={Briefcase} count={data?.length}>
        {data && data.length > 0 ? (
          <Carousel>
            {data.map((service) => (
              <CarouselItem key={service.id}>
                <ServiceCard service={service} />
              </CarouselItem>
            ))}
          </Carousel>
        ) : (
          <EmptyState message="Sem serviços cadastrados." />
        )}
      </ProfileSection>

      <ProfileSection title="Pedidos Recebidos" icon={Inbox} count={receivedServiceRequests?.length}>
        {receivedServiceRequests && receivedServiceRequests.length > 0 ? (
          <Carousel>
            {receivedServiceRequests.map((request) => (
              <CarouselItem key={request.id}>
                <ReceivedServiceRequestItem request={request} />
              </CarouselItem>
            ))}
          </Carousel>
        ) : (
          <EmptyState message="Nenhum pedido recebido ainda." />
        )}
      </ProfileSection>

      <ProfileSection title="Serviços Contratados" icon={ShoppingBag} count={myServiceRequests?.length}>
        {myServiceRequests && myServiceRequests.length > 0 ? (
          <Carousel>
            {myServiceRequests.map((request) => (
              <CarouselItem key={request.id}>
                <HiredServiceItem request={request} />
              </CarouselItem>
            ))}
          </Carousel>
        ) : (
          <EmptyState message="Você ainda não contratou nenhum serviço." />
        )}
      </ProfileSection>
    </div>
  )
}
