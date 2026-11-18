import { describe, expect, it } from 'vitest'
import { coffees } from '../data/coffees'
import {
  calcDeliveryFee,
  calcSubtotal,
  calcTotal,
  countUnits,
  resolveCartItems,
  sanitizeCart,
} from '../utils/cart'
import { DELIVERY_FEE_IN_CENTS } from '../utils/constants'

describe('TC-07 · contagem de unidades [RF-04]', () => {
  it('soma as quantidades, não os tipos', () => {
    expect(
      countUnits([
        { coffeeId: 'latte', quantity: 5 },
        { coffeeId: 'expresso-tradicional', quantity: 1 },
      ]),
    ).toBe(6)
  })

  it('carrinho vazio tem zero unidades', () => {
    expect(countUnits([])).toBe(0)
  })
})

describe('resolveCartItems', () => {
  it('junta os dados do catálogo e descarta cafés inexistentes [RN-10]', () => {
    const resolved = resolveCartItems(
      [
        { coffeeId: 'latte', quantity: 2 },
        { coffeeId: 'cafe-que-nao-existe', quantity: 1 },
      ],
      coffees,
    )

    expect(resolved).toHaveLength(1)
    expect(resolved[0].coffee.name).toBe('Latte')
    expect(resolved[0].quantity).toBe(2)
  })
})

describe('TC-08 · subtotal, entrega e total [RF-10, RN-03]', () => {
  it('Expresso ×1 + Latte ×2 → 2970 + 350 = 3320 centavos', () => {
    const items = resolveCartItems(
      [
        { coffeeId: 'expresso-tradicional', quantity: 1 },
        { coffeeId: 'latte', quantity: 2 },
      ],
      coffees,
    )
    const subtotal = calcSubtotal(items)

    expect(subtotal).toBe(2970)
    expect(calcDeliveryFee(subtotal)).toBe(DELIVERY_FEE_IN_CENTS)
    expect(calcTotal(subtotal)).toBe(3320)
  })

  it('carrinho vazio não cobra entrega', () => {
    expect(calcSubtotal([])).toBe(0)
    expect(calcDeliveryFee(0)).toBe(0)
    expect(calcTotal(0)).toBe(0)
  })

  it('o resultado é sempre inteiro (centavos)', () => {
    const items = resolveCartItems([{ coffeeId: 'cubano', quantity: 99 }], coffees)
    expect(Number.isInteger(calcTotal(calcSubtotal(items)))).toBe(true)
  })
})

describe('TC-10 · sanitizeCart [RN-10, RNF-04]', () => {
  it('mantém um carrinho válido como está', () => {
    const cart = { items: [{ coffeeId: 'latte', quantity: 3 }] }
    expect(sanitizeCart(cart, coffees)).toEqual(cart)
  })

  it.each([
    ['null', null],
    ['texto', 'lixo'],
    ['número', 42],
    ['objeto sem items', { foo: 1 }],
    ['items que não é lista', { items: 'x' }],
  ])('dado inválido (%s) vira carrinho vazio', (_, raw) => {
    expect(sanitizeCart(raw, coffees)).toEqual({ items: [] })
  })

  it('remove cafés inexistentes e quantidades inválidas', () => {
    const raw = {
      items: [
        { coffeeId: 'latte', quantity: 2 },
        { coffeeId: 'nao-existe', quantity: 1 },
        { coffeeId: 'cubano', quantity: 0 },
        { coffeeId: 'arabe', quantity: -3 },
        { coffeeId: 'havaiano', quantity: 1.5 },
        { coffeeId: 'irlandes', quantity: 100 },
        { coffeeId: 'macchiato', quantity: '2' },
        'não é objeto',
        null,
      ],
    }
    expect(sanitizeCart(raw, coffees)).toEqual({ items: [{ coffeeId: 'latte', quantity: 2 }] })
  })

  it('junta linhas duplicadas respeitando o máximo de 99 [RN-02]', () => {
    const raw = {
      items: [
        { coffeeId: 'latte', quantity: 60 },
        { coffeeId: 'latte', quantity: 50 },
      ],
    }
    expect(sanitizeCart(raw, coffees)).toEqual({ items: [{ coffeeId: 'latte', quantity: 99 }] })
  })
})
