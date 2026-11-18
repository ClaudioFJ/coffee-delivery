import { describe, expect, it } from 'vitest'
import { checkoutSchema, type CheckoutFormInput } from '../schemas/checkoutSchema'
import { isCompleteCep, maskCep, onlyDigits } from '../utils/cep'

const valid: CheckoutFormInput = {
  cep: '90250-440',
  street: 'Rua João Daniel Martinelli',
  number: '102',
  complement: '',
  neighborhood: 'Farrapos',
  city: 'Porto Alegre',
  uf: 'rs',
  paymentMethod: 'credit',
}

function errorsOf(input: Partial<CheckoutFormInput>) {
  const result = checkoutSchema.safeParse({ ...valid, ...input })
  return result.success
    ? {}
    : Object.fromEntries(result.error.issues.map((i) => [i.path[0], i.message]))
}

describe('máscara de CEP', () => {
  it.each([
    ['9', '9'],
    ['90250', '90250'],
    ['902504', '90250-4'],
    ['90250440', '90250-440'],
    ['90250-440', '90250-440'],
    ['90250-4401234', '90250-440'],
    ['abc90250x440', '90250-440'],
  ])('%s → %s', (typed, masked) => {
    expect(maskCep(typed)).toBe(masked)
  })

  it('reconhece um CEP completo', () => {
    expect(isCompleteCep('90250-440')).toBe(true)
    expect(isCompleteCep('90250-44')).toBe(false)
    expect(onlyDigits('90.250-440')).toBe('90250440')
  })
})

describe('TC-11 · schema do checkout [RN-07]', () => {
  it('aceita dados válidos e normaliza CEP e UF', () => {
    const result = checkoutSchema.parse(valid)
    expect(result.cep).toBe('90250440')
    expect(result.uf).toBe('RS')
  })

  it('complemento é opcional', () => {
    expect(errorsOf({ complement: undefined })).toEqual({})
    expect(errorsOf({ complement: '' })).toEqual({})
  })

  it.each<[Partial<CheckoutFormInput>, string, string]>([
    [{ cep: '90250-44' }, 'cep', 'Informe um CEP válido com 8 dígitos'],
    [{ cep: '' }, 'cep', 'Informe um CEP válido com 8 dígitos'],
    [{ street: 'R' }, 'street', 'Informe a rua'],
    [{ number: '   ' }, 'number', 'Informe o número'],
    [{ number: '12345678901' }, 'number', 'Use no máximo 10 caracteres'],
    [{ complement: 'x'.repeat(61) }, 'complement', 'Use no máximo 60 caracteres'],
    [{ neighborhood: '' }, 'neighborhood', 'Informe o bairro'],
    [{ city: '' }, 'city', 'Informe a cidade'],
    [{ uf: 'XX' }, 'uf', 'UF inválida'],
    [{ uf: '' }, 'uf', 'UF inválida'],
  ])('%o → erro em %s: "%s"', (input, field, message) => {
    expect(errorsOf(input)[field]).toBe(message)
  })

  it('aceita número com letras ("102A", "S/N")', () => {
    expect(errorsOf({ number: '102A' })).toEqual({})
    expect(errorsOf({ number: 'S/N' })).toEqual({})
  })
})

it('TC-12 · exige forma de pagamento [RF-09]', () => {
  expect(errorsOf({ paymentMethod: undefined }).paymentMethod).toBe(
    'Selecione uma forma de pagamento',
  )
  expect(errorsOf({ paymentMethod: 'pix' as never }).paymentMethod).toBe(
    'Selecione uma forma de pagamento',
  )
})
