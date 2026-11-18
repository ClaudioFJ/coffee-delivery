import { describe, expect, it } from 'vitest'
import { themes, type ThemeColors } from '../styles/themes'
import { contrastRatio } from './contrast'

// WCAG 2.2 AA: 4.5:1 para texto normal; 3:1 para texto grande (≥ 24px,
// ou ≥ 18.66px em negrito) e para componentes de interface (bordas, ícones, foco).
const TEXT = 4.5
const LARGE_OR_UI = 3

type Pair = [foreground: keyof ThemeColors, background: keyof ThemeColors, minimum: number]

const pairs: Pair[] = [
  ['text', 'background', TEXT],
  ['text', 'surface', TEXT],
  ['text', 'input', TEXT],
  ['text', 'button', TEXT],
  ['subtitle', 'surface', TEXT],
  ['title', 'background', TEXT],
  ['placeholder', 'input', TEXT],
  ['inputBorder', 'input', LARGE_OR_UI],
  ['onPrimary', 'primary', TEXT],
  ['onPrimary', 'primaryHover', TEXT],
  ['onAccent', 'accentStrong', LARGE_OR_UI],
  ['onAccent', 'accentHover', LARGE_OR_UI],
  ['accentIcon', 'button', LARGE_OR_UI],
  ['onAccentSoft', 'accentSoft', TEXT],
  ['selectedBorder', 'surface', LARGE_OR_UI],
  ['highlight', 'background', LARGE_OR_UI], // título grande da tela de sucesso
  ['tagText', 'tagBg', TEXT],
  ['badgeText', 'badgeBg', TEXT],
  ['focusRing', 'background', LARGE_OR_UI],
  ['focusRing', 'input', LARGE_OR_UI],
  ['danger', 'input', TEXT],
  ['danger', 'surface', TEXT],
  ['success', 'surface', TEXT],
]

describe.each(Object.values(themes))('tema $mode — contraste WCAG 2.2 AA [RNF-01]', (theme) => {
  it.each(pairs)('%s sobre %s ≥ %s:1', (foreground, background, minimum) => {
    const ratio = contrastRatio(theme.colors[foreground], theme.colors[background])
    expect(ratio).toBeGreaterThanOrEqual(minimum)
  })
})

describe('temas', () => {
  it('claro e escuro têm exatamente os mesmos tokens de cor', () => {
    expect(Object.keys(themes.dark.colors).sort()).toEqual(Object.keys(themes.light.colors).sort())
  })
})
