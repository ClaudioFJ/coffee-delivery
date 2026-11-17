import { useEffect } from 'react'

const APP_NAME = 'Coffee Delivery'

// Atualiza o título da aba do navegador. Numa SPA o documento HTML não é
// recarregado ao trocar de rota, então o título precisa ser trocado aqui.
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${APP_NAME}` : APP_NAME
  }, [title])
}
