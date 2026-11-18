import { ReceiptIcon } from '@phosphor-icons/react'
import { EmptyState } from '../../components/EmptyState'
import { OrderSuccess } from '../../components/OrderSuccess'
import { useCart } from '../../hooks/useCart'
import { usePageTitle } from '../../hooks/usePageTitle'

export function Success() {
  const { lastOrder } = useCart()
  usePageTitle(lastOrder ? 'Pedido confirmado' : 'Nenhum pedido')

  // Entrou em /success sem ter confirmado nenhum pedido [RN-09]
  if (!lastOrder) {
    return (
      <EmptyState
        icon={<ReceiptIcon size={40} weight="fill" />}
        title="Nenhum pedido encontrado"
        description="Você ainda não confirmou um pedido. Que tal escolher um café?"
        actionLabel="Ver cafés"
        actionTo="/"
      />
    )
  }

  return <OrderSuccess order={lastOrder} />
}
