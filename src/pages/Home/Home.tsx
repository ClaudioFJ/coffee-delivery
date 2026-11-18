import { useState } from 'react'
import { CoffeeCatalog } from '../../components/CoffeeCatalog'
import { VisuallyHidden } from '../../components/VisuallyHidden'
import { coffees } from '../../data/coffees'
import { useCart } from '../../hooks/useCart'
import { usePageTitle } from '../../hooks/usePageTitle'
import { Hero } from './Hero'

export function Home() {
  usePageTitle()
  const { addItem } = useCart()
  const [announcement, setAnnouncement] = useState('')

  function handleAddToCart(coffeeId: string, quantity: number) {
    addItem(coffeeId, quantity)

    // Feedback para leitores de tela: quem enxerga vê o contador mudar no Header.
    const coffee = coffees.find((item) => item.id === coffeeId)
    if (coffee) {
      const units = quantity === 1 ? 'unidade' : 'unidades'
      setAnnouncement(`${coffee.name} adicionado ao carrinho (${quantity} ${units})`)
    }
  }

  return (
    <>
      <Hero />
      <CoffeeCatalog coffees={coffees} onAddToCart={handleAddToCart} />
      {/* <output> é uma região "status": o leitor de tela anuncia quando o texto muda */}
      <VisuallyHidden as="output">{announcement}</VisuallyHidden>
    </>
  )
}
