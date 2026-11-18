// Consulta à API pública ViaCEP [RF-08, RN-07]. Documentação: https://viacep.com.br
export interface CepAddress {
  street: string
  neighborhood: string
  city: string
  uf: string
}

export type CepLookupResult =
  { status: 'success'; address: CepAddress } | { status: 'not-found' } | { status: 'error' }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

// Não captura erros de rede nem cancelamentos: quem chama (useCepLookup) decide
// se é uma falha de verdade ou só uma consulta antiga que foi cancelada.
export async function fetchAddressByCep(
  cep: string,
  signal?: AbortSignal,
): Promise<CepLookupResult> {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal })
  if (!response.ok) return { status: 'error' }

  const data: unknown = await response.json()
  if (!isRecord(data)) return { status: 'error' }

  // O ViaCEP responde 200 com { "erro": true } (ou "true") quando o CEP não existe
  if (data.erro === true || data.erro === 'true') return { status: 'not-found' }

  return {
    status: 'success',
    address: {
      street: text(data.logradouro),
      neighborhood: text(data.bairro),
      city: text(data.localidade),
      uf: text(data.uf),
    },
  }
}
