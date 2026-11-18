import { RouterProvider } from 'react-router'
import { AppThemeProvider } from './contexts/AppThemeProvider'
import { CartProvider } from './contexts/CartProvider'
import { router } from './router'

export function App() {
  return (
    <AppThemeProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AppThemeProvider>
  )
}
