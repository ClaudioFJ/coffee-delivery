import { describe, expect, it } from 'vitest'
import {
  addItem,
  clearCart,
  decrementItem,
  incrementItem,
  removeItem,
} from '../reducers/cart/actions'
import { cartReducer } from '../reducers/cart/reducer'
import type { CartState } from '../types/cart'

// Congela o estado (e os itens) para que QUALQUER tentativa de mutação lance erro.
function frozen(state: CartState): CartState {
  state.items.forEach((item) => Object.freeze(item))
  Object.freeze(state.items)
  return Object.freeze(state)
}

const withLatte = (quantity: number) => frozen({ items: [{ coffeeId: 'latte', quantity }] })

describe('cartReducer', () => {
  describe('TC-01 · ADD_ITEM de café novo [RF-03]', () => {
    it('cria uma linha com a quantidade escolhida', () => {
      const state = cartReducer(frozen({ items: [] }), addItem('latte', 2))
      expect(state.items).toEqual([{ coffeeId: 'latte', quantity: 2 }])
    })

    it('mantém os itens que já estavam no carrinho', () => {
      const state = cartReducer(withLatte(1), addItem('cubano', 3))
      expect(state.items).toEqual([
        { coffeeId: 'latte', quantity: 1 },
        { coffeeId: 'cubano', quantity: 3 },
      ])
    })
  })

  it('TC-02 · ADD_ITEM de café repetido soma na mesma linha [RN-02]', () => {
    const state = cartReducer(withLatte(2), addItem('latte', 3))
    expect(state.items).toEqual([{ coffeeId: 'latte', quantity: 5 }])
  })

  it.each([0, -1, 1.5, 100, Number.NaN])(
    'TC-03 · ADD_ITEM com quantidade inválida (%s) não altera o estado [RN-01]',
    (quantity) => {
      const before = withLatte(1)
      expect(cartReducer(before, addItem('latte', quantity))).toBe(before)
    },
  )

  it('TC-04 · ADD_ITEM que passaria de 99 fica em 99 (DP-03)', () => {
    const state = cartReducer(withLatte(90), addItem('latte', 20))
    expect(state.items).toEqual([{ coffeeId: 'latte', quantity: 99 }])
  })

  describe('TC-05 · DECREMENT_ITEM [RN-01, DP-01]', () => {
    it('diminui uma unidade', () => {
      expect(cartReducer(withLatte(3), decrementItem('latte')).items[0].quantity).toBe(2)
    })

    it('em 1 continua 1 e devolve o mesmo estado', () => {
      const before = withLatte(1)
      expect(cartReducer(before, decrementItem('latte'))).toBe(before)
    })
  })

  describe('TC-06 · INCREMENT, REMOVE e CLEAR [RF-05]', () => {
    it('INCREMENT_ITEM soma uma unidade, até 99', () => {
      expect(cartReducer(withLatte(3), incrementItem('latte')).items[0].quantity).toBe(4)
      const atMax = withLatte(99)
      expect(cartReducer(atMax, incrementItem('latte'))).toBe(atMax)
    })

    it('REMOVE_ITEM tira só o café indicado', () => {
      const before = frozen({
        items: [
          { coffeeId: 'latte', quantity: 1 },
          { coffeeId: 'cubano', quantity: 2 },
        ],
      })
      expect(cartReducer(before, removeItem('latte')).items).toEqual([
        { coffeeId: 'cubano', quantity: 2 },
      ])
    })

    it('CLEAR_CART esvazia o carrinho', () => {
      expect(cartReducer(withLatte(4), clearCart())).toEqual({ items: [] })
    })

    it('ações sobre um café que não está no carrinho não mudam nada', () => {
      const before = withLatte(1)
      expect(cartReducer(before, incrementItem('cubano'))).toBe(before)
      expect(cartReducer(before, decrementItem('cubano'))).toBe(before)
      expect(cartReducer(before, removeItem('cubano'))).toBe(before)
    })

    it('nunca muta o estado anterior (imutabilidade)', () => {
      const before = withLatte(2)
      const snapshot = structuredClone(before)

      const after = cartReducer(before, incrementItem('latte'))

      expect(before).toEqual(snapshot) // o estado antigo continua igual
      expect(after).not.toBe(before) // o novo estado é outro objeto
      expect(after.items).not.toBe(before.items) // com outro array
    })
  })
})
