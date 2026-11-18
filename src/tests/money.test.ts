import { describe, expect, it } from 'vitest'
import { formatBRL, formatPriceValue } from '../utils/money'

// O Intl usa um espaço NÃO separável (código 160) entre "R$" e o número.
const NBSP = String.fromCharCode(160)

describe('TC-09 · formatação em BRL [RN-04]', () => {
  it.each([
    [3320, `R$${NBSP}33,20`],
    [990, `R$${NBSP}9,90`],
    [350, `R$${NBSP}3,50`],
    [0, `R$${NBSP}0,00`],
    [123456, `R$${NBSP}1.234,56`],
  ])('%i centavos → %s', (cents, expected) => {
    expect(formatBRL(cents)).toBe(expected)
  })

  it('formata só o valor, sem símbolo, para o card do catálogo', () => {
    expect(formatPriceValue(990)).toBe('9,90')
    expect(formatPriceValue(1000)).toBe('10,00')
  })

  it('não sofre com erro de ponto flutuante', () => {
    // 0.1 + 0.2 em reais daria 0.30000000000000004; em centavos é 10 + 20 = 30
    expect(formatBRL(10 + 20)).toBe(`R$${NBSP}0,30`)
  })
})
