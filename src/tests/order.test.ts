import { describe, expect, it } from 'vitest'
import { coffees } from '../data/coffees'
import { resolveCartItems } from '../utils/cart'
import { createOrder, createOrderId, parseOrder } from '../utils/order'
import { sampleOrder } from './fixtures'

const items = resolveCartItems(
  [
    { coffeeId: 'expresso-tradicional', quantity: 1 },
    { coffeeId: 'latte', quantity: 2 },
  ],
  coffees,
)

describe('createOrder [RN-06]', () => {
  it('gera o snapshot com itens, valores e endereço', () => {
    const order = createOrder({
      items,
      address: sampleOrder.address,
      paymentMethod: 'credit',
      id: 'pedido-teste',
      createdAt: new Date('2026-11-17T21:00:00.000Z'),
    })
    expect(order).toEqual(sampleOrder)
  })

  it('o snapshot não depende do carrinho nem do endereço originais', () => {
    const address = { ...sampleOrder.address }
    const order = createOrder({
      items,
      address,
      paymentMethod: 'cash',
      id: 'x',
      createdAt: new Date(),
    })
    address.street = 'Outra rua'
    expect(order.address.street).toBe('Rua João Daniel Martinelli')
    expect(order.items[1]).toEqual({
      coffeeId: 'latte',
      name: 'Latte',
      unitPriceInCents: 990,
      quantity: 2,
    })
  })

  it('não cria pedido sem itens [RN-10]', () => {
    expect(() =>
      createOrder({
        items: [],
        address: sampleOrder.address,
        paymentMethod: 'credit',
        id: 'x',
        createdAt: new Date(),
      }),
    ).toThrow()
  })
})

describe('createOrderId', () => {
  it('gera ids diferentes', () => {
    expect(createOrderId()).not.toBe(createOrderId())
  })
})

describe('parseOrder [RNF-04]', () => {
  it('aceita um pedido válido', () => {
    expect(parseOrder(JSON.parse(JSON.stringify(sampleOrder)))).toEqual(sampleOrder)
  })

  it.each([
    ['null', null],
    ['texto', 'pedido'],
    ['sem itens', { ...sampleOrder, items: [] }],
    ['pagamento inválido', { ...sampleOrder, paymentMethod: 'pix' }],
    ['total negativo', { ...sampleOrder, totalInCents: -1 }],
    ['endereço incompleto', { ...sampleOrder, address: { city: 'Porto Alegre' } }],
    ['item quebrado', { ...sampleOrder, items: [{ name: 'Latte' }] }],
  ])('rejeita %s', (_, raw) => {
    expect(parseOrder(raw)).toBeNull()
  })
})
