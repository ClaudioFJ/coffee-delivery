import type { Coffee } from './coffee'

// O carrinho guarda só a referência ao café e a quantidade.
// Nome, preço e imagem vêm sempre do catálogo (TECH_SPEC §4).
export interface CartItem {
  coffeeId: Coffee['id']
  quantity: number // inteiro de MIN_QUANTITY a MAX_QUANTITY [RN-01]
}

export interface CartState {
  items: CartItem[]
}

// Item do carrinho "enriquecido" com os dados do catálogo, pronto para exibir.
export interface CartItemWithCoffee {
  coffee: Coffee
  quantity: number
}
