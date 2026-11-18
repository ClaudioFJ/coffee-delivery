import { useCallback, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import { coffees } from '../data/coffees'
import { useLocalStorage } from '../hooks/useLocalStorage'
import * as actions from '../reducers/cart/actions'
import { cartReducer, initialCartState } from '../reducers/cart/reducer'
import type { CartState } from '../types/cart'
import type { DeliveryAddress, Order, PaymentMethod } from '../types/order'
import {
  calcDeliveryFee,
  calcSubtotal,
  calcTotal,
  countUnits,
  resolveCartItems,
  sanitizeCart,
} from '../utils/cart'
import { createOrder, createOrderId, parseOrder } from '../utils/order'
import { readStorage, STORAGE_KEYS, writeStorage } from '../utils/storage'
import { CartContext, type CartContextValue } from './CartContext'

interface CartProviderProps {
  children: ReactNode
  initialState?: CartState // usado nos testes; sem ele, o carrinho vem do localStorage
}

// Lê o carrinho salvo e passa pelo sanitizeCart: cafés que não existem mais,
// quantidades inválidas ou JSON corrompido nunca chegam ao estado [RF-06, RNF-04].
function loadSavedCart(): CartState {
  return readStorage(STORAGE_KEYS.cart, (raw) => sanitizeCart(raw, coffees)) ?? initialCartState
}

export function CartProvider({ children, initialState }: CartProviderProps) {
  // 3º argumento do useReducer: função de inicialização, executada UMA vez na montagem.
  // Assim a primeira renderização já mostra o carrinho salvo, sem "piscar" vazio.
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState,
    (provided) => provided ?? loadSavedCart(),
  )

  // Grava a cada mudança do estado. Efeito = sincronizar o React com algo externo (o storage).
  useEffect(() => {
    writeStorage(STORAGE_KEYS.cart, state)
  }, [state])

  // Valores DERIVADOS: calculados a partir dos itens a cada mudança, nunca guardados
  // no estado. Assim é impossível o total "desencontrar" dos itens.
  const derived = useMemo(() => {
    const items = resolveCartItems(state.items, coffees)
    const subtotalInCents = calcSubtotal(items)
    return {
      items,
      totalUnits: countUnits(items),
      subtotalInCents,
      deliveryFeeInCents: calcDeliveryFee(subtotalInCents),
      totalInCents: calcTotal(subtotalInCents),
    }
  }, [state.items])

  // useCallback mantém a mesma função entre renderizações (dispatch nunca muda),
  // evitando renderizações desnecessárias em quem recebe essas funções.
  const addItem = useCallback(
    (coffeeId: string, quantity: number) => dispatch(actions.addItem(coffeeId, quantity)),
    [],
  )
  const incrementItem = useCallback(
    (coffeeId: string) => dispatch(actions.incrementItem(coffeeId)),
    [],
  )
  const decrementItem = useCallback(
    (coffeeId: string) => dispatch(actions.decrementItem(coffeeId)),
    [],
  )
  const removeItem = useCallback((coffeeId: string) => dispatch(actions.removeItem(coffeeId)), [])
  const clearCart = useCallback(() => dispatch(actions.clearCart()), [])

  // Último pedido: salvo separado do carrinho, para continuar existindo depois que
  // o carrinho é limpo e depois de um F5 na tela de sucesso [RN-06, RF-13, DP-06].
  const [lastOrder, setLastOrder] = useLocalStorage<Order | null>(
    STORAGE_KEYS.lastOrder,
    null,
    parseOrder,
  )

  const confirmOrder = useCallback(
    ({ address, paymentMethod }: { address: DeliveryAddress; paymentMethod: PaymentMethod }) => {
      // createOrder lança erro se não houver itens válidos [RN-10]
      const order = createOrder({
        items: derived.items,
        address,
        paymentMethod,
        id: createOrderId(),
        createdAt: new Date(),
      })
      setLastOrder(order)
      dispatch(actions.clearCart())
      return order
    },
    [derived.items, setLastOrder],
  )

  const value = useMemo<CartContextValue>(
    () => ({
      ...derived,
      addItem,
      incrementItem,
      decrementItem,
      removeItem,
      clearCart,
      lastOrder,
      confirmOrder,
    }),
    [
      derived,
      addItem,
      incrementItem,
      decrementItem,
      removeItem,
      clearCart,
      lastOrder,
      confirmOrder,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
