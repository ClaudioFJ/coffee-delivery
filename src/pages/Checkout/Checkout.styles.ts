import styled from 'styled-components'
import { mq } from '../../styles/breakpoints'
import { typography } from '../../styles/typography'

export const Form = styled.form`
  display: grid;
  gap: 2rem;
  padding-top: 1rem;

  ${mq.lg} {
    grid-template-columns: minmax(0, 40rem) minmax(0, 28rem);
    justify-content: space-between;
    align-items: start;
    padding-top: 2.5rem;
  }
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 0;
`

export const PageTitle = styled.h1`
  ${typography.titleXS};
  color: ${({ theme }) => theme.colors.subtitle};
`

export const ColumnTitle = styled.h2`
  ${typography.titleXS};
  color: ${({ theme }) => theme.colors.subtitle};
`

export const Panel = styled.section`
  padding: 1.5rem 1rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.surface};

  ${mq.md} {
    padding: 2.5rem;
  }
`

export const SummaryPanel = styled(Panel)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  ${mq.md} {
    border-radius: 6px 44px;
  }
`

export const ItemsList = styled.ul`
  list-style: none;
`

export const ConfirmButton = styled.button`
  ${typography.buttonG};
  width: 100%;
  min-height: 2.875rem;
  padding: 0.75rem 0.5rem;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.6;
  }
`

export const SubmitError = styled.p`
  ${typography.textS};
  color: ${({ theme }) => theme.colors.danger};
`
