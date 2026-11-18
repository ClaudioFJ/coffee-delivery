import { CompassIcon } from '@phosphor-icons/react'
import { EmptyState } from '../../components/EmptyState'
import { usePageTitle } from '../../hooks/usePageTitle'

export function NotFound() {
  usePageTitle('Página não encontrada')

  return (
    <EmptyState
      icon={<CompassIcon size={40} weight="fill" />}
      title="Página não encontrada"
      description="O endereço que você acessou não existe."
      actionLabel="Voltar para a página inicial"
      actionTo="/"
    />
  )
}
