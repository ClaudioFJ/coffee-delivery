import styled from 'styled-components'
import { mq } from '../../styles/breakpoints'
import { typography } from '../../styles/typography'

export const Fieldset = styled.fieldset`
  min-inline-size: 0;
  padding: 0;
  border: 0;
`

/* float + width: truque para a <legend> se comportar como um bloco comum */
export const Legend = styled.legend`
  float: left;
  width: 100%;
  padding: 0;
`

export const Options = styled.div`
  clear: both;
  display: grid;
  gap: 0.75rem;
  padding-top: 2rem;

  ${mq.sm} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

export const Option = styled.label`
  ${typography.buttonM};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 3.25rem;
  padding: 1rem;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s;

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.accentIcon};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }

  /* selecionado: cor E borda (não depende só da cor) [RNF-01] */
  &:has(input:checked) {
    border-color: ${({ theme }) => theme.colors.selectedBorder};
    background: ${({ theme }) => theme.colors.accentSoft};
    color: ${({ theme }) => theme.colors.onAccentSoft};
  }

  &:has(input:focus-visible) {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }
`

/* o rádio nativo continua existindo (teclado e leitor de tela), só fica invisível */
export const Radio = styled.input`
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
`

export const ErrorMessage = styled.p`
  ${typography.textXS};
  font-weight: 400;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.colors.danger};
`
