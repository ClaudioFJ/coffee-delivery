import { Link } from 'react-router'
import { usePageTitle } from '../../hooks/usePageTitle'

export function NotFound() {
  usePageTitle('Página não encontrada')

  return (
    <>
      <h1>Página não encontrada</h1>
      <p>O endereço que você acessou não existe.</p>
      <Link to="/">Voltar para a página inicial</Link>
    </>
  )
}
