// Cada ação é um objeto com um `type` (o que aconteceu) e, quando precisa, um `payload`
// (os dados). A union discriminada faz o TypeScript saber o formato do payload em cada case.
export type CartAction =
  | { type: 'ADD_ITEM'; payload: { coffeeId: string; quantity: number } }
  | { type: 'INCREMENT_ITEM'; payload: { coffeeId: string } }
  | { type: 'DECREMENT_ITEM'; payload: { coffeeId: string } }
  | { type: 'REMOVE_ITEM'; payload: { coffeeId: string } }
  | { type: 'CLEAR_CART' }

// "Action creators": funções que montam as ações, para os componentes
// não escreverem os objetos à mão (e não errarem o nome do type).
export const addItem = (coffeeId: string, quantity: number): CartAction => ({
  type: 'ADD_ITEM',
  payload: { coffeeId, quantity },
})

export const incrementItem = (coffeeId: string): CartAction => ({
  type: 'INCREMENT_ITEM',
  payload: { coffeeId },
})

export const decrementItem = (coffeeId: string): CartAction => ({
  type: 'DECREMENT_ITEM',
  payload: { coffeeId },
})

export const removeItem = (coffeeId: string): CartAction => ({
  type: 'REMOVE_ITEM',
  payload: { coffeeId },
})

export const clearCart = (): CartAction => ({ type: 'CLEAR_CART' })
