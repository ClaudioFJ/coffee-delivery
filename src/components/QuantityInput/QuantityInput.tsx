import { MinusIcon, PlusIcon } from '@phosphor-icons/react'
import { MAX_QUANTITY, MIN_QUANTITY } from '../../utils/constants'
import { VisuallyHidden } from '../VisuallyHidden'
import { StepButton, Value, Wrapper } from './QuantityInput.styles'

interface QuantityInputProps {
  value: number
  onIncrement: () => void
  onDecrement: () => void
  itemName: string // usado nos nomes acessíveis: "Aumentar quantidade de Latte"
  min?: number
  max?: number
}

// Componente "controlado": não guarda estado próprio. Quem usa decide o valor
// e o que acontece em cada clique. Assim ele serve tanto no card quanto no carrinho.
export function QuantityInput({
  value,
  onIncrement,
  onDecrement,
  itemName,
  min = MIN_QUANTITY,
  max = MAX_QUANTITY,
}: QuantityInputProps) {
  return (
    // <fieldset> + <legend> agrupam os botões sob o nome "Quantidade de Latte"
    <Wrapper>
      <VisuallyHidden as="legend">Quantidade de {itemName}</VisuallyHidden>
      <StepButton
        type="button"
        onClick={onDecrement}
        disabled={value <= min}
        aria-label={`Diminuir quantidade de ${itemName}`}
      >
        <MinusIcon size={14} weight="bold" aria-hidden />
      </StepButton>

      {/* <output> + aria-live: o leitor de tela anuncia o novo valor a cada clique */}
      <Value aria-live="polite">{value}</Value>

      <StepButton
        type="button"
        onClick={onIncrement}
        disabled={value >= max}
        aria-label={`Aumentar quantidade de ${itemName}`}
      >
        <PlusIcon size={14} weight="bold" aria-hidden />
      </StepButton>
    </Wrapper>
  )
}
