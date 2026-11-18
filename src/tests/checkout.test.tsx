import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { STORAGE_KEYS } from '../utils/storage'
import { saveCart } from './fixtures'
import { renderApp } from './test-utils'

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

const viaCepOk = {
  cep: '90250-440',
  logradouro: 'Rua João Daniel Martinelli',
  bairro: 'Farrapos',
  localidade: 'Porto Alegre',
  uf: 'RS',
}

// Expresso ×1 + Latte ×2: o cenário do Figma
async function openCheckout() {
  saveCart([
    { coffeeId: 'expresso-tradicional', quantity: 1 },
    { coffeeId: 'latte', quantity: 2 },
  ])
  const user = userEvent.setup()
  const view = renderApp('/checkout')
  await screen.findByRole('heading', { level: 1, name: 'Complete seu pedido' })
  return { user, ...view }
}

const field = (name: string) => screen.getByLabelText(name)
const summary = () => screen.getByRole('region', { name: 'Cafés selecionados' })

describe('Checkout · itens e resumo [RF-05, RF-10]', () => {
  it('lista os itens e mostra subtotal, entrega e total', async () => {
    await openCheckout()

    expect(within(summary()).getAllByRole('listitem')).toHaveLength(2)
    expect(summary()).toHaveTextContent('Total de itensR$ 29,70')
    expect(summary()).toHaveTextContent('EntregaR$ 3,50')
    expect(summary()).toHaveTextContent('TotalR$ 33,20')
  })

  it('+ e − atualizam a linha, o total e o contador do Header', async () => {
    const { user } = await openCheckout()

    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade de Latte' }))
    expect(summary()).toHaveTextContent('TotalR$ 43,10')
    expect(screen.getByRole('link', { name: 'Carrinho, 4 itens' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Diminuir quantidade de Latte' }))
    expect(summary()).toHaveTextContent('TotalR$ 33,20')
  })

  it('"−" fica desabilitado em 1 (DP-01)', async () => {
    await openCheckout()
    expect(
      screen.getByRole('button', { name: 'Diminuir quantidade de Expresso Tradicional' }),
    ).toBeDisabled()
  })

  it('remover o último item mostra o carrinho vazio (FA-09)', async () => {
    const { user } = await openCheckout()

    await user.click(
      screen.getByRole('button', { name: 'Remover Expresso Tradicional do carrinho' }),
    )
    expect(within(summary()).getAllByRole('listitem')).toHaveLength(1)

    await user.click(screen.getByRole('button', { name: 'Remover Latte do carrinho' }))
    expect(
      screen.getByRole('heading', { level: 1, name: 'Seu carrinho está vazio' }),
    ).toBeInTheDocument()
  })
})

describe('TC-15 · preenchimento pelo CEP [RF-08]', () => {
  it('aplica a máscara, preenche rua, bairro, cidade e UF e foca o número', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(json(viaCepOk))
    const { user } = await openCheckout()

    await user.type(field('CEP'), '90250440')

    expect(field('CEP')).toHaveValue('90250-440')
    await waitFor(() => expect(field('Rua')).toHaveValue('Rua João Daniel Martinelli'))
    expect(field('Bairro')).toHaveValue('Farrapos')
    expect(field('Cidade')).toHaveValue('Porto Alegre')
    expect(field('UF')).toHaveValue('RS')
    expect(field('Número')).toHaveValue('')
    expect(field('Complemento (opcional)')).toHaveValue('')
    expect(field('Número')).toHaveFocus()
    expect(fetchMock).toHaveBeenCalledOnce()
  })

  it('CEP não encontrado mostra erro e deixa preencher à mão', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(json({ erro: 'true' }))
    const { user } = await openCheckout()

    await user.type(field('CEP'), '00000000')

    expect(await screen.findByText(/CEP não encontrado/)).toBeInTheDocument()
    expect(field('CEP')).toHaveAttribute('aria-invalid', 'true')
    expect(field('Rua')).toBeEnabled()
  })

  it('API fora do ar mostra erro e deixa preencher à mão', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Failed to fetch'))
    const { user } = await openCheckout()

    await user.type(field('CEP'), '90250440')

    expect(await screen.findByText(/Não foi possível consultar o CEP/)).toBeInTheDocument()
  })

  it('mostra "Buscando endereço…" e bloqueia o envio durante a consulta [RN-10]', async () => {
    let respond!: (response: Response) => void
    vi.spyOn(globalThis, 'fetch').mockReturnValue(new Promise((resolve) => (respond = resolve)))
    const { user } = await openCheckout()

    await user.type(field('CEP'), '90250440')

    expect(screen.getByText('Buscando endereço…')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Confirmar pedido' })).toBeDisabled()

    respond(json(viaCepOk))
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Confirmar pedido' })).toBeEnabled(),
    )
  })
})

