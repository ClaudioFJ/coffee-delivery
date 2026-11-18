import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { saveLastOrder } from './fixtures'
import { renderApp } from './test-utils'

describe('TC-18 · tela de sucesso [RF-12, RN-09]', () => {
  it('sem pedido, mostra o estado vazio com caminho para a Home', async () => {
    renderApp('/success')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Nenhum pedido encontrado' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver cafés' })).toHaveAttribute('href', '/')
  })

  it('com pedido salvo, mostra endereço, previsão e pagamento (sobrevive ao F5)', async () => {
    saveLastOrder()
    renderApp('/success')

    const card = await screen.findByRole('list', { name: 'Resumo do pedido' })
    expect(card).toHaveTextContent('Entrega em Rua João Daniel Martinelli, 102')
    expect(card).toHaveTextContent('Farrapos - Porto Alegre, RS')
    expect(card).toHaveTextContent('Previsão de entrega20 min - 30 min')
    expect(card).toHaveTextContent('Pagamento na entregaCartão de Crédito')
  })

  it('pedido corrompido no storage é tratado como inexistente', async () => {
    saveLastOrder({ id: 1, items: 'quebrado' })
    renderApp('/success')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Nenhum pedido encontrado' }),
    ).toBeInTheDocument()
  })
})
