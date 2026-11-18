import { ShoppingCartIcon } from '@phosphor-icons/react'
import mascotDark from '../../assets/brand/mascot-dark.png'
import mascotLight from '../../assets/brand/mascot-light.png'
import { useTheme } from '../../hooks/useTheme'
import { CartBadge } from '../CartBadge'
import { LocationChip } from '../LocationChip'
import { ThemeToggle } from '../ThemeToggle'
import { Actions, BrandLink, CartLink, HeaderBar, HeaderContent, Wordmark } from './Header.styles'

interface HeaderProps {
  cartCount?: number
  location?: { city: string; uf: string } | null
}

function cartLabel(count: number) {
  if (count === 0) return 'Carrinho vazio'
  return `Carrinho, ${count} ${count === 1 ? 'item' : 'itens'}`
}

// cartCount e location chegam por Props por enquanto: o carrinho (T-18) e o
// último pedido (T-27) ainda não existem. Depois o Header passa a lê-los do contexto.
export function Header({ cartCount = 0, location = null }: HeaderProps) {
  const { mode } = useTheme()

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
