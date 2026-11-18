import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-color-scheme: dark)'

// O tema do sistema operacional é um "estado externo" ao React.
// useSyncExternalStore assina as mudanças dele e re-renderiza quando o
// usuário troca o tema do sistema com a página aberta.
function subscribe(onChange: () => void) {
  if (typeof window.matchMedia !== 'function') return () => {}
  const media = window.matchMedia(QUERY)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

function getSnapshot() {
  return typeof window.matchMedia === 'function' && window.matchMedia(QUERY).matches
}

export function usePrefersDarkScheme(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
