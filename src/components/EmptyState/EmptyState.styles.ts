import { Link } from 'react-router'
import styled from 'styled-components'
import { typography } from '../../styles/typography'

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 28rem;
  margin: 3rem auto 0;
  text-align: center;
`

export const IconCircle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.tagBg};
  color: ${({ theme }) => theme.colors.tagText};
`

export const Title = styled.h1`
  ${typography.titleL};
  color: ${({ theme }) => theme.colors.subtitle};
`

export const Description = styled.p`
  ${typography.textM};
  color: ${({ theme }) => theme.colors.text};
`

export const ActionLink = styled(Link)`
  ${typography.buttonG};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.875rem;
  margin-top: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`
