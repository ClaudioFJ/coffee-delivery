import styled from 'styled-components'
import { mq } from '../../styles/breakpoints'
import { typography } from '../../styles/typography'

export const Item = styled.li`
  display: grid;
  grid-template-columns: 4rem minmax(0, 1fr) auto;
  align-items: start;
  gap: 0.75rem 1.25rem;
  padding-block: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};

  &:first-child {
    padding-top: 0;
  }

  img {
    width: 4rem;
    height: 4rem;
  }
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const Name = styled.h3`
  ${typography.textM};
  font-family: ${({ theme }) => theme.fonts.text};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.subtitle};
`

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

export const RemoveButton = styled.button`
  ${typography.buttonM};
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  height: 2.75rem;
  padding-inline: 0.5rem;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.button};
  color: ${({ theme }) => theme.colors.text};
  transition: background-color 0.2s;

  svg {
    color: ${({ theme }) => theme.colors.accentIcon};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }

  ${mq.md} {
    height: 2rem;
  }
`

export const LinePrice = styled.p`
  ${typography.textM};
  font-weight: 700;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.text};
`
