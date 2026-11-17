import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Desmonta os componentes renderizados e limpa o localStorage entre os testes,
// para que um teste nunca dependa do que outro deixou para trás.
afterEach(() => {
  cleanup()
  localStorage.clear()
})
