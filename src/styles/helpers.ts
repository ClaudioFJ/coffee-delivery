import { css } from 'styled-components'
import { mq } from './breakpoints'

// Esconde visualmente, mas mantém o conteúdo para leitores de tela.
export const visuallyHidden = css`
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`

// Largura máxima e respiro lateral compartilhados pelo Header e pelo conteúdo.
export const pageContainer = css`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin-inline: auto;
  padding-inline: 1rem;

  ${mq.md} {
    padding-inline: 2rem;
  }
`
