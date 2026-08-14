import { api } from './api'
import type { User } from '../types/User'

export type UpdateProfilePayload = {
  name: string
  email: string
  phone: string | null
  is_whatsapp: boolean
}

export async function updateProfile(payload: UpdateProfilePayload): Promise<User> {
  const { data } = await api.patch<User>('/me', payload)

  return data
}
