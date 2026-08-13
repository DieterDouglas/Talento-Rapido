import { createContext, useCallback, useEffect, useState, type PropsWithChildren } from 'react'
import type { User } from '../types/User'
import * as authService from '../lib/authService'
import { clearStoredToken, getStoredToken, setStoredToken } from '../lib/authStorage'

type AuthContextValue = {
  user: User | null
  isLoading: boolean
  signIn: (payload: authService.LoginPayload) => Promise<void>
  signUp: (payload: authService.RegisterPayload) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = getStoredToken()

    if (!token) {
      setIsLoading(false)
      return
    }

    authService
      .fetchCurrentUser()
      .then(setUser)
      .catch(() => clearStoredToken())
      .finally(() => setIsLoading(false))
  }, [])

  const signIn = useCallback(async (payload: authService.LoginPayload) => {
    const { user, token } = await authService.login(payload)
    setStoredToken(token)
    setUser(user)
  }, [])

  const signUp = useCallback(async (payload: authService.RegisterPayload) => {
    const { user, token } = await authService.register(payload)
    setStoredToken(token)
    setUser(user)
  }, [])

  const signOut = useCallback(async () => {
    await authService.logout().catch(() => {})
    clearStoredToken()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
