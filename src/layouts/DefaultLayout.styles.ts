import styled from 'styled-components'
import { pageContainer, visuallyHidden } from '../styles/helpers'

export const SkipLink = styled.a`
  ${visuallyHidden};

  &:focus {
    position: fixed !important;
    top: 0.5rem;
    left: 0.5rem;
    z-index: 100;
    width: auto;
    height: auto;
    margin: 0;
    padding: 0.75rem 1rem;
    clip: auto;
    border-radius: ${({ theme }) => theme.radii.sm};
    background: ${({ theme }) => theme.colors.accentStrong};
    color: ${({ theme }) => theme.colors.onAccent};
  }
`

export const Main = styled.main`
  ${pageContainer};
  padding-bottom: 4rem;
`
