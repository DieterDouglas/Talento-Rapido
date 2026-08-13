import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../components/layout/AuthLayout'
import { Button } from '../components/ui/Button'
import { TextField } from '../components/ui/TextField'
import { ButtonVariant } from '../enums/ButtonVariant'
import { useAuth } from '../hooks/useAuth'
import { AppRoute } from '../constants/routes'
import { extractErrorMessage, extractFieldErrors } from '../lib/apiErrors'

export function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setFormError(null)
    setFieldErrors({})
    setIsSubmitting(true)

    try {
      await signIn({ email, password })
      navigate(AppRoute.Home)
    } catch (error) {
      const errors = extractFieldErrors(error)

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors)
      } else {
        setFormError(extractErrorMessage(error))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout title="Entrar" subtitle="Acesse sua conta para contratar ou oferecer serviços.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          id="email"
          label="E-mail"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={fieldErrors.email}
        />
        <TextField
          id="password"
          label="Senha"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={fieldErrors.password}
        />

        {formError && <p className="text-sm text-red-600">{formError}</p>}

        <Button type="submit" variant={ButtonVariant.Primary} disabled={isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>

      <p className="text-center text-sm text-text-muted">
        Não tem conta?{' '}
        <Link to={AppRoute.Register} className="font-medium text-primary">
          Criar conta
        </Link>
      </p>
    </AuthLayout>
  )
}
