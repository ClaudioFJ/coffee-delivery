// Paleta bruta. Os componentes NUNCA usam estes valores diretamente:
// eles usam os nomes semânticos de themes.ts (theme.colors.*).

// Cores do Style Guide do Figma
export const figma = {
  yellowDark: '#C47F17',
  yellow: '#DBAC2C',
  yellowLight: '#F1E9C9',
  purpleDark: '#4B2995',
  purple: '#8047F8',
  purpleLight: '#EBE5F9',
  baseTitle: '#272221',
  baseSubtitle: '#403937',
  baseText: '#574F4D',
  baseLabel: '#8D8686',
  baseHover: '#D7D5D5',
  baseButton: '#E6E5E5',
  baseInput: '#EDEDED',
  baseCard: '#F3F2F2',
  background: '#FAFAFA',
  white: '#FFFFFF',
} as const

// Ajustes de acessibilidade (TECH_SPEC §8.2, marcados com ⚠)
export const accessible = {
  yellowDarker: '#8A5A10', // tags e contador: 4.86:1 sobre yellowLight
  placeholder: '#6E6766', // 4.73:1 sobre baseInput
  dangerLight: '#C0261C', // 5.07:1 sobre baseInput
  successLight: '#1E7B3A', // 4.54:1 sobre baseInput
} as const

// Tema escuro (derivado; não existe no Figma)
export const dark = {
  background: '#161312',
  surface: '#231F1E',
  input: '#2C2725',
  button: '#36302E',
  hover: '#443C39',
  inputBorder: '#7D7472',
  title: '#F5F2F0',
  subtitle: '#E8E3E0',
  text: '#D9D3D0',
  label: '#A8A09D',
  yellowBright: '#F1C95A',
  yellowSoft: '#3D3218',
  purpleStrong: '#6D3FE0',
  purpleBright: '#9A6BFF',
  purplePale: '#B794FF',
  purpleSoft: '#2E2448',
  purpleText: '#D4C2FF',
  danger: '#FF8A80',
  success: '#7DD891',
} as const
