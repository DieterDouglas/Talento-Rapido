import { MessageCircle, Phone } from 'lucide-react'
import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'
import { Carousel } from '../ui/Carousel'
import { CarouselItem } from '../ui/CarouselItem'
import { ButtonVariant } from '../../enums/ButtonVariant'
import type { User } from '../../types/User'
import { useMyServices } from '../../hooks/useMyServices'
import { useMyServiceRequests } from '../../hooks/useMyServiceRequests'
import { useReceivedServiceRequests } from '../../hooks/useReceivedServiceRequests'
import { toWhatsAppLink } from '../../lib/phoneMask'
import { ServiceCard } from '../services/ServiceCard'
import { HiredServiceItem } from './HiredServiceItem'
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
    <div className="w-full">
      <div className="flex justify-start items-center flex-col gap-4">
        <div className="py-8 px-28 mx-8 flex flex-col text-left items-center gap-6 w-fit bg-primary-light rounded-2xl">
          <div className='border border-primary rounded-full'>
            <Avatar src={user.avatar_url} name={user.name} size={140} />
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <h2 className="text-xl font-bold text-text">{user.name}</h2>
            <p className="text-sm text-text-muted">{user.email}</p>
          </div>

          <div className="flex items-center gap-2 text-sm text-center">
            {user.phone ? (
              user.is_whatsapp ? (
                <a
                  href={toWhatsAppLink(user.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text hover:text-primary"
                >
                  <Phone className="h-4 w-4 text-text-muted" />
                  <span>{user.phone}</span>
                  <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                    <MessageCircle className="h-3 w-3" />
                    WhatsApp
                  </span>
                </a>
              ) : (
                <>
                  <Phone className="h-4 w-4 text-text-muted" />
                  <span className="text-text">{user.phone}</span>
                </>
              )
            ) : (
              <span className="text-text-muted">Nenhum telefone cadastrado</span>
            )}
          </div>

          <Button variant={ButtonVariant.Secondary} onClick={onEdit}>
            Editar perfil
          </Button>
        </div>

        <div className="flex w-full flex-col items-center">
          <h1 className='text-xl font-bold'>Serviços Prestados</h1>
          {data && data.length > 0 ? (
            <div className="mt-4 w-full">
              <Carousel>
                {data.map((service) => (
                  <CarouselItem key={service.id}>
                    <ServiceCard service={service} />
                  </CarouselItem>
                ))}
              </Carousel>
            </div>
          ) : (
            <div>Sem serviços cadastrados.</div>
          )}
        </div>

        <div className="mt-8 w-full flex flex-col items-center">
          <h1 className="text-xl font-bold">Pedidos Recebidos</h1>
          {receivedServiceRequests && receivedServiceRequests.length > 0 ? (
            <div className="mt-4 w-full">
              <Carousel>
                {receivedServiceRequests.map((request) => (
                  <CarouselItem key={request.id}>
                    <ReceivedServiceRequestItem request={request} />
                  </CarouselItem>
                ))}
              </Carousel>
            </div>
          ) : (
            <div className="mt-4 text-text-muted">Nenhum pedido recebido ainda.</div>
          )}
        </div>

        <div className="mt-8 w-full flex flex-col items-center">
          <h1 className="text-xl font-bold">Serviços Contratados</h1>
          {myServiceRequests && myServiceRequests.length > 0 ? (
            <div className="mt-4 w-full">
              <Carousel>
                {myServiceRequests.map((request) => (
                  <CarouselItem key={request.id}>
                    <HiredServiceItem request={request} />
                  </CarouselItem>
                ))}
              </Carousel>
            </div>
          ) : (
            <div className="mt-4 text-text-muted">Você ainda não contratou nenhum serviço.</div>
          )}
        </div>
      </div>
    </div>
  )
}
