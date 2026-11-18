import styled from 'styled-components'
import { typography } from '../../styles/typography'

export const Tag = styled.li`
  ${typography.tag};
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.tagBg};
  color: ${({ theme }) => theme.colors.tagText};
`
