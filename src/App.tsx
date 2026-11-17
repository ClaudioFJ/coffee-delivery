import { RouterProvider } from 'react-router'
import { router } from './router'

// Os providers globais (tema e carrinho) vão envolver o RouterProvider
// a partir das tarefas T-10 e T-18.
export function App() {
  return <RouterProvider router={router} />
}
