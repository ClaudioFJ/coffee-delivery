import type { ReactNode } from 'react'
import styled from 'styled-components'
import { typography } from '../../styles/typography'

const Wrapper = styled.div<{ $iconColor: 'highlight' | 'accentIcon' }>`
  display: flex;
  gap: 0.5rem;

  svg {
    flex-shrink: 0;
    color: ${({ theme, $iconColor }) => theme.colors[$iconColor]};
  }
`

const Title = styled.span`
  ${typography.textM};
  display: block;
  color: ${({ theme }) => theme.colors.subtitle};
`

const Description = styled.span`
  ${typography.textS};
  display: block;
  margin-top: 0.125rem;
  color: ${({ theme }) => theme.colors.text};
`

interface PanelHeaderProps {
  icon: ReactNode
  iconColor: 'highlight' | 'accentIcon'
  title: string
  description: string
  titleId?: string
}

// Cabeçalho dos painéis do checkout: ícone + título + explicação (Figma)
export function PanelHeader({ icon, iconColor, title, description, titleId }: PanelHeaderProps) {
  return (
    <Wrapper $iconColor={iconColor}>
      {icon}
      <span>
        <Title id={titleId}>{title}</Title>
        <Description>{description}</Description>
      </span>
    </Wrapper>
  )
}
