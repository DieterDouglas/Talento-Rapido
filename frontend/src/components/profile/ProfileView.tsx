import { MessageCircle, Phone } from 'lucide-react'
import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'
import { ButtonVariant } from '../../enums/ButtonVariant'
import type { User } from '../../types/User'

type ProfileViewProps = {
  user: User
  onEdit: () => void
}

export function ProfileView({ user, onEdit }: ProfileViewProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <Avatar src={user.avatar_url} name={user.name} size={96} />

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
  )
}
