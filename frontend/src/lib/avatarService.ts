import { api } from './api'
import type { User } from '../types/User'

export async function uploadAvatar(file: File): Promise<User> {
  const formData = new FormData()
  formData.append('avatar', file)

  const { data } = await api.post<User>('/me/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return data
}
