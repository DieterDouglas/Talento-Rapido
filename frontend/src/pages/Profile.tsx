import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Button } from '../components/ui/Button'
import { ImageUploader } from '../components/ui/ImageUploader'
import { TextField } from '../components/ui/TextField'
import { AppRoute } from '../constants/routes'
import { ButtonVariant } from '../enums/ButtonVariant'
import { ImageUploaderShape } from '../enums/ImageUploaderShape'
import { useAuth } from '../hooks/useAuth'
import { useUpdateProfile } from '../hooks/useUpdateProfile'
import { useUploadAvatar } from '../hooks/useUploadAvatar'
import { extractErrorMessage, extractFieldErrors } from '../lib/apiErrors'

export function Profile() {
  const { user, isLoading, updateUser } = useAuth()
  const uploadAvatar = useUploadAvatar()
  const updateProfile = useUpdateProfile()

  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  if (isLoading) {
    return null
  }

  if (!user) {
    return <Navigate to={AppRoute.Login} replace />
  }

  function handleAvatarSelected(file: File) {
    uploadAvatar.mutate(file, { onSuccess: updateUser })
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setFormError(null)
    setFieldErrors({})
    setSuccessMessage(null)

    try {
      const updated = await updateProfile.mutateAsync({ name, email })
      updateUser(updated)
      setSuccessMessage('Dados atualizados com sucesso!')
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

      <main className="mx-auto max-w-md px-10 py-10">
        <h1 className="text-2xl font-bold text-text">Meu perfil</h1>

        <div className="mt-6 flex justify-center">
          <ImageUploader
            value={user.avatar_url}
            onFileSelected={handleAvatarSelected}
            shape={ImageUploaderShape.Circle}
            size={96}
            isUploading={uploadAvatar.isPending}
          />
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
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

          {formError && <p className="text-sm text-red-600">{formError}</p>}
          {successMessage && <p className="text-sm text-text-muted">{successMessage}</p>}

          <Button type="submit" variant={ButtonVariant.Primary} disabled={updateProfile.isPending}>
            {updateProfile.isPending ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </form>
      </main>
    </>
  )
}
