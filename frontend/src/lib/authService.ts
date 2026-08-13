import { api } from './api'
import type { User } from '../types/User'

type AuthResponse = {
  user: User
  token: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = {
  name: string
  email: string
  password: string
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/login', payload)

  return data
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/register', payload)

  return data
}

export async function fetchCurrentUser(): Promise<User> {
  const { data } = await api.get<User>('/me')

  return data
}

export async function logout(): Promise<void> {
  await api.post('/logout')
}
