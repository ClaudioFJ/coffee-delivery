import { Badge } from './CartBadge.styles'

export const BADGE_MAX = 99

interface CartBadgeProps {
  count: number
}

// Contador de unidades no carrinho [RF-04]. Não aparece quando o carrinho está vazio.
// É decorativo (aria-hidden): a quantidade já está no nome acessível do link do carrinho.
export function CartBadge({ count }: CartBadgeProps) {
  if (count <= 0) return null

  return <Badge aria-hidden>{count > BADGE_MAX ? `${BADGE_MAX}+` : count}</Badge>
}
