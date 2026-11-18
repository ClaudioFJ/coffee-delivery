import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    /* faz barras de rolagem e controles nativos acompanharem o tema */
    color-scheme: ${({ theme }) => theme.mode};
  }

  html {
    -webkit-text-size-adjust: 100%;
  }

  html,
  body {
    /* evita rolagem horizontal causada por fundos que vazam até a borda da tela */
    overflow-x: clip;
  }

  body {
    min-height: 100dvh;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.text};
    font-size: 1rem;
    line-height: 1.3;
    -webkit-font-smoothing: antialiased;
    transition: background-color 0.2s, color 0.2s;
  }

  h1, h2, h3, h4 {
    color: ${({ theme }) => theme.colors.title};
    font-family: ${({ theme }) => theme.fonts.title};
  }

  img, svg {
    display: block;
    max-width: 100%;
  }

  input, button, select, textarea {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }

  a {
    color: inherit;
  }

  /* foco visível em toda a aplicação, só para navegação por teclado */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`
