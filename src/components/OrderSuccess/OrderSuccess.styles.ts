import styled, { css } from 'styled-components'
import { mq } from '../../styles/breakpoints'
import { typography } from '../../styles/typography'

export const Wrapper = styled.div`
  display: grid;
  gap: 2.5rem;
  padding-top: 1.5rem;

  ${mq.lg} {
    grid-template-columns: minmax(0, 32.875rem) minmax(0, 1fr);
    align-items: end;
    column-gap: 6.375rem;
    padding-top: 5rem;
  }
`

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  ${mq.lg} {
    grid-column: 1 / -1;
  }
`

export const Title = styled.h1`
  ${typography.titleL};
  color: ${({ theme }) => theme.colors.highlight};
`

export const Subtitle = styled.p`
  ${typography.textL};
  color: ${({ theme }) => theme.colors.subtitle};
`

/* Borda em degradê amarelo → roxo do Figma: um fundo degradê com 1px de "moldura" */
export const Card = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.5rem;
  border: 1px solid transparent;
  border-radius: 6px 36px;
  ${({ theme }) => css`
    background:
      linear-gradient(${theme.colors.background}, ${theme.colors.background}) padding-box,
      linear-gradient(135deg, ${theme.colors.iconYellow}, ${theme.colors.iconPurple}) border-box;
  `}

  ${mq.md} {
    padding: 2.5rem;
  }
`

export const Row = styled.li`
  ${typography.textM};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.colors.text};

  strong {
    font-weight: 700;
  }
`

export type IconColor = 'iconPurple' | 'iconYellow' | 'iconYellowDark'

export const IconCircle = styled.span<{ $color: IconColor }>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $color }) => theme.colors[$color]};
  color: ${({ theme }) => theme.colors.onIcon};
`

export const Illustration = styled.div`
  justify-self: center;
  width: min(100%, 18rem);

  img {
    width: 100%;
    height: auto;
  }

  ${mq.lg} {
    width: min(100%, 22rem);
  }
`
