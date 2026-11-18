import { useFormContext } from 'react-hook-form'
import type { CepStatus } from '../../hooks/useCepLookup'
import type { CheckoutFormInput } from '../../schemas/checkoutSchema'
import { maskCep } from '../../utils/cep'
import { AreaField, Fields } from './DeliveryAddressForm.styles'

interface DeliveryAddressFormProps {
  cepStatus: CepStatus
  onCepComplete: (cep: string) => void
}

// Campos de endereço [RF-08]. Lê o formulário do contexto do React Hook Form
// (useFormContext), sem precisar receber register/errors por Props.
export function DeliveryAddressForm({ cepStatus, onCepComplete }: DeliveryAddressFormProps) {
  const {
    register,
    setValue,
    getFieldState,
    formState: { errors },
  } = useFormContext<CheckoutFormInput>()

  const cepField = register('cep', {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      const masked = maskCep(event.target.value)
      // revalida enquanto digita só se o campo já foi visitado (mesma regra do mode 'onTouched')
      setValue('cep', masked, { shouldValidate: getFieldState('cep').isTouched })
      onCepComplete(masked)
    },
  })

  return (
    <Fields>
      <AreaField
        $area="cep"
        label="CEP"
        inputMode="numeric"
        autoComplete="postal-code"
        maxLength={9}
        error={errors.cep?.message}
        hint={cepStatus === 'loading' ? 'Buscando endereço…' : undefined}
        {...cepField}
      />
      <AreaField
        $area="street"
        label="Rua"
        autoComplete="address-line1"
        error={errors.street?.message}
        {...register('street')}
      />
      <AreaField
        $area="number"
        label="Número"
        autoComplete="off"
        error={errors.number?.message}
        {...register('number')}
      />
      <AreaField
        $area="complement"
        label="Complemento"
        optional
        autoComplete="address-line2"
        error={errors.complement?.message}
        {...register('complement')}
      />
      <AreaField
        $area="neighborhood"
        label="Bairro"
        autoComplete="address-level3"
        error={errors.neighborhood?.message}
        {...register('neighborhood')}
      />
      <AreaField
        $area="city"
        label="Cidade"
        autoComplete="address-level2"
        error={errors.city?.message}
        {...register('city')}
      />
      <AreaField
        $area="uf"
        label="UF"
        autoComplete="address-level1"
        maxLength={2}
        error={errors.uf?.message}
        {...register('uf')}
      />
    </Fields>
  )
}
