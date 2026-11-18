import { TrashIcon } from '@phosphor-icons/react'
import type { CartItemWithCoffee } from '../../types/cart'
import { formatBRL } from '../../utils/money'
import { QuantityInput } from '../QuantityInput'
import { Actions, Info, Item, LinePrice, Name, RemoveButton } from './CartItem.styles'

interface CartItemProps {
  item: CartItemWithCoffee
  onIncrement: (coffeeId: string) => void
  onDecrement: (coffeeId: string) => void
  onRemove: (coffeeId: string) => void
}

// Linha do carrinho no checkout [RF-05]. Reaproveita o QuantityInput do catálogo:
// aqui o valor vem do estado global e cada clique dispara uma ação do reducer.
export function CartItem({ item, onIncrement, onDecrement, onRemove }: CartItemProps) {
  const { coffee, quantity } = item

  return (
    <Item>
      <img src={coffee.image} alt="" width={64} height={64} />

      <Info>
        <Name>{coffee.name}</Name>
        <Actions>
          <QuantityInput
            value={quantity}
            itemName={coffee.name}
            onIncrement={() => onIncrement(coffee.id)}
            onDecrement={() => onDecrement(coffee.id)}
          />
          <RemoveButton
            type="button"
            onClick={() => onRemove(coffee.id)}
            aria-label={`Remover ${coffee.name} do carrinho`}
          >
            <TrashIcon size={16} aria-hidden />
            Remover
          </RemoveButton>
        </Actions>
      </Info>

      <LinePrice>{formatBRL(coffee.priceInCents * quantity)}</LinePrice>
    </Item>
  )
}
