import { RouterProvider } from 'react-router'
import { AppThemeProvider } from './contexts/AppThemeProvider'
import { router } from './router'

export function App() {
  return (
    <AppThemeProvider>
      <RouterProvider router={router} />
    </AppThemeProvider>
  )
}
