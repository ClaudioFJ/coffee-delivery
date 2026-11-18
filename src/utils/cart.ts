import type { CartItem, CartItemWithCoffee, CartState } from '../types/cart'
import type { Coffee } from '../types/coffee'
import { DELIVERY_FEE_IN_CENTS, MAX_QUANTITY, MIN_QUANTITY } from './constants'

// Funções puras: recebem dados, devolvem um resultado, não mudam nada fora delas.
// Por isso são fáceis de testar sem renderizar nenhum componente.

export function isValidQuantity(value: unknown): value is number {
  return (
    Number.isInteger(value) &&
    (value as number) >= MIN_QUANTITY &&
    (value as number) <= MAX_QUANTITY
  )
}

// Soma das UNIDADES, não dos tipos de café [RF-04]
export function countUnits<T extends { quantity: number }>(items: T[]): number {
  return items.reduce((total, item) => total + item.quantity, 0)
}

// Junta cada item com seus dados do catálogo; itens fora do catálogo são descartados [RN-10]
export function resolveCartItems(items: CartItem[], catalog: Coffee[]): CartItemWithCoffee[] {
  return items.flatMap((item) => {
    const coffee = catalog.find((candidate) => candidate.id === item.coffeeId)
    return coffee ? [{ coffee, quantity: item.quantity }] : []
  })
}

// subtotal = Σ (preço unitário × quantidade) [RN-03], em centavos
export function calcSubtotal(items: CartItemWithCoffee[]): number {
  return items.reduce((total, item) => total + item.coffee.priceInCents * item.quantity, 0)
}

// Sem itens não há entrega a cobrar
export function calcDeliveryFee(subtotalInCents: number): number {
  return subtotalInCents > 0 ? DELIVERY_FEE_IN_CENTS : 0
}

// total = subtotal + entrega [RN-03]
export function calcTotal(subtotalInCents: number): number {
  return subtotalInCents + calcDeliveryFee(subtotalInCents)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

// Recebe qualquer coisa vinda do localStorage e devolve um carrinho válido [RF-06, RNF-04]:
// remove cafés que não existem, quantidades inválidas e junta linhas duplicadas.
export function sanitizeCart(raw: unknown, catalog: Coffee[]): CartState {
  if (!isRecord(raw) || !Array.isArray(raw.items)) return { items: [] }

  const knownIds = new Set(catalog.map((coffee) => coffee.id))

  const items = raw.items.reduce<CartItem[]>((result, entry) => {
    if (!isRecord(entry)) return result
    const { coffeeId, quantity } = entry
    if (typeof coffeeId !== 'string' || !knownIds.has(coffeeId) || !isValidQuantity(quantity)) {
      return result
    }

    const existing = result.find((item) => item.coffeeId === coffeeId)
    if (!existing) return [...result, { coffeeId, quantity }]

    return result.map((item) =>
      item.coffeeId === coffeeId
        ? { ...item, quantity: Math.min(item.quantity + quantity, MAX_QUANTITY) }
        : item,
    )
  }, [])

  return { items }
}
