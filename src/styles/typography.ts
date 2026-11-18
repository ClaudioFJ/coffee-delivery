import { css } from 'styled-components'
import { mq } from './breakpoints'

// Escala tipográfica do Style Guide (TECH_SPEC §8.3), em rem para respeitar o zoom.
// Uso: const Title = styled.h1` ${typography.titleXL} `
const title = css`
  font-family: ${({ theme }) => theme.fonts.title};
  line-height: 1.3;
`
const text = css`
  font-family: ${({ theme }) => theme.fonts.text};
  line-height: 1.3;
`

export const typography = {
  titleXL: css`
    ${title};
    font-size: 2rem;
    font-weight: 800;
    ${mq.lg} {
      font-size: 3rem;
    }
  `,
  titleL: css`
    ${title};
    font-size: 1.5rem;
    font-weight: 800;
    ${mq.lg} {
      font-size: 2rem;
    }
  `,
  titleM: css`
    ${title};
    font-size: 1.5rem;
    font-weight: 800;
  `,
  titleS: css`
    ${title};
    font-size: 1.25rem;
    font-weight: 700;
  `,
  titleXS: css`
    ${title};
    font-size: 1.125rem;
    font-weight: 700;
  `,
  textL: css`
    ${text};
    font-size: 1rem;
    ${mq.lg} {
      font-size: 1.25rem;
    }
  `,
  textM: css`
    ${text};
    font-size: 1rem;
  `,
  textS: css`
    ${text};
    font-size: 0.875rem;
  `,
  textXS: css`
    ${text};
    font-size: 0.75rem;
    font-weight: 700;
  `,
  tag: css`
    ${text};
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
  `,
  buttonG: css`
    ${text};
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.6;
    text-transform: uppercase;
  `,
  buttonM: css`
    ${text};
    font-size: 0.75rem;
    line-height: 1.6;
    text-transform: uppercase;
  `,
}
