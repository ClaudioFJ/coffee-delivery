import styled from 'styled-components'
import { typography } from '../../styles/typography'
import { formatBRL } from '../../utils/money'

const List = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const Row = styled.div<{ $total?: boolean }>`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: ${({ theme, $total }) => ($total ? theme.colors.subtitle : theme.colors.text)};

  dt {
    ${({ $total }) => ($total ? typography.textL : typography.textS)};
    font-weight: ${({ $total }) => ($total ? 700 : 400)};
  }

  dd {
    ${({ $total }) => ($total ? typography.textL : typography.textM)};
    font-weight: ${({ $total }) => ($total ? 700 : 400)};
  }
`

interface CartSummaryProps {
  subtotalInCents: number
  deliveryFeeInCents: number
  totalInCents: number
}

// Resumo financeiro [RF-10]. Recebe os valores já calculados (centavos) e só formata.
export function CartSummary({
  subtotalInCents,
  deliveryFeeInCents,
  totalInCents,
}: CartSummaryProps) {
  return (
    <List>
      <Row>
        <dt>Total de itens</dt>
        <dd>{formatBRL(subtotalInCents)}</dd>
      </Row>
      <Row>
        <dt>Entrega</dt>
        <dd>{formatBRL(deliveryFeeInCents)}</dd>
      </Row>
      <Row $total>
        <dt>Total</dt>
        <dd>{formatBRL(totalInCents)}</dd>
      </Row>
    </List>
  )
}
