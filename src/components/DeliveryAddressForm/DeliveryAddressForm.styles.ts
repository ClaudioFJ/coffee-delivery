import styled from 'styled-components'
import { mq } from '../../styles/breakpoints'
import { TextField } from '../TextField'

export const Fields = styled.div`
  display: grid;
  gap: 1rem 0.75rem;
  margin-top: 2rem;

  /* Layout do Figma a partir do tablet: CEP | Rua | Número + Complemento | Bairro + Cidade + UF */
  ${mq.md} {
    grid-template-columns: 12.5rem minmax(0, 1fr) 3.75rem;
    grid-template-areas:
      'cep . .'
      'street street street'
      'number complement complement'
      'neighborhood city uf';
  }
`

export const AreaField = styled(TextField)<{ $area: string }>`
  ${mq.md} {
    grid-area: ${({ $area }) => $area};
  }
`
