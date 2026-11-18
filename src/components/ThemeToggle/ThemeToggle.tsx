import { MoonIcon, SunIcon } from '@phosphor-icons/react'
import { useTheme } from '../../hooks/useTheme'
import { ToggleButton } from './ThemeToggle.styles'

export function ThemeToggle() {
  const { mode, toggleTheme } = useTheme()
  const isDark = mode === 'dark'

  // O nome acessível descreve a AÇÃO do botão, não o estado atual.
  const label = isDark ? 'Ativar tema claro' : 'Ativar tema escuro'

  return (
    <ToggleButton type="button" onClick={toggleTheme} aria-label={label} title={label}>
      {isDark ? (
        <SunIcon size={22} weight="fill" aria-hidden />
      ) : (
        <MoonIcon size={22} weight="fill" aria-hidden />
      )}
    </ToggleButton>
  )
}
