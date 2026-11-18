import { ShoppingCartIcon } from '@phosphor-icons/react'
import mascotDark from '../../assets/brand/mascot-dark.webp'
import mascotLight from '../../assets/brand/mascot-light.webp'
import { useCart } from '../../hooks/useCart'
import { useTheme } from '../../hooks/useTheme'
import { CartBadge } from '../CartBadge'
import { LocationChip } from '../LocationChip'
import { ThemeToggle } from '../ThemeToggle'
import { Actions, BrandLink, CartLink, HeaderBar, HeaderContent, Wordmark } from './Header.styles'

function cartLabel(count: number) {
  if (count === 0) return 'Carrinho vazio'
  return `Carrinho, ${count} ${count === 1 ? 'item' : 'itens'}`
}

export function Header() {
  const { mode } = useTheme()
  const { totalUnits: cartCount, lastOrder } = useCart() // RF-04: soma das unidades
  // DP-07: a localização vem do último pedido; sem pedido, o chip não aparece
  const location = lastOrder ? lastOrder.address : null

  return (
    <HeaderBar>
      <HeaderContent>
        <BrandLink to="/">
          {/* alt vazio: o nome da marca já está escrito ao lado */}
          <img src={mode === 'dark' ? mascotDark : mascotLight} alt="" width={44} height={44} />
          <Wordmark>
            <strong>Coffee</strong>
            <span>Delivery</span>
          </Wordmark>
        </BrandLink>

        <Actions aria-label="Ações">
          {location && <LocationChip city={location.city} uf={location.uf} />}
          <ThemeToggle />
          <CartLink to="/checkout" aria-label={cartLabel(cartCount)}>
            <ShoppingCartIcon size={22} weight="fill" aria-hidden />
            <CartBadge count={cartCount} />
          </CartLink>
        </Actions>
      </HeaderContent>
    </HeaderBar>
  )
}
