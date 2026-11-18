import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderApp } from './test-utils'

describe('rotas [RF-07]', () => {
  it.each([
    ['/', 'Encontre o café perfeito para qualquer hora do dia', 'Coffee Delivery'],
    ['/checkout', 'Complete seu pedido', 'Checkout · Coffee Delivery'],
    ['/success', 'Uhu! Pedido confirmado', 'Pedido confirmado · Coffee Delivery'],
    ['/rota-que-nao-existe', 'Página não encontrada', 'Página não encontrada · Coffee Delivery'],
  ])('em %s mostra o título da página e atualiza a aba', (path, heading, tabTitle) => {
    renderApp(path)

    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
    expect(document.title).toBe(tabTitle)
  })

  it('navega da Home para o Checkout pelo link, sem recarregar a página', async () => {
    const user = userEvent.setup()
    const { router } = renderApp('/')

    await user.click(screen.getByRole('link', { name: 'Carrinho vazio' }))

    expect(router.state.location.pathname).toBe('/checkout')
    expect(
      screen.getByRole('heading', { level: 1, name: 'Complete seu pedido' }),
    ).toBeInTheDocument()
  })
})
