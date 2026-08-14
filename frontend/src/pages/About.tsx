import { Search, ShieldCheck, Star, UserPlus } from 'lucide-react'
import { Header } from '../components/layout/Header'
import { LinkButton } from '../components/ui/LinkButton'
import { Highlight } from '../components/ui/Highlight'
import { AppRoute } from '../constants/routes'
import { ButtonVariant } from '../enums/ButtonVariant'

const STEPS = [
  {
    icon: UserPlus,
    title: 'Crie sua conta',
    description: 'Cadastre-se gratuitamente para contratar serviços ou anunciar o que você faz de melhor.',
  },
  {
    icon: Search,
    title: 'Encontre ou publique',
    description: 'Busque profissionais por categoria, palavra-chave ou com a busca inteligente por IA — ou cadastre o serviço que você oferece.',
  },
  {
    icon: ShieldCheck,
    title: 'Contrate com segurança',
    description: 'Solicite o serviço, acompanhe o status da contratação e converse direto pelo WhatsApp com quem for atendê-lo.',
  },
  {
    icon: Star,
    title: 'Avalie a experiência',
    description: 'Depois de concluído, deixe uma avaliação com nota, comentário e foto — só quem contratou de verdade pode avaliar.',
  },
]

export function About() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-4xl px-10 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold uppercase leading-tight text-text">
            Conectando quem precisa a quem <Highlight>sabe fazer</Highlight>.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-text-muted">
            O Talento Rápido nasceu pra resolver um problema simples: encontrar um bom profissional pra um serviço
            específico não devia ser complicado. Reunimos prestadores de todas as áreas num só lugar, pra você
            contratar com confiança e avaliações reais de quem já contratou antes.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {STEPS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4 rounded-xl border border-primary-light bg-surface p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold text-text">{title}</h2>
                <p className="mt-1 text-sm text-text-muted">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl bg-primary-light p-10 text-center">
          <h2 className="text-2xl font-bold text-text">Pronto pra começar?</h2>
          <p className="max-w-lg text-text-muted">
            Procure um serviço agora mesmo ou cadastre o que você oferece — leva menos de um minuto.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <LinkButton to={AppRoute.Services} variant={ButtonVariant.Primary}>
              Encontrar um serviço
            </LinkButton>
            <LinkButton to={AppRoute.CreateService} variant={ButtonVariant.Secondary}>
              Oferecer meus serviços
            </LinkButton>
          </div>
        </div>
      </main>
    </>
  )
}
