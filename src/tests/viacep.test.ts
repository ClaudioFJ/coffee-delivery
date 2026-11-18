import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CEP_TIMEOUT_MS, useCepLookup } from '../hooks/useCepLookup'
import { fetchAddressByCep } from '../services/viaCep'

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

const viaCepOk = {
  cep: '90250-440',
  logradouro: 'Rua João Daniel Martinelli',
  bairro: 'Farrapos',
  localidade: 'Porto Alegre',
  uf: 'RS',
}

describe('TC-13 · serviço ViaCEP [RF-08]', () => {
  it('converte a resposta da API para o formato do app', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(json(viaCepOk))

    await expect(fetchAddressByCep('90250440')).resolves.toEqual({
      status: 'success',
      address: {
        street: 'Rua João Daniel Martinelli',
        neighborhood: 'Farrapos',
        city: 'Porto Alegre',
        uf: 'RS',
      },
    })
    expect(fetchMock).toHaveBeenCalledWith(
      'https://viacep.com.br/ws/90250440/json/',
      expect.anything(),
    )
  })

  it.each([{ erro: true }, { erro: 'true' }])('CEP inexistente (%o) → not-found', async (body) => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(json(body))
    await expect(fetchAddressByCep('00000000')).resolves.toEqual({ status: 'not-found' })
  })

  it('erro HTTP → error', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(json({}, 500))
    await expect(fetchAddressByCep('90250440')).resolves.toEqual({ status: 'error' })
  })

  it('resposta que não é objeto → error', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(json('texto'))
    await expect(fetchAddressByCep('90250440')).resolves.toEqual({ status: 'error' })
  })

  it('CEP geral de cidade (sem rua e bairro) devolve campos vazios', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      json({ cep: '95670-000', logradouro: '', bairro: '', localidade: 'Gramado', uf: 'RS' }),
    )
    const result = await fetchAddressByCep('95670000')
    expect(result).toEqual({
      status: 'success',
      address: { street: '', neighborhood: '', city: 'Gramado', uf: 'RS' },
    })
  })
})

describe('useCepLookup', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('passa por loading e termina em success', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(json(viaCepOk))
    const { result } = renderHook(() => useCepLookup())

    let promise!: Promise<unknown>
    act(() => {
      promise = result.current.lookup('90250440')
    })
    expect(result.current.status).toBe('loading')
    await act(() => promise)
    expect(result.current.status).toBe('success')
  })

  it('falha de rede (sem internet) → error', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Failed to fetch'))
    const { result } = renderHook(() => useCepLookup())

    await act(async () => {
      await expect(result.current.lookup('90250440')).resolves.toEqual({ status: 'error' })
    })
    expect(result.current.status).toBe('error')
  })

  it(`desiste depois de ${CEP_TIMEOUT_MS / 1000}s → error`, async () => {
    vi.useFakeTimers()
    // fetch que só termina quando é cancelado
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      (_url, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => reject(new DOMException('', 'AbortError')))
        }),
    )
    const { result } = renderHook(() => useCepLookup())

    let promise!: Promise<unknown>
    act(() => {
      promise = result.current.lookup('90250440')
    })
    await act(async () => {
      vi.advanceTimersByTime(CEP_TIMEOUT_MS)
      await promise
    })
    expect(result.current.status).toBe('error')
  })

  it('um CEP novo cancela a consulta anterior, que é ignorada', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')
    fetchMock.mockImplementationOnce(
      (_url, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => reject(new DOMException('', 'AbortError')))
        }),
    )
    fetchMock.mockResolvedValueOnce(json(viaCepOk))
    const { result } = renderHook(() => useCepLookup())

    let first!: Promise<unknown>
    let second!: Promise<unknown>
    act(() => {
      first = result.current.lookup('11111111')
    })
    act(() => {
      second = result.current.lookup('90250440')
    })

    await act(async () => {
      await expect(first).resolves.toBeNull()
      await second
    })
    expect(result.current.status).toBe('success')
  })
})
