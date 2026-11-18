import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'
import { mockPrefersDark } from './matchMedia'

// Por padrão, simula um sistema em tema claro (cada teste pode sobrescrever).
beforeEach(() => {
  mockPrefersDark(false)
})

// Desmonta os componentes renderizados e limpa o localStorage entre os testes,
// para que um teste nunca dependa do que outro deixou para trás.
afterEach(() => {
  cleanup()
  localStorage.clear()
  vi.unstubAllGlobals()
})
