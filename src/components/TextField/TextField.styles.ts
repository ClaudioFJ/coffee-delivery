import styled from 'styled-components'
import { visuallyHidden } from '../../styles/helpers'
import { typography } from '../../styles/typography'

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`

export const HiddenLabel = styled.label`
  ${visuallyHidden};
`

export const InputWrapper = styled.div`
  position: relative;
`

export const Input = styled.input`
  ${typography.textS};
  width: 100%;
  height: 2.75rem;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }

  /* Figma: campo ativo ganha borda amarela */
  &:focus {
    border-color: ${({ theme }) => theme.colors.highlight};
  }

  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.colors.danger};
  }

  /* espaço para o texto "Opcional" dentro do campo */
  &[data-optional='true'] {
    padding-right: 4.5rem;
  }
`

export const OptionalHint = styled.span`
  ${typography.textXS};
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  font-style: italic;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.placeholder};
  pointer-events: none;
`

export const ErrorMessage = styled.p`
  ${typography.textXS};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.danger};
`

export const Hint = styled.output`
  ${typography.textXS};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
`
