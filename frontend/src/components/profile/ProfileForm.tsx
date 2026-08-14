import { useState, type FormEvent } from 'react'
import { Button } from '../ui/Button'
import { Checkbox } from '../ui/Checkbox'
import { ImageUploader } from '../ui/ImageUploader'
import { TextField } from '../ui/TextField'
import { ButtonVariant } from '../../enums/ButtonVariant'
import { ImageUploaderShape } from '../../enums/ImageUploaderShape'
import { useUpdateProfile } from '../../hooks/useUpdateProfile'
import { useUploadAvatar } from '../../hooks/useUploadAvatar'
import { useAuth } from '../../hooks/useAuth'
import { extractErrorMessage, extractFieldErrors } from '../../lib/apiErrors'
import { formatPhoneNumber } from '../../lib/phoneMask'
import type { User } from '../../types/User'

type ProfileFormProps = {
  user: User
  onCancel: () => void
  onSaved: () => void
}

export function ProfileForm({ user, onCancel, onSaved }: ProfileFormProps) {
  const { updateUser } = useAuth()
  const uploadAvatar = useUploadAvatar()
  const updateProfile = useUpdateProfile()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone ?? '')
  const [isWhatsapp, setIsWhatsapp] = useState(user.is_whatsapp)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)

  function handleAvatarSelected(file: File) {
    uploadAvatar.mutate(file, { onSuccess: updateUser })
  }

  function handlePhoneChange(value: string) {
    const formatted = formatPhoneNumber(value)
    setPhone(formatted)

    if (!formatted) {
      setIsWhatsapp(false)
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setFormError(null)
    setFieldErrors({})

    try {
      const updated = await updateProfile.mutateAsync({
        name,
        email,
        phone: phone || null,
        is_whatsapp: isWhatsapp,
      })
      updateUser(updated)
      onSaved()
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
    <div className="flex flex-col items-center gap-6">
      <ImageUploader
        value={user.avatar_url}
        onFileSelected={handleAvatarSelected}
        shape={ImageUploaderShape.Circle}
        size={96}
        isUploading={uploadAvatar.isPending}
      />

      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        <TextField
          id="name"
          label="Nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={fieldErrors.name}
          required
        />
        <TextField
          id="email"
          label="E-mail"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={fieldErrors.email}
          required
        />
        <TextField
          id="phone"
          label="Telefone"
          type="tel"
          placeholder="(11) 91234-5678"
          value={phone}
          onChange={(event) => handlePhoneChange(event.target.value)}
          error={fieldErrors.phone}
        />
        <Checkbox
          id="is_whatsapp"
          label="Este número é WhatsApp"
          checked={isWhatsapp}
          onChange={(event) => setIsWhatsapp(event.target.checked)}
          disabled={!phone}
        />

        {formError && <p className="text-sm text-red-600">{formError}</p>}

        <div className="flex gap-3">
          <Button
            type="button"
            variant={ButtonVariant.Secondary}
            className="flex-1"
            onClick={onCancel}
            disabled={updateProfile.isPending}
          >
            Cancelar
          </Button>
          <Button type="submit" variant={ButtonVariant.Primary} className="flex-1" disabled={updateProfile.isPending}>
            {updateProfile.isPending ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </div>
      </form>
    </div>
  )
}
