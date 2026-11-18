import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { AppThemeProvider } from '../contexts/AppThemeProvider'
import { routes } from '../router'

// Renderiza a aplicação inteira (providers + rotas) começando em `path`,
// com um router em memória no lugar da barra de endereço do navegador.
export function renderApp(path = '/') {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  const result = render(
    <AppThemeProvider>
      <RouterProvider router={router} />
    </AppThemeProvider>,
  )
  return { router, ...result }
}

// Renderiza um componente isolado com o tema disponível (styled-components precisa dele).
export function renderWithTheme(ui: ReactElement) {
  return render(<AppThemeProvider>{ui}</AppThemeProvider>)
}
