export const PAYMENT_METHODS = ['credit', 'debit', 'cash'] as const
export type PaymentMethod = (typeof PAYMENT_METHODS)[number]

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  credit: 'Cartão de Crédito',
  debit: 'Cartão de Débito',
  cash: 'Dinheiro',
}

export interface DeliveryAddress {
  cep: string // só dígitos: '90250440'
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  uf: string // 'RS'
}

export interface OrderItem {
  coffeeId: string
  name: string
  unitPriceInCents: number // preço congelado no momento do pedido
  quantity: number
}

// Retrato imutável do pedido confirmado [RN-06]
export interface Order {
  id: string
  createdAt: string // ISO 8601
  items: OrderItem[]
  address: DeliveryAddress
  paymentMethod: PaymentMethod
  subtotalInCents: number
  deliveryFeeInCents: number
  totalInCents: number
  estimatedDelivery: string
}
