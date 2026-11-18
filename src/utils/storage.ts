// Chaves versionadas (TECH_SPEC §6.1): se o formato mudar, troca-se o sufixo
// e dados antigos incompatíveis deixam de ser lidos.
export const STORAGE_KEYS = {
  cart: 'coffee-delivery:cart:v1',
  lastOrder: 'coffee-delivery:last-order:v1',
  theme: 'coffee-delivery:theme:v1',
} as const

// Lê e valida um valor salvo. `parse` recebe `unknown` (pode ser qualquer coisa,
// inclusive lixo) e devolve o valor tipado ou null se for inválido.
export function readStorage<T>(key: string, parse: (raw: unknown) => T | null): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return null
    return parse(JSON.parse(raw))
  } catch {
    // JSON corrompido, modo privado ou storage bloqueado: segue sem o valor salvo
    return null
  }
}

export function writeStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Cota cheia ou storage bloqueado: a aplicação continua funcionando sem salvar
  }
}
