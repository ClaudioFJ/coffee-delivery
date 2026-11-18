import 'styled-components'
import type { AppTheme } from './themes'

// Diz ao styled-components qual é o formato do tema. Assim,
// `theme.colors.primary` tem autocomplete e erro de digitação vira erro de tipo.
declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
