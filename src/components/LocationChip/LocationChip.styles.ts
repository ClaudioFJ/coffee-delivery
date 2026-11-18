import styled from 'styled-components'
import { mq } from '../../styles/breakpoints'
import { visuallyHidden } from '../../styles/helpers'
import { typography } from '../../styles/typography'

export const Chip = styled.p`
  ${typography.textS};
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  height: 2.75rem;
  padding-inline: 0.5rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.onAccentSoft};
  white-space: nowrap;

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.accentIcon};
  }

  ${mq.md} {
    height: 2.375rem;
  }
`

// No celular só a UF aparece; o nome da cidade continua disponível para leitores de tela.
export const City = styled.span`
  ${visuallyHidden};

  ${mq.sm} {
    position: static !important;
    width: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    clip: auto;
  }
`
