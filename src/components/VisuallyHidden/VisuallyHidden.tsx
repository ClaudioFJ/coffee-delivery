import styled from 'styled-components'
import { visuallyHidden } from '../../styles/helpers'

// Texto que só leitores de tela "veem". Ex.: rótulos de campos sem label visível no Figma.
export const VisuallyHidden = styled.span`
  ${visuallyHidden}
`
