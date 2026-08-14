import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../components/layout/AuthLayout'
import { Button } from '../components/ui/Button'
import { TextField } from '../components/ui/TextField'
import { ButtonVariant } from '../enums/ButtonVariant'
import { useAuth } from '../hooks/useAuth'
import { AppRoute } from '../constants/routes'
import { extractErrorMessage, extractFieldErrors } from '../lib/apiErrors'
import { ArrowLeftIcon } from 'lucide-react'

export function Register() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setFormError(null)
    setFieldErrors({})

    if (password !== passwordConfirmation) {
      setFieldErrors({ password_confirmation: 'As senhas não coincidem.' })
      return
    }

    setIsSubmitting(true)

    try {
      await signUp({ name, email, password })
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
    <div className="w-full h-full">
      <Link to={AppRoute.Home} className="p-4 flex gap-1 absolute items-center font-medium text-gray-400">
        <ArrowLeftIcon />
        Voltar
      </Link>
      <AuthLayout title="Criar conta" subtitle="Cadastre-se para contratar ou oferecer serviços.">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            id="name"
            label="Nome"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            error={fieldErrors.name}
          />
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
            autoComplete="new-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={fieldErrors.password}
          />
          <TextField
            id="password_confirmation"
            label="Confirmar senha"
            type="password"
            autoComplete="new-password"
            required
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            error={fieldErrors.password_confirmation}
          />

          {formError && <p className="text-sm text-red-600">{formError}</p>}

          <Button type="submit" variant={ButtonVariant.Primary} disabled={isSubmitting}>
            {isSubmitting ? 'Criando conta...' : 'Criar conta'}
          </Button>
        </form>

        <p className="text-center text-sm text-text-muted">
          Já tem conta?{' '}
          <Link to={AppRoute.Login} className="font-medium text-primary">
            Entrar
          </Link>
        </p>
      </AuthLayout>
    </div>
  )
}
