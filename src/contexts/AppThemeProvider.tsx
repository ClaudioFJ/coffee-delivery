import { useCallback, useEffect, useMemo, type ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { usePrefersDarkScheme } from '../hooks/usePrefersDarkScheme'
import { GlobalStyle } from '../styles/global'
import { themes, type ThemeMode } from '../styles/themes'
import { STORAGE_KEYS } from '../utils/storage'
import { ThemeContext, type ThemeContextValue } from './ThemeContext'

function parseThemeMode(raw: unknown): ThemeMode | null {
  return raw === 'light' || raw === 'dark' ? raw : null
}

// Prioridade do tema [RF-14]: escolha salva → preferência do sistema → claro.
export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [savedMode, setSavedMode] = useLocalStorage<ThemeMode | null>(
    STORAGE_KEYS.theme,
    null,
    parseThemeMode,
  )
  const prefersDark = usePrefersDarkScheme()

  const mode: ThemeMode = savedMode ?? (prefersDark ? 'dark' : 'light')

  // Sincroniza o <html> com o tema: o atributo data-theme ajuda a depurar no DevTools
  // e a cor de fundo mantém o script anti-"flash" do index.html coerente após a troca.
  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = mode
    root.style.backgroundColor = themes[mode].colors.background
    root.style.colorScheme = mode
  }, [mode])

  const toggleTheme = useCallback(() => {
    setSavedMode(mode === 'dark' ? 'light' : 'dark')
  }, [mode, setSavedMode])

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, isUserChoice: savedMode !== null, toggleTheme }),
    [mode, savedMode, toggleTheme],
  )

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={themes[mode]}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
