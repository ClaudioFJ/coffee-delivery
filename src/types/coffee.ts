export type CoffeeTag = 'tradicional' | 'gelado' | 'com leite' | 'especial' | 'alcoólico'

export interface Coffee {
  id: string // slug estável, ex.: 'expresso-tradicional'
  name: string
  description: string
  tags: CoffeeTag[]
  priceInCents: number // 990 = R$ 9,90 [RN-04]
  image: string // caminho gerado pelo Vite ao importar o PNG
}
