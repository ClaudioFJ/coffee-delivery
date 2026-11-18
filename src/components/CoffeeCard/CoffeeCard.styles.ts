import styled from 'styled-components'
import { mq } from '../../styles/breakpoints'
import { typography } from '../../styles/typography'

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 0 1.25rem 1.25rem;
  border-radius: ${({ theme }) => theme.radii.card};
  background: ${({ theme }) => theme.colors.surface};
  text-align: center;

  img {
    width: 7.5rem;
    height: 7.5rem;
    margin-top: -1.25rem; /* a xícara "sai" do card, como no Figma */
  }
`

export const Tags = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25rem;
  margin-top: 0.75rem;
`

export const Name = styled.h3`
  ${typography.titleS};
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.subtitle};
`

export const Description = styled.p`
  ${typography.textS};
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  margin-top: auto;
  padding-top: 2rem;
`

export const Price = styled.p`
  ${typography.textS};
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  color: ${({ theme }) => theme.colors.text};

  strong {
    ${typography.titleM};
    color: ${({ theme }) => theme.colors.text};
  }
`

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.accentStrong};
  color: ${({ theme }) => theme.colors.onAccent};
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
  }

  ${mq.md} {
    width: 2.375rem;
    height: 2.375rem;
  }
`
