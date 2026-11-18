import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { useCart } from '../hooks/useCart'
import { renderApp } from './test-utils'

describe('TC-14 · adicionar pelo catálogo atualiza o Header [RF-02, RF-03, RF-04]', () => {
  it('soma as unidades no contador, inclusive de cafés repetidos', async () => {
    const user = userEvent.setup()
    renderApp('/')

    // Latte × 3
    const increaseLatte = screen.getByRole('button', { name: 'Aumentar quantidade de Latte' })
    await user.click(increaseLatte)
    await user.click(increaseLatte)
    await user.click(screen.getByRole('button', { name: 'Adicionar 3 Latte ao carrinho' }))
    expect(screen.getByRole('link', { name: 'Carrinho, 3 itens' })).toBeInTheDocument()

    // + Expresso Tradicional × 1
    await user.click(
      screen.getByRole('button', { name: 'Adicionar 1 Expresso Tradicional ao carrinho' }),
    )
    expect(screen.getByRole('link', { name: 'Carrinho, 4 itens' })).toBeInTheDocument()

    // + Latte × 1 de novo
    await user.click(screen.getByRole('button', { name: 'Adicionar 1 Latte ao carrinho' }))
    expect(screen.getByRole('link', { name: 'Carrinho, 5 itens' })).toBeInTheDocument()
    expect(screen.getByText('Latte adicionado ao carrinho (1 unidade)')).toBeInTheDocument()
  })
})

describe('useCart', () => {
  it('avisa com erro claro se usado fora do CartProvider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {}) // o React loga o erro; silenciamos
    function Orphan() {
      useCart()
      return null
    }
    expect(() => render(<Orphan />)).toThrow('useCart precisa ser usado dentro de <CartProvider>')
  })
})
