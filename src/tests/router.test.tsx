import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { saveCart, saveLastOrder } from './fixtures'
import { renderApp } from './test-utils'

// findBy espera a tela aparecer: Checkout e Sucesso são carregados sob demanda (lazy)
const h1 = (name: string) => screen.findByRole('heading', { level: 1, name })

describe('rotas [RF-07]', () => {
  it.each([
    ['/', 'Encontre o café perfeito para qualquer hora do dia', 'Coffee Delivery'],
    ['/checkout', 'Seu carrinho está vazio', 'Checkout · Coffee Delivery'],
    ['/success', 'Nenhum pedido encontrado', 'Nenhum pedido · Coffee Delivery'],
    ['/rota-que-nao-existe', 'Página não encontrada', 'Página não encontrada · Coffee Delivery'],
  ])('em %s (sem carrinho e sem pedido) mostra "%s"', async (path, heading, tabTitle) => {
    renderApp(path)

    expect(await h1(heading)).toBeInTheDocument()
    expect(document.title).toBe(tabTitle)
  })

  it('/checkout com itens mostra o formulário', async () => {
    saveCart([{ coffeeId: 'latte', quantity: 1 }])
    renderApp('/checkout')
    expect(await h1('Complete seu pedido')).toBeInTheDocument()
  })

  it('/success com pedido salvo mostra a confirmação', async () => {
    saveLastOrder()
    renderApp('/success')
    expect(await h1('Uhu! Pedido confirmado')).toBeInTheDocument()
    expect(document.title).toBe('Pedido confirmado · Coffee Delivery')
  })

  it('navega pelo link sem recarregar e move o foco para o título da nova página [RNF-01]', async () => {
    const user = userEvent.setup()
    const { router } = renderApp('/')

    await user.click(screen.getByRole('link', { name: 'Carrinho vazio' }))

    const heading = await h1('Seu carrinho está vazio')
    expect(router.state.location.pathname).toBe('/checkout')
    expect(heading).toHaveFocus()
  })
})
