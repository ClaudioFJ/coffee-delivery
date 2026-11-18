import type { Order } from '../types/order'
import { STORAGE_KEYS } from '../utils/storage'

// Pedido de exemplo igual ao do Figma (Checkout Filled → Success)
export const sampleOrder: Order = {
  id: 'pedido-teste',
  createdAt: '2026-11-17T21:00:00.000Z',
  items: [
    {
      coffeeId: 'expresso-tradicional',
      name: 'Expresso Tradicional',
      unitPriceInCents: 990,
      quantity: 1,
    },
    { coffeeId: 'latte', name: 'Latte', unitPriceInCents: 990, quantity: 2 },
  ],
  address: {
    cep: '90250440',
    street: 'Rua João Daniel Martinelli',
    number: '102',
    neighborhood: 'Farrapos',
    city: 'Porto Alegre',
    uf: 'RS',
  },
  paymentMethod: 'credit',
  subtotalInCents: 2970,
  deliveryFeeInCents: 350,
  totalInCents: 3320,
  estimatedDelivery: '20 min - 30 min',
}

export function saveLastOrder(order: unknown = sampleOrder) {
  localStorage.setItem(STORAGE_KEYS.lastOrder, JSON.stringify(order))
}

export function saveCart(items: { coffeeId: string; quantity: number }[]) {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify({ items }))
}
