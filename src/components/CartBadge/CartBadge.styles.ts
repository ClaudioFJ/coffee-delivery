import styled from 'styled-components'
import { typography } from '../../styles/typography'

export const Badge = styled.span`
  ${typography.textXS};
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding-inline: 0.25rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.badgeBg};
  color: ${({ theme }) => theme.colors.badgeText};
  letter-spacing: -0.02em;
`
