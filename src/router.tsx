import { createBrowserRouter, type RouteObject } from 'react-router'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Checkout } from './pages/Checkout'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Success } from './pages/Success'

// As rotas ficam separadas do router para que os testes possam
// reutilizá-las com um router em memória (createMemoryRouter).
export const routes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/success', element: <Success /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
