import { ShoppingCartIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import type { Coffee } from '../../types/coffee'
import { MAX_QUANTITY, MIN_QUANTITY } from '../../utils/constants'
import { formatPriceValue } from '../../utils/money'
import { QuantityInput } from '../QuantityInput'
import { Tag } from '../Tag'
import {
  AddButton,
  Card,
  Controls,
  Description,
  Footer,
  Name,
  Price,
  Tags,
} from './CoffeeCard.styles'

interface CoffeeCardProps {
  coffee: Coffee
  onAddToCart: (coffeeId: string, quantity: number) => void
}

export function CoffeeCard({ coffee, onAddToCart }: CoffeeCardProps) {
  // Estado LOCAL: a quantidade escolhida só importa para este card,
  // até o clique em "adicionar" [RF-02]. Por isso não fica no contexto global.
  const [quantity, setQuantity] = useState(MIN_QUANTITY)

  function handleAdd() {
    onAddToCart(coffee.id, quantity)
    setQuantity(MIN_QUANTITY) // volta para 1 depois de adicionar [RF-03]
  }

  return (
    <Card aria-labelledby={`coffee-${coffee.id}`}>
      <img src={coffee.image} alt={coffee.name} width={120} height={120} loading="lazy" />

      <Tags aria-label="Categorias">
        {coffee.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Tags>

      <Name id={`coffee-${coffee.id}`}>{coffee.name}</Name>
      <Description>{coffee.description}</Description>

      <Footer>
        <Price>
          R$ <strong>{formatPriceValue(coffee.priceInCents)}</strong>
        </Price>

        <Controls>
          <QuantityInput
            value={quantity}
            itemName={coffee.name}
            onIncrement={() => setQuantity((current) => Math.min(current + 1, MAX_QUANTITY))}
            onDecrement={() => setQuantity((current) => Math.max(current - 1, MIN_QUANTITY))}
          />
          <AddButton
            type="button"
            onClick={handleAdd}
            aria-label={`Adicionar ${quantity} ${coffee.name} ao carrinho`}
          >
            <ShoppingCartIcon size={22} weight="fill" aria-hidden />
          </AddButton>
        </Controls>
      </Footer>
    </Card>
  )
}
