import { Outlet, ScrollRestoration } from 'react-router'
import { Header } from '../components/Header'
import { useRouteFocus } from '../hooks/useRouteFocus'
import { Main, SkipLink } from './DefaultLayout.styles'

// Layout compartilhado por todas as páginas: o Header fica fixo e o
// conteúdo da rota atual é renderizado no lugar do <Outlet />.
export function DefaultLayout() {
  useRouteFocus()

  return (
    <>
      {/* Primeiro item do Tab: pula o Header e vai direto ao conteúdo */}
      <SkipLink href="#conteudo">Pular para o conteúdo</SkipLink>
      <Header />
      <Main id="conteudo" tabIndex={-1}>
        <Outlet />
      </Main>
      {/* volta ao topo ao trocar de página (e restaura a posição no "voltar") */}
      <ScrollRestoration />
    </>
  )
}
