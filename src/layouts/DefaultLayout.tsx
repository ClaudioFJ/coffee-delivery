import { Link, Outlet } from 'react-router'
import { ThemeToggle } from '../components/ThemeToggle'

// Layout compartilhado por todas as páginas: o Header fica fixo e o
// conteúdo da rota atual é renderizado no lugar do <Outlet />.
// O Header definitivo (logo, localização e carrinho) chega na T-11.
export function DefaultLayout() {
  return (
    <>
      <header>
        <nav aria-label="Principal">
          <Link to="/">Coffee Delivery</Link> · <Link to="/checkout">Carrinho</Link>
        </nav>
        <ThemeToggle />
      </header>

      <main id="conteudo">
        <Outlet />
      </main>
    </>
  )
}
