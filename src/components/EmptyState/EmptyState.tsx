import type { ReactNode } from 'react'
import { ActionLink, Description, IconCircle, Title, Wrapper } from './EmptyState.styles'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  actionLabel: string
  actionTo: string
}

// Estado vazio reutilizável [RN-09]: carrinho vazio, pedido inexistente, página não encontrada.
// Sempre oferece um caminho de volta.
export function EmptyState({ icon, title, description, actionLabel, actionTo }: EmptyStateProps) {
  return (
    <Wrapper>
      <IconCircle aria-hidden>{icon}</IconCircle>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <ActionLink to={actionTo}>{actionLabel}</ActionLink>
    </Wrapper>
  )
}
