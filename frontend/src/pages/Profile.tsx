import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { ProfileForm } from '../components/profile/ProfileForm'
import { ProfileView } from '../components/profile/ProfileView'
import { AppRoute } from '../constants/routes'
import { useAuth } from '../hooks/useAuth'

export function Profile() {
  const { user, isLoading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  if (isLoading) {
    return null
  }

  if (!user) {
    return <Navigate to={AppRoute.Login} replace />
  }

  return (
    <>
      <Header />

      <main className="md:mx-12 px-10 py-10">
        <h1 className="mb-6 text-center text-2xl font-bold text-text">Meu perfil</h1>

        {isEditing ? (
          <ProfileForm user={user} onCancel={() => setIsEditing(false)} onSaved={() => setIsEditing(false)} />
        ) : (
          <ProfileView user={user} onEdit={() => setIsEditing(true)} />
        )}
      </main>
    </>
  )
}
