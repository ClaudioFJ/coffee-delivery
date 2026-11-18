import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from './test-utils'

describe('Home · hero', () => {
  it('tem o título principal e o subtítulo', () => {
    renderApp('/')
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Encontre o café perfeito para qualquer hora do dia',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/você recebe seu café onde estiver/i)).toBeInTheDocument()
  })

  it('lista os 4 benefícios', () => {
    renderApp('/')
    const hero = screen.getByRole('region', { name: /encontre o café perfeito/i })
    const items = within(hero).getAllByRole('listitem')

    expect(items.map((item) => item.textContent)).toEqual([
      'Compra simples e segura',
      'Embalagem mantém o café intacto',
      'Entrega rápida e rastreada',
      'O café chega fresquinho até você',
    ])
  })
})
