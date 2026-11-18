import type { Coffee } from '../../types/coffee'
import { CoffeeCard } from '../CoffeeCard'
import { Grid, Section, Title } from './CoffeeCatalog.styles'

interface CoffeeCatalogProps {
  coffees: Coffee[]
  onAddToCart: (coffeeId: string, quantity: number) => void
}

export function CoffeeCatalog({ coffees, onAddToCart }: CoffeeCatalogProps) {
  return (
    <Section aria-labelledby="catalog-title">
      <Title id="catalog-title">Nossos cafés</Title>

      <Grid>
        {coffees.map((coffee) => (
          <li key={coffee.id}>
            <CoffeeCard coffee={coffee} onAddToCart={onAddToCart} />
          </li>
        ))}
      </Grid>
    </Section>
  )
}
