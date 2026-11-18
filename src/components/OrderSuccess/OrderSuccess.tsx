import { CurrencyDollarIcon, MapPinIcon, TimerIcon } from '@phosphor-icons/react'
import mascotDark from '../../assets/illustrations/delivery-mascot-dark.webp'
import mascotLight from '../../assets/illustrations/delivery-mascot-light.webp'
import { useTheme } from '../../hooks/useTheme'
import { PAYMENT_METHOD_LABEL, type Order } from '../../types/order'
import {
  Card,
  Heading,
  IconCircle,
  Illustration,
  Row,
  Subtitle,
  Title,
  Wrapper,
} from './OrderSuccess.styles'

interface OrderSuccessProps {
  order: Order
}

// Tela de confirmação [RF-12]. Mostra o SNAPSHOT do pedido, não o carrinho:
// o carrinho já foi limpo quando esta tela aparece [RF-13].
export function OrderSuccess({ order }: OrderSuccessProps) {
  const { mode } = useTheme()
  const { street, number, complement, neighborhood, city, uf } = order.address

  return (
    <Wrapper>
      <Heading>
        <Title>Uhu! Pedido confirmado</Title>
        <Subtitle>Agora é só aguardar que logo o café chegará até você</Subtitle>
      </Heading>

      <Card aria-label="Resumo do pedido">
        <Row>
          <IconCircle $color="iconPurple" aria-hidden>
            <MapPinIcon size={16} weight="fill" />
          </IconCircle>
          <p>
            Entrega em{' '}
            <strong>
              {street}, {number}
              {complement ? ` - ${complement}` : ''}
            </strong>
            <br />
            {neighborhood} - {city}, {uf}
          </p>
        </Row>

        <Row>
          <IconCircle $color="iconYellow" aria-hidden>
            <TimerIcon size={16} weight="fill" />
          </IconCircle>
          <p>
            Previsão de entrega
            <br />
            <strong>{order.estimatedDelivery}</strong>
          </p>
        </Row>

        <Row>
          <IconCircle $color="iconYellowDark" aria-hidden>
            <CurrencyDollarIcon size={16} />
          </IconCircle>
          <p>
            Pagamento na entrega
            <br />
            <strong>{PAYMENT_METHOD_LABEL[order.paymentMethod]}</strong>
          </p>
        </Row>
      </Card>

      <Illustration>
        {/* decorativa: o mascote "a caminho" com o café */}
        <img src={mode === 'dark' ? mascotDark : mascotLight} alt="" width={558} height={558} />
      </Illustration>
    </Wrapper>
  )
}
