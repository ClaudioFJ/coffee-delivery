import styled from 'styled-components'
import { mq } from '../../styles/breakpoints'

export const ToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem; /* 44px: alvo de toque confortável no celular */
  height: 2.75rem;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.onAccentSoft};
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }

  ${mq.md} {
    width: 2.375rem; /* 38px, igual aos botões do Header no Figma */
    height: 2.375rem;
  }
`
