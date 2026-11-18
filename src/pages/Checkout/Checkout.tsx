import { ShoppingCartIcon } from '@phosphor-icons/react'
import { EmptyState } from '../../components/EmptyState'
import { useCart } from '../../hooks/useCart'
import { usePageTitle } from '../../hooks/usePageTitle'
import { CheckoutForm } from './CheckoutForm'

export function Checkout() {
  usePageTitle('Checkout')
  const { items } = useCart()

  // Carrinho vazio (entrou direto no /checkout ou removeu o último item) [RN-09, RF-11]
  if (items.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingCartIcon size={40} weight="fill" />}
        title="Seu carrinho está vazio"
        description="Escolha seus cafés favoritos no catálogo para montar o pedido."
        actionLabel="Ver cafés"
        actionTo="/"
      />
    )
  }

  return <CheckoutForm />
}
