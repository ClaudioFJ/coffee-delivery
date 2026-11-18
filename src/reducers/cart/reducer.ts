import type { CartItem, CartState } from '../../types/cart'
import { isValidQuantity } from '../../utils/cart'
import { MAX_QUANTITY, MIN_QUANTITY } from '../../utils/constants'
import type { CartAction } from './actions'

export const initialCartState: CartState = { items: [] }

// Troca a quantidade de um item sem mutar nada: cria um array novo (map)
// e um objeto novo só para o item alterado (spread).
function setQuantity(items: CartItem[], coffeeId: string, quantity: number): CartItem[] {
  return items.map((item) => (item.coffeeId === coffeeId ? { ...item, quantity } : item))
}

// Reducer: função PURA que recebe o estado atual e uma ação e devolve o PRÓXIMO estado.
// Nunca altera o estado recebido. Quando nada muda, devolve o mesmo objeto
// (assim o React sabe que não precisa renderizar de novo).
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { coffeeId, quantity } = action.payload
      if (!isValidQuantity(quantity)) return state // RN-01: só inteiros de 1 a 99

      const existing = state.items.find((item) => item.coffeeId === coffeeId)
      if (!existing) {
        return { ...state, items: [...state.items, { coffeeId, quantity }] }
      }

      // RN-02: café repetido soma na mesma linha, limitado a 99 (DP-03)
      const nextQuantity = Math.min(existing.quantity + quantity, MAX_QUANTITY)
      if (nextQuantity === existing.quantity) return state
      return { ...state, items: setQuantity(state.items, coffeeId, nextQuantity) }
    }

    case 'INCREMENT_ITEM': {
      const { coffeeId } = action.payload
      const item = state.items.find((candidate) => candidate.coffeeId === coffeeId)
      if (!item || item.quantity >= MAX_QUANTITY) return state
      return { ...state, items: setQuantity(state.items, coffeeId, item.quantity + 1) }
    }

    case 'DECREMENT_ITEM': {
      const { coffeeId } = action.payload
      const item = state.items.find((candidate) => candidate.coffeeId === coffeeId)
      // RN-01 / DP-01: no carrinho a quantidade não desce abaixo de 1; para tirar, usa-se REMOVE_ITEM
      if (!item || item.quantity <= MIN_QUANTITY) return state
      return { ...state, items: setQuantity(state.items, coffeeId, item.quantity - 1) }
    }

    case 'REMOVE_ITEM': {
      const { coffeeId } = action.payload
      if (!state.items.some((item) => item.coffeeId === coffeeId)) return state
      return { ...state, items: state.items.filter((item) => item.coffeeId !== coffeeId) }
    }

    case 'CLEAR_CART':
      return state.items.length === 0 ? state : { ...state, items: [] }

    default: {
      // Se alguém criar uma ação nova e esquecer o case, o TypeScript acusa erro aqui.
      const unhandled: never = action
      return unhandled
    }
  }
}
