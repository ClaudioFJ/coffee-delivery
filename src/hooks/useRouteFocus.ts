import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

// Numa SPA, trocar de rota não recarrega a página, então o leitor de tela não percebe
// que a tela mudou. A cada navegação, movemos o foco para o <h1> da nova página [RNF-01].
export function useRouteFocus() {
  const { pathname } = useLocation()
  const previousPathname = useRef(pathname)

  useEffect(() => {
    if (previousPathname.current === pathname) return // carga inicial: não rouba o foco
    previousPathname.current = pathname

    const heading = document.querySelector<HTMLElement>('main h1')
    if (heading) {
      heading.tabIndex = -1 // permite foco por script sem entrar na ordem do Tab
      heading.focus({ preventScroll: true })
    }
  }, [pathname])
}
