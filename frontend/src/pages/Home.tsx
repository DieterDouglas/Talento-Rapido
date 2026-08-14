import { Header } from '../components/layout/Header'
import { Hero } from '../components/sections/Hero'

export function Home() {
  return (
    <>
      <div className='md:absolute w-screen'>
        <Header />
      </div>
      <Hero />
    </>
  )
}
