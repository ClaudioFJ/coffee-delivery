import styled, { css } from 'styled-components'
import { mq } from '../../styles/breakpoints'
import { typography } from '../../styles/typography'

export const HeroSection = styled.section`
  position: relative;
  isolation: isolate;
  display: grid;
  gap: 2rem;
  padding-block: 2rem 3rem;

  /* Fundo desfocado do Figma: manchas amarelas e roxas que vazam até as bordas da tela */
  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    inset: 0 calc(50% - 50vw);
    background:
      radial-gradient(
        ellipse 40% 60% at 20% 40%,
        ${({ theme }) => theme.colors.primary}33,
        transparent 70%
      ),
      radial-gradient(
        ellipse 35% 55% at 80% 45%,
        ${({ theme }) => theme.colors.accentHover}26,
        transparent 70%
      ),
      radial-gradient(
        ellipse 30% 40% at 10% 90%,
        ${({ theme }) => theme.colors.accentHover}1f,
        transparent 70%
      );
    filter: blur(24px);
    opacity: ${({ theme }) => (theme.mode === 'dark' ? 0.6 : 1)};
  }

  ${mq.lg} {
    grid-template-columns: minmax(0, 1fr) minmax(0, 29.75rem);
    align-items: center;
    gap: 3.5rem;
    padding-block: 5.75rem;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Title = styled.h1`
  ${typography.titleXL};
  color: ${({ theme }) => theme.colors.title};
`

export const Subtitle = styled.p`
  ${typography.textL};
  color: ${({ theme }) => theme.colors.subtitle};
`

export const Benefits = styled.ul`
  list-style: none;
  display: grid;
  gap: 1.25rem 2.5rem;
  margin-top: 2rem;

  ${mq.sm} {
    grid-template-columns: repeat(2, minmax(0, max-content));
  }

  ${mq.lg} {
    margin-top: 3.125rem;
  }
`

export const Benefit = styled.li`
  ${typography.textM};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
`

export type IconColor = 'iconYellowDark' | 'iconNeutral' | 'iconYellow' | 'iconPurple'

export const IconCircle = styled.span<{ $color: IconColor }>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  ${({ theme, $color }) => css`
    background: ${theme.colors[$color]};
    color: ${theme.colors.onIcon};
  `}
`

export const Illustration = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: min(100%, 18rem);
  margin-inline: auto;

  /* Disco atrás do mascote, como a mancha atrás do copo no Figma */
  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    width: 88%;
    aspect-ratio: 1;
    border-radius: 50%;
    /* tom suave: o mascote é amarelo, então o disco não pode ser do mesmo amarelo */
    background: ${({ theme }) => theme.colors.tagBg};
  }

  img {
    width: 100%;
    height: auto;
  }

  ${mq.lg} {
    width: 100%;
    max-width: 22.5rem;
  }
`
