import type { CartItemWithCoffee } from '../types/cart'
import {
  PAYMENT_METHODS,
  type DeliveryAddress,
  type Order,
  type OrderItem,
  type PaymentMethod,
} from '../types/order'
import { calcDeliveryFee, calcSubtotal } from './cart'
import { ESTIMATED_DELIVERY } from './constants'

interface CreateOrderInput {
  items: CartItemWithCoffee[]
  address: DeliveryAddress
  paymentMethod: PaymentMethod
  id: string
  createdAt: Date
}

// Monta o "retrato" imutável do pedido [RN-06]. Copia nome e preço de cada café,
// então o pedido continua correto mesmo depois que o carrinho é limpo [RF-13].
export function createOrder({
  items,
  address,
  paymentMethod,
  id,
  createdAt,
}: CreateOrderInput): Order {
  if (items.length === 0) throw new Error('Não é possível criar um pedido sem itens')

  const subtotalInCents = calcSubtotal(items)
  const deliveryFeeInCents = calcDeliveryFee(subtotalInCents)

  return {
    id,
    createdAt: createdAt.toISOString(),
    items: items.map(({ coffee, quantity }) => ({
      coffeeId: coffee.id,
      name: coffee.name,
      unitPriceInCents: coffee.priceInCents,
      quantity,
    })),
    address: { ...address },
    paymentMethod,
    subtotalInCents,
    deliveryFeeInCents,
    totalInCents: subtotalInCents + deliveryFeeInCents,
    estimatedDelivery: ESTIMATED_DELIVERY,
  }
}

// crypto.randomUUID só existe em contexto seguro (https ou localhost).
// Testando pelo IP da rede no celular (http://192.168...) ele não existe, daí o plano B.
export function createOrderId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null
const isString = (value: unknown): value is string => typeof value === 'string'
const isCents = (value: unknown): value is number =>
  Number.isInteger(value) && (value as number) >= 0

function isOrderItem(value: unknown): value is OrderItem {
  return (
    isRecord(value) &&
    isString(value.coffeeId) &&
    isString(value.name) &&
    isCents(value.unitPriceInCents) &&
    Number.isInteger(value.quantity) &&
    (value.quantity as number) > 0
  )
}

function isAddress(value: unknown): value is DeliveryAddress {
  return (
    isRecord(value) &&
    ['cep', 'street', 'number', 'neighborhood', 'city', 'uf'].every((key) =>
      isString(value[key]),
    ) &&
    (value.complement === undefined || isString(value.complement))
  )
}

// Valida o pedido lido do localStorage (pode ter sido editado ou corrompido) [RNF-04]
export function parseOrder(raw: unknown): Order | null {
  if (
    isRecord(raw) &&
    isString(raw.id) &&
    isString(raw.createdAt) &&
    Array.isArray(raw.items) &&
    raw.items.length > 0 &&
    raw.items.every(isOrderItem) &&
    isAddress(raw.address) &&
    (PAYMENT_METHODS as readonly unknown[]).includes(raw.paymentMethod) &&
    isCents(raw.subtotalInCents) &&
    isCents(raw.deliveryFeeInCents) &&
    isCents(raw.totalInCents) &&
    isString(raw.estimatedDelivery)
  ) {
    return raw as unknown as Order
  }
  return null
}
