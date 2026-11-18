import { z } from 'zod'
import { PAYMENT_METHODS } from '../types/order'
import { onlyDigits } from '../utils/cep'

export const UFS = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
] as const

// Uma única fonte de verdade: o mesmo schema VALIDA o formulário e GERA os tipos
// (z.input / z.output). Mensagens conforme PRD §5.1 [RF-08, RF-09, RN-07].
export const checkoutSchema = z.object({
  cep: z
    .string()
    .transform(onlyDigits)
    .refine((digits) => digits.length === 8, 'Informe um CEP válido com 8 dígitos'),
  street: z.string().trim().min(3, 'Informe a rua').max(100, 'Use no máximo 100 caracteres'),
  number: z.string().trim().min(1, 'Informe o número').max(10, 'Use no máximo 10 caracteres'),
  complement: z.string().trim().max(60, 'Use no máximo 60 caracteres').optional(),
  neighborhood: z.string().trim().min(2, 'Informe o bairro').max(60, 'Use no máximo 60 caracteres'),
  city: z.string().trim().min(2, 'Informe a cidade').max(60, 'Use no máximo 60 caracteres'),
  uf: z
    .string()
    .trim()
    .toUpperCase()
    .pipe(z.enum(UFS, { error: 'UF inválida' })),
  paymentMethod: z.enum(PAYMENT_METHODS, { error: 'Selecione uma forma de pagamento' }),
})

export type CheckoutFormInput = z.input<typeof checkoutSchema> // o que o formulário guarda
export type CheckoutFormData = z.output<typeof checkoutSchema> // o que sai depois de validado
