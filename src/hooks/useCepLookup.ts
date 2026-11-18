import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchAddressByCep, type CepLookupResult } from '../services/viaCep'

export type CepStatus = 'idle' | 'loading' | 'success' | 'not-found' | 'error'

export const CEP_TIMEOUT_MS = 8000

// Gerencia a consulta de CEP: estado de carregamento, cancelamento da consulta
// anterior quando o CEP muda e limite de tempo de 8 s (TECH_SPEC §6.3).
export function useCepLookup() {
  const [status, setStatus] = useState<CepStatus>('idle')
  const controllerRef = useRef<AbortController | null>(null)

  // Cancela a consulta pendente se o componente sair da tela
  useEffect(() => () => controllerRef.current?.abort(), [])

  const lookup = useCallback(async (cep: string): Promise<CepLookupResult | null> => {
    controllerRef.current?.abort() // um CEP novo cancela a consulta anterior
    const controller = new AbortController()
    controllerRef.current = controller

    let timedOut = false
    const timer = setTimeout(() => {
      timedOut = true
      controller.abort()
    }, CEP_TIMEOUT_MS)

    setStatus('loading')
    try {
      const result = await fetchAddressByCep(cep, controller.signal)
      setStatus(result.status)
      return result
    } catch {
      // Cancelada por um CEP mais novo: ignora, a consulta nova é que vale
      if (controller.signal.aborted && !timedOut) return null
      setStatus('error') // sem internet, API fora do ar ou demorou demais
      return { status: 'error' }
    } finally {
      clearTimeout(timer)
    }
  }, [])

  // CEP apagado/incompleto: cancela a consulta pendente para que uma resposta
  // atrasada não preencha o endereço de um CEP que o usuário já mudou
  const reset = useCallback(() => {
    controllerRef.current?.abort()
    setStatus('idle')
  }, [])

  return { status, lookup, reset }
}
