import { RouterProvider } from 'react-router'
import { ThemeProvider } from 'styled-components'
import { router } from './router'
import { GlobalStyle } from './styles/global'
import { lightTheme } from './styles/themes'

// Tema fixo no claro por enquanto. A troca entre claro e escuro chega na T-10.
export function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
