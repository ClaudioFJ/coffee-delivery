import styled from 'styled-components'
import { typography } from '../../styles/typography'

export const Section = styled.section`
  padding-top: 2rem;
`

export const Title = styled.h2`
  ${typography.titleL};
  color: ${({ theme }) => theme.colors.subtitle};
`

export const Grid = styled.ul`
  list-style: none;
  display: grid;
  /* quantas colunas couberem, cada uma com no mínimo 16rem (256px, largura do card no Figma) */
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 16rem), 1fr));
  gap: 2.5rem 2rem;
  margin-top: 3.375rem; /* espaço para a xícara que sai do topo do card */
`
