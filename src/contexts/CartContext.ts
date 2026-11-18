import { createContext } from 'react'
import type { CartItemWithCoffee } from '../types/cart'
import type { DeliveryAddress, Order, PaymentMethod } from '../types/order'

export interface CartContextValue {
  items: CartItemWithCoffee[]
  totalUnits: number // soma das quantidades [RF-04]
  subtotalInCents: number // [RF-10]
  deliveryFeeInCents: number
  totalInCents: number
  addItem: (coffeeId: string, quantity: number) => void
  incrementItem: (coffeeId: string) => void
  decrementItem: (coffeeId: string) => void
  removeItem: (coffeeId: string) => void
  clearCart: () => void
  lastOrder: Order | null // último pedido confirmado [RF-12]
  // cria o snapshot do pedido, salva como último pedido e limpa o carrinho [RF-13]
  confirmOrder: (data: { address: DeliveryAddress; paymentMethod: PaymentMethod }) => Order
}

export const CartContext = createContext<CartContextValue | null>(null)
