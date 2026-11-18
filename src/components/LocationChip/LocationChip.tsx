import { MapPinIcon } from '@phosphor-icons/react'
import { VisuallyHidden } from '../VisuallyHidden'
import { Chip, City } from './LocationChip.styles'

interface LocationChipProps {
  city: string
  uf: string
}

// Mostra a cidade/UF do último pedido confirmado (decisão DP-07).
export function LocationChip({ city, uf }: LocationChipProps) {
  return (
    <Chip>
      <MapPinIcon size={22} weight="fill" aria-hidden />
      <VisuallyHidden>Entrega em </VisuallyHidden>
      <City>{city}, </City>
      {uf}
    </Chip>
  )
}
