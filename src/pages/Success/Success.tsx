import { usePageTitle } from '../../hooks/usePageTitle'

export function Success() {
  usePageTitle('Pedido confirmado')

  return <h1>Uhu! Pedido confirmado</h1>
}
