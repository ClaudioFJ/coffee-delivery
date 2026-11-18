import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { CartBadge } from '../components/CartBadge'
import { Header } from '../components/Header'
import { AppThemeProvider } from '../contexts/AppThemeProvider'
import { CartProvider } from '../contexts/CartProvider'
import type { CartState } from '../types/cart'
import { saveLastOrder } from './fixtures'
import { renderWithTheme } from './test-utils'

function renderHeader(cart?: CartState) {
  return render(
    <AppThemeProvider>
      <CartProvider initialState={cart}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </CartProvider>
    </AppThemeProvider>,
  )
}

describe('CartBadge [RF-04]', () => {
  it('não aparece com carrinho vazio', () => {
    const { container } = renderWithTheme(<CartBadge count={0} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('mostra a quantidade de unidades', () => {
    renderWithTheme(<CartBadge count={6} />)
    expect(screen.getByText('6')).toBeInTheDocument()
  })

  it('limita a exibição a 99+', () => {
    renderWithTheme(<CartBadge count={150} />)
    expect(screen.getByText('99+')).toBeInTheDocument()
  })
})

describe('Header', () => {
  it('tem link para a Home com o nome da marca', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: /coffee\s*delivery/i })).toHaveAttribute('href', '/')
  })

  it('anuncia o carrinho vazio e leva ao checkout', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: 'Carrinho vazio' })).toHaveAttribute(
      'href',
      '/checkout',
    )
  })

  it.each<[CartState, string]>([
    [{ items: [{ coffeeId: 'latte', quantity: 1 }] }, 'Carrinho, 1 item'],
    [
      {
        items: [
          { coffeeId: 'latte', quantity: 5 },
          { coffeeId: 'expresso-tradicional', quantity: 1 },
        ],
      },
      'Carrinho, 6 itens',
    ],
  ])('soma as unidades do carrinho no nome do link [RF-04]', (cart, name) => {
    renderHeader(cart)
    expect(screen.getByRole('link', { name })).toBeInTheDocument()
  })

  it('esconde a localização enquanto não há pedido (DP-07)', () => {
    renderHeader()
    expect(screen.queryByText(/entrega em/i)).not.toBeInTheDocument()
  })

  it('mostra a cidade do último pedido (DP-07)', () => {
    saveLastOrder()
    renderHeader()
    expect(screen.getByText(/entrega em/i).parentElement).toHaveTextContent(
      'Entrega em Porto Alegre, RS',
    )
  })

  it('troca o mascote conforme o tema', async () => {
    const user = userEvent.setup()
    const { container } = renderHeader()
    const mascot = () => container.querySelector('img')?.getAttribute('src') ?? ''

    expect(mascot()).toContain('mascot-light')
    await user.click(screen.getByRole('button', { name: 'Ativar tema escuro' }))
    expect(mascot()).toContain('mascot-dark')
  })
})
