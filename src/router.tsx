import { createBrowserRouter, type RouteObject } from 'react-router'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

// Divisão de código por rota [RNF-03]: Checkout e Sucesso (com React Hook Form, Zod e
// o formulário) só são baixados quando o usuário vai para essas telas. A Home, que é a
// primeira tela, continua no pacote principal para abrir o mais rápido possível.
// Com `lazy`, o React Router baixa o código ANTES de trocar de tela, sem "piscar".
export const routes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    hydrateFallbackElement: <output>Carregando…</output>,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/checkout',
        lazy: async () => ({ Component: (await import('./pages/Checkout')).Checkout }),
      },
      {
        path: '/success',
        lazy: async () => ({ Component: (await import('./pages/Success')).Success }),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
