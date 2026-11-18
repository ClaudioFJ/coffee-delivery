import { vi } from 'vitest'

// O jsdom não implementa window.matchMedia. Este mock simula a preferência
// de tema do sistema e permite disparar a troca durante o teste.
export function mockPrefersDark(initial: boolean) {
  let matches = initial
  const listeners = new Set<() => void>()

  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      get matches() {
        return query === '(prefers-color-scheme: dark)' && matches
      },
      media: query,
      addEventListener: (_: string, listener: () => void) => listeners.add(listener),
      removeEventListener: (_: string, listener: () => void) => listeners.delete(listener),
    })),
  )

  return {
    change(next: boolean) {
      matches = next
      listeners.forEach((listener) => listener())
    },
  }
}
