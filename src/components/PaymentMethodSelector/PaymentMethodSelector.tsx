import { BankIcon, CreditCardIcon, CurrencyDollarIcon, MoneyIcon } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { useFormContext } from 'react-hook-form'
import type { CheckoutFormInput } from '../../schemas/checkoutSchema'
import { PAYMENT_METHOD_LABEL, type PaymentMethod } from '../../types/order'
import { PanelHeader } from '../PanelHeader'
import {
  ErrorMessage,
  Fieldset,
  Legend,
  Option,
  Options,
  Radio,
} from './PaymentMethodSelector.styles'

const OPTIONS: { value: PaymentMethod; icon: Icon }[] = [
  { value: 'credit', icon: CreditCardIcon },
  { value: 'debit', icon: BankIcon },
  { value: 'cash', icon: MoneyIcon },
]

// Forma de pagamento [RF-09, RN-05]: rádios nativos estilizados. As setas do teclado
// já trocam a opção, e o grupo é anunciado pela <legend> do <fieldset>.
export function PaymentMethodSelector() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormInput>()
  const error = errors.paymentMethod?.message

  return (
    <Fieldset aria-describedby={error ? 'payment-error' : undefined}>
      <Legend>
        <PanelHeader
          icon={<CurrencyDollarIcon size={22} aria-hidden />}
          iconColor="accentIcon"
          title="Pagamento"
          description="O pagamento é feito na entrega. Escolha a forma que deseja pagar"
        />
      </Legend>

      <Options>
        {OPTIONS.map(({ value, icon: OptionIcon }) => (
          <Option key={value}>
            <Radio type="radio" value={value} {...register('paymentMethod')} />
            <OptionIcon size={16} aria-hidden />
            {PAYMENT_METHOD_LABEL[value]}
          </Option>
        ))}
      </Options>

      {error && (
        <ErrorMessage id="payment-error" role="alert">
          {error}
        </ErrorMessage>
      )}
    </Fieldset>
  )
}
