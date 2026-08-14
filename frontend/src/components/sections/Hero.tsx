import { Button } from '../ui/Button'
import { Highlight } from '../ui/Highlight'
import { LinkButton } from '../ui/LinkButton'
import { SearchInput } from '../ui/SearchInput'
import { AppRoute } from '../../constants/routes'
import { ButtonVariant } from '../../enums/ButtonVariant'
import { HeroImage } from './HeroImage'

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-10 py-16 md:grid-cols-2">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-extrabold uppercase leading-tight text-text">
          Serviços variados reunidos em um <Highlight>só lugar</Highlight>.
        </h1>

        <p className="text-text-muted">
          Descubra os melhores profissionais e contrate serviços sob medida para você.
        </p>

        <SearchInput placeholder="O que você precisa ?" />

        <div className="flex flex-col gap-3">
          <LinkButton to={AppRoute.Services} variant={ButtonVariant.Primary} className="w-full">
            Estou procurando um serviço
          </LinkButton>
          <Button variant={ButtonVariant.Secondary} className="w-full">
            Quero oferecer meus serviços
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <HeroImage />
      </div>
    </section>
  )
}
