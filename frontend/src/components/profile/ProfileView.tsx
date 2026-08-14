import { MessageCircle, Phone } from 'lucide-react'
import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'
import { ButtonVariant } from '../../enums/ButtonVariant'
import type { User } from '../../types/User'
import { useMyServices } from '../../hooks/useMyServices'
import { useMyServiceRequests } from '../../hooks/useMyServiceRequests'
import { ServiceGrid } from '../services/ServiceGrid'
import { HiredServiceItem } from './HiredServiceItem'

type ProfileViewProps = {
  user: User
  onEdit: () => void
}


export function ProfileView({ user, onEdit }: ProfileViewProps) {

  const { data } = useMyServices();
  const { data: myServiceRequests } = useMyServiceRequests();

  return (
    <div className="w-full">
      <div className="flex justify-start items-center flex-col gap-4">
        <div className="py-8 px-28 flex flex-col text-left items-center gap-6 w-fit bg-primary-light rounded-2xl">
          <div className='border border-primary rounded-full'>
            <Avatar src={user.avatar_url} name={user.name} size={140} />
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <h2 className="text-xl font-bold text-text">{user.name}</h2>
            <p className="text-sm text-text-muted">{user.email}</p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            {user.phone ? (
              <>
                <Phone className="h-4 w-4 text-text-muted" />
                <span className="text-text">{user.phone}</span>
                {user.is_whatsapp && (
                  <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                    <MessageCircle className="h-3 w-3" />
                    WhatsApp
                  </span>
                )}
              </>
            ) : (
              <span className="text-text-muted">Nenhum telefone cadastrado</span>
            )}
          </div>

          <Button variant={ButtonVariant.Secondary} onClick={onEdit}>
            Editar perfil
          </Button>
        </div>
        <div className="flex-col">
          <h1 className='text-xl font-bold'>Serviços Prestados</h1>
          {data && data.length > 0 ? (
            <div className='w-full'>
              <ServiceGrid services={data} />
            </div>
          ) : (
            <div>Sem serviços cadastrados.</div>
          )}
        </div>

        <div className="mt-8 w-full max-w-2xl flex-col">
          <h1 className="text-xl font-bold">Serviços Contratados</h1>
          {myServiceRequests && myServiceRequests.length > 0 ? (
            <div className="mt-4 flex flex-col gap-4">
              {myServiceRequests.map((request) => (
                <HiredServiceItem key={request.id} request={request} />
              ))}
            </div>
          ) : (
            <div className="mt-4 text-text-muted">Você ainda não contratou nenhum serviço.</div>
          )}
        </div>
      </div>
    </div>
  )
}
