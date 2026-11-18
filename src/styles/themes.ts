import { accessible, dark, figma } from './tokens'

// Tudo que NÃO muda entre os temas: fontes, raios e larguras.
const base = {
  fonts: {
    title: "'Baloo 2', system-ui, sans-serif",
    text: "'Roboto', system-ui, sans-serif",
  },
  radii: {
    sm: '6px',
    md: '8px',
    // cantos assimétricos dos cards do Figma (6px / 36px)
    card: '6px 36px 6px 36px',
    pill: '999px',
  },
  layout: {
    maxWidth: '70rem', // 1120px
  },
} as const

// Nomes semânticos: descrevem o PAPEL da cor, não a cor em si.
// Os dois temas precisam ter exatamente as mesmas chaves (o TypeScript confere).
export interface ThemeColors {
  background: string
  surface: string
  input: string
  button: string
  hover: string
  divider: string
  inputBorder: string
  title: string
  subtitle: string
  text: string
  placeholder: string
  primary: string
  onPrimary: string
  primaryHover: string
  accentStrong: string
  onAccent: string
  accentHover: string
  accentIcon: string
  accentSoft: string
  onAccentSoft: string
  selectedBorder: string
  highlight: string
  tagBg: string
  tagText: string
  badgeBg: string
  badgeText: string
  focusRing: string
  danger: string
  success: string
  // círculos coloridos dos ícones do hero e da tela de sucesso (decorativos)
  iconYellowDark: string
  iconYellow: string
  iconPurple: string
  iconNeutral: string
  onIcon: string
}

export type ThemeMode = 'light' | 'dark'

export interface AppTheme {
  mode: ThemeMode
  colors: ThemeColors
  fonts: typeof base.fonts
  radii: typeof base.radii
  layout: typeof base.layout
}

export const lightTheme: AppTheme = {
  ...base,
  mode: 'light',
  colors: {
    background: figma.background,
    surface: figma.baseCard,
    input: figma.baseInput,
    button: figma.baseButton,
    hover: figma.baseHover,
    divider: figma.baseButton,
    inputBorder: figma.baseLabel,
    title: figma.baseTitle,
    subtitle: figma.baseSubtitle,
    text: figma.baseText,
    placeholder: accessible.placeholder,
    primary: figma.yellow,
    onPrimary: figma.baseTitle,
    primaryHover: figma.yellowDark,
    accentStrong: figma.purpleDark,
    onAccent: figma.white,
    accentHover: figma.purple,
    accentIcon: figma.purple,
    accentSoft: figma.purpleLight,
    onAccentSoft: figma.purpleDark,
    selectedBorder: figma.purple,
    highlight: figma.yellowDark,
    tagBg: figma.yellowLight,
    tagText: accessible.yellowDarker,
    badgeBg: accessible.yellowDarker,
    badgeText: figma.white,
    focusRing: figma.purple,
    danger: accessible.dangerLight,
    success: accessible.successLight,
    iconYellowDark: figma.yellowDark,
    iconYellow: figma.yellow,
    iconPurple: figma.purple,
    iconNeutral: figma.baseText,
    onIcon: figma.white,
  },
}

export const darkTheme: AppTheme = {
  ...base,
  mode: 'dark',
  colors: {
    background: dark.background,
    surface: dark.surface,
    input: dark.input,
    button: dark.button,
    hover: dark.hover,
    divider: dark.button,
    inputBorder: dark.inputBorder,
    title: dark.title,
    subtitle: dark.subtitle,
    text: dark.text,
    placeholder: dark.label,
    primary: figma.yellow,
    onPrimary: dark.background,
    primaryHover: dark.yellowBright,
    accentStrong: dark.purpleStrong,
    onAccent: figma.white,
    accentHover: figma.purple,
    accentIcon: dark.purplePale,
    accentSoft: dark.purpleSoft,
    onAccentSoft: dark.purpleText,
    selectedBorder: dark.purpleBright,
    highlight: dark.yellowBright,
    tagBg: dark.yellowSoft,
    tagText: dark.yellowBright,
    badgeBg: dark.yellowBright,
    badgeText: dark.background,
    focusRing: dark.purplePale,
    danger: dark.danger,
    success: dark.success,
    iconYellowDark: figma.yellowDark,
    iconYellow: figma.yellow,
    iconPurple: figma.purple,
    iconNeutral: dark.button,
    onIcon: figma.white,
  },
}

export const themes: Record<ThemeMode, AppTheme> = {
  light: lightTheme,
  dark: darkTheme,
}
