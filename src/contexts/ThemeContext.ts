import { createContext } from 'react'
import type { ThemeMode } from '../styles/themes'

export interface ThemeContextValue {
  mode: ThemeMode
  // true quando o tema veio de um clique do usuário; false quando segue o sistema
  isUserChoice: boolean
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
