import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CoffeeCard } from '../components/CoffeeCard'
import { QuantityInput } from '../components/QuantityInput'
import { coffees } from '../data/coffees'
import { renderApp, renderWithTheme } from './test-utils'

const latte = coffees.find((coffee) => coffee.id === 'latte')!

describe('QuantityInput [RF-02, RN-01]', () => {
  it('chama as funções de aumentar e diminuir', async () => {
    const user = userEvent.setup()
    const onIncrement = vi.fn()
    const onDecrement = vi.fn()
    renderWithTheme(
      <QuantityInput
        value={5}
        itemName="Latte"
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade de Latte' }))
    await user.click(screen.getByRole('button', { name: 'Diminuir quantidade de Latte' }))

    expect(onIncrement).toHaveBeenCalledOnce()
    expect(onDecrement).toHaveBeenCalledOnce()
  })

  it('desabilita "−" no mínimo (1) e "+" no máximo (99)', () => {
    const noop = () => {}
    const { rerender } = renderWithTheme(
      <QuantityInput value={1} itemName="Latte" onIncrement={noop} onDecrement={noop} />,
    )
    expect(screen.getByRole('button', { name: /diminuir/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /aumentar/i })).toBeEnabled()

    rerender(<QuantityInput value={99} itemName="Latte" onIncrement={noop} onDecrement={noop} />)
    expect(screen.getByRole('button', { name: /diminuir/i })).toBeEnabled()
    expect(screen.getByRole('button', { name: /aumentar/i })).toBeDisabled()
  })
})

describe('CoffeeCard [RF-01, RF-02, RF-03]', () => {
  it('mostra imagem, tags, nome, descrição e preço', () => {
    renderWithTheme(<CoffeeCard coffee={latte} onAddToCart={() => {}} />)
    const card = screen.getByRole('article', { name: 'Latte' })

    expect(within(card).getByRole('img', { name: 'Latte' })).toBeInTheDocument()
    expect(within(card).getByText('tradicional')).toBeInTheDocument()
    expect(within(card).getByText('com leite')).toBeInTheDocument()
    expect(within(card).getByText(latte.description)).toBeInTheDocument()
    expect(within(card).getByText('9,90')).toBeInTheDocument()
  })

  it('começa em 1, adiciona a quantidade escolhida e volta para 1', async () => {
    const user = userEvent.setup()
    const onAddToCart = vi.fn()
    renderWithTheme(<CoffeeCard coffee={latte} onAddToCart={onAddToCart} />)

    const increase = screen.getByRole('button', { name: 'Aumentar quantidade de Latte' })
    await user.click(increase)
    await user.click(increase)
    await user.click(screen.getByRole('button', { name: 'Adicionar 3 Latte ao carrinho' }))

    expect(onAddToCart).toHaveBeenCalledWith('latte', 3)
    expect(
      screen.getByRole('button', { name: 'Adicionar 1 Latte ao carrinho' }),
    ).toBeInTheDocument()
  })
})

describe('CoffeeCatalog na Home [RF-01]', () => {
  it('mostra a seção "Nossos cafés" com os 14 cards', () => {
    renderApp('/')
    const section = screen.getByRole('region', { name: 'Nossos cafés' })

    expect(within(section).getAllByRole('article')).toHaveLength(14)
  })
})
