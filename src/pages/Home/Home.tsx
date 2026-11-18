import { usePageTitle } from '../../hooks/usePageTitle'
import { Hero } from './Hero'

export function Home() {
  usePageTitle()

  return (
    <>
      <Hero />
      {/* Catálogo "Nossos cafés" entra na T-16 */}
    </>
  )
}
