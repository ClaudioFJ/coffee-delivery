import styled from 'styled-components'
import { mq } from '../../styles/breakpoints'
import { typography } from '../../styles/typography'

export const Wrapper = styled.fieldset`
  display: inline-flex;
  min-inline-size: 0;
  padding: 0;
  border: 0;
  align-items: center;
  height: 2.75rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.button};

  ${mq.md} {
    height: 2.375rem;
  }
`

export const StepButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* área de toque maior que o ícone: 44px no celular */
  width: 2.75rem;
  height: 100%;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors.accentIcon};
  transition:
    color 0.2s,
    background-color 0.2s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.hover};
  }

  &:disabled {
    opacity: 0.4;
  }

  ${mq.md} {
    width: 1.75rem;
  }
`

export const Value = styled.output`
  ${typography.textM};
  min-width: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.title};
`
