import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { CartBadge } from '../components/CartBadge'
import { Header } from '../components/Header'
import { AppThemeProvider } from '../contexts/AppThemeProvider'
import { renderWithTheme } from './test-utils'

function renderHeader(props: Parameters<typeof Header>[0] = {}) {
  return render(
    <AppThemeProvider>
      <MemoryRouter>
        <Header {...props} />
      </MemoryRouter>
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

  it.each([
    [1, 'Carrinho, 1 item'],
    [6, 'Carrinho, 6 itens'],
  ])('com %i unidade(s), o link se chama "%s"', (count, name) => {
    renderHeader({ cartCount: count })
    expect(screen.getByRole('link', { name })).toBeInTheDocument()
  })

  it('esconde a localização enquanto não há pedido (DP-07)', () => {
    renderHeader()
    expect(screen.queryByText(/entrega em/i)).not.toBeInTheDocument()
  })

  it('mostra a localização quando informada', () => {
    renderHeader({ location: { city: 'Porto Alegre', uf: 'RS' } })
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
