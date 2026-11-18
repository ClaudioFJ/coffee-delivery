// Formatação de dinheiro [RN-04]. Os valores circulam SEMPRE em centavos (inteiros)
// e só viram texto aqui, na hora de exibir. Isso evita erros como 0.1 + 0.2 = 0.30000000000000004.
const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const decimal = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

// 3320 → 'R$ 33,20' (com espaço não separável entre R$ e o número)
export function formatBRL(cents: number): string {
  return brl.format(cents / 100)
}

// 990 → '9,90' (o card do catálogo mostra "R$" menor, separado do valor)
export function formatPriceValue(cents: number): string {
  return decimal.format(cents / 100)
}
