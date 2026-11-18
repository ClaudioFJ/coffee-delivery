import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { STORAGE_KEYS } from '../utils/storage'
import { renderApp } from './test-utils'

const saveCart = (value: unknown) =>
  localStorage.setItem(STORAGE_KEYS.cart, typeof value === 'string' ? value : JSON.stringify(value))

describe('TC-19 · persistência do carrinho [RF-06]', () => {
  it('restaura o carrinho salvo ao abrir a página (como depois de um F5)', () => {
    saveCart({
      items: [
        { coffeeId: 'latte', quantity: 2 },
        { coffeeId: 'cubano', quantity: 1 },
      ],
    })
    renderApp('/')

    expect(screen.getByRole('link', { name: 'Carrinho, 3 itens' })).toBeInTheDocument()
  })

  it('salva o carrinho a cada alteração', async () => {
    const user = userEvent.setup()
    renderApp('/')

    await user.click(screen.getByRole('button', { name: 'Adicionar 1 Latte ao carrinho' }))

    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.cart)!)).toEqual({
      items: [{ coffeeId: 'latte', quantity: 1 }],
    })
  })

  it('descarta cafés que não existem e quantidades inválidas [RNF-04]', () => {
    saveCart({
      items: [
        { coffeeId: 'latte', quantity: 2 },
        { coffeeId: 'cafe-removido-do-catalogo', quantity: 5 },
        { coffeeId: 'cubano', quantity: -1 },
      ],
    })
    renderApp('/')

    expect(screen.getByRole('link', { name: 'Carrinho, 2 itens' })).toBeInTheDocument()
  })

  it('não quebra com JSON corrompido: começa vazio', () => {
    saveCart('{isso não é json')
    renderApp('/')

    expect(screen.getByRole('link', { name: 'Carrinho vazio' })).toBeInTheDocument()
  })
})