describe('TC-16 · envio inválido [RF-11]', () => {
  it('não cria pedido, mostra os erros, anuncia a falha e foca o 1º campo inválido', async () => {
    const { user, router } = await openCheckout()

    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }))

    const alerts = await screen.findAllByRole('alert')
    expect(alerts.map((alert) => alert.textContent)).toContain(
      'Não foi possível confirmar o pedido. Corrija os campos destacados.',
    )
    expect(screen.getByText('Informe um CEP válido com 8 dígitos')).toBeInTheDocument()
    expect(screen.getByText('Informe o número')).toBeInTheDocument()
    expect(screen.getByText('Selecione uma forma de pagamento')).toBeInTheDocument()
    expect(field('CEP')).toHaveFocus()
    expect(router.state.location.pathname).toBe('/checkout')
    expect(localStorage.getItem(STORAGE_KEYS.lastOrder)).toBeNull()
  })
})

describe('TC-17 · fluxo completo [RF-12, RF-13]', () => {
  it('confirma, vai para o sucesso com os dados certos e esvazia o carrinho', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(json(viaCepOk))
    const { user, router } = await openCheckout()

    await user.type(field('CEP'), '90250440')
    await waitFor(() => expect(field('Número')).toHaveFocus())
    await user.keyboard('102')
    await user.type(field('Complemento (opcional)'), 'Apto 3')
    await user.click(screen.getByLabelText('Cartão de Débito'))
    await user.click(screen.getByRole('button', { name: 'Confirmar pedido' }))

    const title = await screen.findByRole('heading', { level: 1, name: 'Uhu! Pedido confirmado' })
    expect(router.state.location.pathname).toBe('/success')

    const card = screen.getByRole('list', { name: 'Resumo do pedido' })
    expect(card).toHaveTextContent('Entrega em Rua João Daniel Martinelli, 102 - Apto 3')
    expect(card).toHaveTextContent('Farrapos - Porto Alegre, RS')
    expect(card).toHaveTextContent('20 min - 30 min')
    expect(card).toHaveTextContent('Cartão de Débito')

    // carrinho vazio, pedido preservado, chip de localização no Header
    expect(screen.getByRole('link', { name: 'Carrinho vazio' })).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.cart)!)).toEqual({ items: [] })
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.lastOrder)!).totalInCents).toBe(3320)
    expect(screen.getByText(/entrega em/i, { selector: 'span' }).parentElement).toHaveTextContent(
      'Porto Alegre, RS',
    )
    expect(title).toHaveFocus()
  })
})

describe('CEP alterado durante a consulta', () => {
  it('apagar um dígito cancela a consulta: a resposta atrasada não preenche nada', async () => {
    let respond!: (response: Response) => void
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      (_url, init) =>
        new Promise((resolve, reject) => {
          respond = resolve
          init?.signal?.addEventListener('abort', () => reject(new DOMException('', 'AbortError')))
        }),
    )
    const { user } = await openCheckout()

    await user.type(field('CEP'), '90250440')
    await user.type(field('CEP'), '{Backspace}')
    respond(json(viaCepOk))

    await waitFor(() => expect(screen.queryByText('Buscando endereço…')).not.toBeInTheDocument())
    expect(field('Rua')).toHaveValue('')
    expect(screen.getByRole('button', { name: 'Confirmar pedido' })).toBeEnabled()
  })
})
