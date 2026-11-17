import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'

// Teste de fumaça: só confirma que o ambiente de testes funciona
// (Vitest + jsdom + Testing Library + user-event + jest-dom).
function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button type="button" onClick={() => setCount((c) => c + 1)}>
      Cliques: {count}
    </button>
  )
}

describe('ambiente de testes', () => {
  it('renderiza um componente e reage a um clique', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    const button = screen.getByRole('button', { name: 'Cliques: 0' })
    await user.click(button)

    expect(button).toHaveTextContent('Cliques: 1')
  })

  it('tem localStorage disponível', () => {
    localStorage.setItem('chave', 'valor')
    expect(localStorage.getItem('chave')).toBe('valor')
  })
})
