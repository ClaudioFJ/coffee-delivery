import { Link } from 'react-router'
import styled from 'styled-components'
import { mq } from '../../styles/breakpoints'
import { pageContainer } from '../../styles/helpers'

export const HeaderBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${({ theme }) => theme.colors.background};
`

export const HeaderContent = styled.div`
  ${pageContainer};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-block: 1rem;

  ${mq.lg} {
    padding-block: 2rem;
  }
`

export const BrandLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  text-decoration: none;

  img {
    width: 2.75rem;
    height: 2.75rem;
  }
`

export const Wordmark = styled.span`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.title};
  line-height: 1;
  color: ${({ theme }) => theme.colors.title};

  strong {
    font-size: 1.25rem;
    font-weight: 800;
  }

  span {
    font-size: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }
`

export const Actions = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${mq.md} {
    gap: 0.75rem;
  }
`

export const CartLink = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.tagBg};
  color: ${({ theme }) => theme.colors.tagText};
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.95);
  }

  ${mq.md} {
    width: 2.375rem;
    height: 2.375rem;
  }
`
