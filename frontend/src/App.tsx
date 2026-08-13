import { Button } from './components/ui/Button'
import { ColorSwatch } from './components/ui/ColorSwatch'
import { ButtonVariant } from './enums/ButtonVariant'
import { ColorToken } from './enums/ColorToken'

function App() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold">Paleta de cores — Talento Rápido</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Object.values(ColorToken).map((token) => (
          <ColorSwatch key={token} token={token} />
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        <Button variant={ButtonVariant.Primary}>Estou procurando um serviço</Button>
        <Button variant={ButtonVariant.Secondary}>Quero oferecer meus serviços</Button>
      </div>
    </main>
  )
}

export default App
