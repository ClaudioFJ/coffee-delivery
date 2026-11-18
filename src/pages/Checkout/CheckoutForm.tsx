import { zodResolver } from '@hookform/resolvers/zod'
import { MapPinLineIcon } from '@phosphor-icons/react'
import { useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { CartItem } from '../../components/CartItem'
import { CartSummary } from '../../components/CartSummary'
import { DeliveryAddressForm } from '../../components/DeliveryAddressForm'
import { PanelHeader } from '../../components/PanelHeader'
import { PaymentMethodSelector } from '../../components/PaymentMethodSelector'
import { useCart } from '../../hooks/useCart'
import { useCepLookup } from '../../hooks/useCepLookup'
import {
  checkoutSchema,
  type CheckoutFormData,
  type CheckoutFormInput,
} from '../../schemas/checkoutSchema'
import { isCompleteCep, onlyDigits } from '../../utils/cep'
import {
  Column,
  ColumnTitle,
  ConfirmButton,
  Form,
  ItemsList,
  PageTitle,
  Panel,
  SubmitError,
  SummaryPanel,
} from './Checkout.styles'

const CEP_MESSAGES = {
  'not-found': 'CEP não encontrado. Confira o número ou preencha o endereço manualmente.',
  error: 'Não foi possível consultar o CEP. Preencha o endereço manualmente.',
} as const

export function CheckoutForm() {
  const navigate = useNavigate()
  const cart = useCart()
  const cep = useCepLookup()
  const lastLookedUpCep = useRef('')

  const form = useForm<CheckoutFormInput, unknown, CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onTouched', // erro aparece ao sair do campo e some enquanto o usuário corrige
    defaultValues: {
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      uf: '',
    },
  })
  const { handleSubmit, setValue, setError, clearErrors, setFocus, formState } = form

  // Chamado a cada digitação no CEP. A consulta parte de um EVENTO (o usuário digitou
  // o 8º dígito), não de um useEffect, porque é uma resposta direta a uma ação.
  async function handleCepChange(maskedCep: string) {
    if (!isCompleteCep(maskedCep)) {
      lastLookedUpCep.current = ''
      cep.reset()
      return
    }
    const digits = onlyDigits(maskedCep)
    if (digits === lastLookedUpCep.current) return
    lastLookedUpCep.current = digits

    const result = await cep.lookup(digits)
    if (!result) return // consulta cancelada por um CEP mais novo

    if (result.status === 'success') {
      clearErrors('cep')
      const { street, neighborhood, city, uf } = result.address
      // Só preenche o que a API devolveu; campos vazios ficam para o usuário (DP-05)
      const fill = { street, neighborhood, city, uf } as const
      for (const [field, value] of Object.entries(fill) as [keyof typeof fill, string][]) {
        if (value) setValue(field, value, { shouldValidate: true })
      }
      setFocus('number') // RF-08: número é sempre manual
    } else {
      setError('cep', { type: 'lookup', message: CEP_MESSAGES[result.status] })
    }
  }

  function onValid(data: CheckoutFormData) {
    if (cep.status === 'loading') return // RN-10: espera a consulta terminar

    const { paymentMethod, complement, ...address } = data
    cart.confirmOrder({
      address: { ...address, complement: complement || undefined },
      paymentMethod,
    })
    // replace: o botão "voltar" não retorna para um checkout já vazio
    navigate('/success', { replace: true })
  }

  const hasErrors = Object.keys(formState.errors).length > 0
  const showSubmitError = formState.submitCount > 0 && hasErrors

  return (
    <FormProvider {...form}>
      <Form onSubmit={handleSubmit(onValid)} noValidate>
        <Column>
          <PageTitle>Complete seu pedido</PageTitle>

          <Panel aria-labelledby="address-title">
            <PanelHeader
              icon={<MapPinLineIcon size={22} aria-hidden />}
              iconColor="highlight"
              title="Endereço de Entrega"
              titleId="address-title"
              description="Informe o endereço onde deseja receber seu pedido"
            />
            <DeliveryAddressForm cepStatus={cep.status} onCepComplete={handleCepChange} />
          </Panel>

          <Panel>
            <PaymentMethodSelector />
          </Panel>
        </Column>

        <Column>
          <ColumnTitle id="cart-title">Cafés selecionados</ColumnTitle>

          <SummaryPanel aria-labelledby="cart-title">
            <ItemsList>
              {cart.items.map((item) => (
                <CartItem
                  key={item.coffee.id}
                  item={item}
                  onIncrement={cart.incrementItem}
                  onDecrement={cart.decrementItem}
                  onRemove={cart.removeItem}
                />
              ))}
            </ItemsList>

            <CartSummary
              subtotalInCents={cart.subtotalInCents}
              deliveryFeeInCents={cart.deliveryFeeInCents}
              totalInCents={cart.totalInCents}
            />

            {/* role="alert": o leitor de tela anuncia na hora que o envio falhou [RF-11] */}
            {showSubmitError && (
              <SubmitError role="alert">
                Não foi possível confirmar o pedido. Corrija os campos destacados.
              </SubmitError>
            )}

            <ConfirmButton type="submit" disabled={cep.status === 'loading'}>
              Confirmar pedido
            </ConfirmButton>
          </SummaryPanel>
        </Column>
      </Form>
    </FormProvider>
  )
}
