# TASKS_SPEC — Plano de implementação

> Projeto Final 05 — Coffee Delivery · Versão 1.0 · Última atualização: 17/11/2026
>
> Requisitos em [`PRD_SPEC.md`](./PRD_SPEC.md) · decisões técnicas em [`TECH_SPEC.md`](./TECH_SPEC.md) · regras do assistente em [`../AGENTS.md`](../AGENTS.md)

## Como usar este documento

- As tarefas estão **em ordem de execução**. Só começar uma tarefa quando as dependências estiverem concluídas.
- Cada tarefa deve caber em **um commit semântico** (às vezes dois). Se crescer demais, divida em subtarefas (ex.: `T-14a`, `T-14b`).
- Ao concluir uma tarefa:
  1. Conferir o critério de pronto.
  2. Rodar `npm run typecheck`, `npm run lint` e `npm run test:run` (a partir da T-06).
  3. Marcar `[x]`, trocar o status para ✅ e preencher **Teste realizado** e **Commit**.
  4. Se usou IA de forma relevante, registrar em `docs/AI_USAGE.md`.
- Status: ⬜ pendente · 🔄 em andamento · ✅ concluída · ⏸ bloqueada

---

## Fase 1 — Planejamento

### [x] T-01 · Escrever o PRD_SPEC
| Campo | Valor |
| --- | --- |
| Objetivo | Definir produto, escopo, fluxos, RF-01..16, RN-01..10, RNF e decisões |
| Requisitos | Todos |
| Arquivos | `docs/PRD_SPEC.md` |
| Critério de pronto | Documento revisado e aprovado pelo aluno; decisões DP-01..DP-10 registradas |
| Status | ✅ |
| Teste realizado | Revisão manual contra o enunciado (seções 3 e 7) |
| Commit | `docs: add product requirements spec` |

### [x] T-02 · Escrever o TECH_SPEC
| Campo | Valor |
| --- | --- |
| Objetivo | Stack, arquitetura, tipos, reducer, rotas, schema, tokens, testes |
| Requisitos | Todos |
| Arquivos | `docs/TECH_SPEC.md` |
| Critério de pronto | Os 10 itens exigidos pelo enunciado presentes; tabela de rastreabilidade completa |
| Status | ✅ |
| Teste realizado | Revisão manual; contrastes dos tokens calculados |
| Commit | `docs: add technical spec` |

### [x] T-03 · Escrever o TASKS_SPEC e o AGENTS.md
| Campo | Valor |
| --- | --- |
| Objetivo | Plano de tarefas e regras para o assistente de IA |
| Requisitos | — |
| Arquivos | `docs/TASKS_SPEC.md`, `AGENTS.md`, `docs/AI_USAGE.md` |
| Critério de pronto | Todas as tarefas com ID, objetivo, requisitos, arquivos, critério e status |
| Status | ✅ |
| Teste realizado | Revisão manual |
| Commit | `docs: add tasks plan, agent guidelines and AI usage log` |

---

## Fase 2 — Configuração

### [x] T-04 · Criar o projeto e o repositório
| Campo | Valor |
| --- | --- |
| Objetivo | Projeto Vite `react-ts` rodando, versionado no GitHub |
| Requisitos | RF-07 (base), RNF-07 |
| Arquivos | `package.json`, `vite.config.ts`, `tsconfig*.json`, `.gitignore`, `index.html`, `README.md` (esqueleto) |
| Critério de pronto | `npm run dev` abre a página; `tsconfig` com `strict: true`; repositório público no GitHub com os `docs/` |
| Status | ✅ |
| Teste realizado | `npm run dev` abriu a página inicial do Vite; push para o GitHub conferido |
| Commit | `chore: scaffold vite react-ts project` |

### [x] T-05 · Instalar dependências e ferramentas de qualidade
| Campo | Valor |
| --- | --- |
| Objetivo | Bibliotecas do TECH_SPEC §1, oxlint, Prettier e scripts |
| Requisitos | RNF-07 |
| Arquivos | `package.json`, `.oxlintrc.json`, `.prettierrc.json`, `tsconfig.app.json` |
| Critério de pronto | Scripts `dev`, `build`, `preview`, `lint`, `typecheck`, `format`, `format:check` funcionando sem erros (os scripts de teste entram na T-06); decisões DT-01..DT-04 registradas no TECH_SPEC |
| Status | ✅ |
| Teste realizado | `format`, `typecheck`, `lint` e `build` sem erros |
| Commit | `chore: add dependencies, lint and format config` |

### [x] T-06 · Configurar Vitest e Testing Library
| Campo | Valor |
| --- | --- |
| Objetivo | Ambiente de testes pronto, com um teste de exemplo passando |
| Requisitos | — (habilita os testes de todas as tarefas) |
| Arquivos | `vite.config.ts` (bloco `test`), `src/tests/setup.ts`, `src/tests/smoke.test.tsx`, `package.json` (scripts `test`, `test:run`, `coverage`), `.gitignore` (`coverage`) |
| Critério de pronto | `npm run test:run` verde; `jest-dom` disponível e tipado nos testes; `npm run coverage` gera relatório; `typecheck`, `lint` e `build` continuam passando |
| Status | ✅ |
| Teste realizado | `smoke.test.tsx`: 2 testes passando; `typecheck` e `lint` sem erros |
| Commit | `test: configure vitest and testing library` |

### [x] T-07 · Estrutura de pastas, rotas e layout
| Campo | Valor |
| --- | --- |
| Objetivo | Pastas do TECH_SPEC §3, router com 4 rotas e `DefaultLayout` com Header provisório |
| Requisitos | RF-07 |
| Arquivos | `src/main.tsx`, `src/App.tsx`, `src/router.tsx`, `src/layouts/DefaultLayout.tsx`, `src/pages/*/`, `src/hooks/usePageTitle.ts`, `src/tests/router.test.tsx`, `index.html` (`lang="pt-BR"`), `vercel.json`; remoção dos arquivos de exemplo do template |
| Critério de pronto | Navegar entre `/`, `/checkout`, `/success` e uma rota inexistente sem recarregar; `<title>` muda por página; F5 em `/checkout` funciona no `npm run preview`. As demais pastas do TECH_SPEC §3 são criadas junto com o primeiro arquivo de cada uma (o Git não versiona pastas vazias) |
| Status | ✅ |
| Teste realizado | `router.test.tsx`: 5 testes (4 rotas + navegação por link) |
| Commit | `feat: add routes and default layout` |

---

## Fase 3 — Branding e tema base

### [x] T-08 · Criar a logo com IA
| Campo | Valor |
| --- | --- |
| Objetivo | Gerar propostas de logo, escolher uma e preparar as versões |
| Requisitos | RF-16 |
| Arquivos | `src/assets/brand/mascot-light.png`, `mascot-dark.png`, `public/favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `index.html`, `docs/BRANDING.md`, `docs/branding/` (original, símbolo, testes de tamanho) |
| Critério de pronto | Versões para fundo claro e escuro; favicon legível em 16 px e 32 px; `BRANDING.md` com ferramenta, prompt, ajustes e termos de uso conferidos |
| Status | ✅ |
| Teste realizado | Legibilidade em 16–200 px nos fundos claro e escuro (`docs/branding/teste-*.png`); favicon conferido na aba |
| Commit | `feat: add AI-generated brand assets` |

### [x] T-09 · Tokens, temas e estilos globais
| Campo | Valor |
| --- | --- |
| Objetivo | `tokens.ts`, `themes.ts` (claro e escuro), `breakpoints.ts`, `GlobalStyle`, `styled.d.ts`, fontes |
| Requisitos | RF-14, RF-15, RNF-01 |
| Arquivos | `src/styles/tokens.ts`, `themes.ts`, `breakpoints.ts`, `typography.ts`, `global.ts`, `styled.d.ts`, `src/App.tsx` (ThemeProvider com tema claro fixo), `index.html` (Google Fonts), `src/tests/contrast.ts`, `src/tests/themes.test.ts` |
| Critério de pronto | Tokens do TECH_SPEC §8.2 implementados; cores `danger`/`success` definidas com contraste verificado e documentadas no TECH_SPEC; nenhum hex fora de `styles/` |
| Status | ✅ |
| Teste realizado | `themes.test.ts`: 46 verificações de contraste WCAG (23 pares × 2 temas) + paridade de tokens |
| Commit | `style: add design tokens and light/dark themes` |

### [x] T-10 · ThemeContext e ThemeToggle
| Campo | Valor |
| --- | --- |
| Objetivo | Alternar tema, persistir e respeitar `prefers-color-scheme` |
| Requisitos | RF-14 |
| Arquivos | `src/utils/storage.ts`, `src/hooks/useLocalStorage.ts`, `usePrefersDarkScheme.ts`, `useTheme.ts`, `src/contexts/ThemeContext.ts`, `AppThemeProvider.tsx`, `src/components/ThemeToggle/*`, `src/App.tsx`, `src/layouts/DefaultLayout.tsx`, script no `index.html`, `src/tests/matchMedia.ts`, `test-utils.tsx`, `theme.test.tsx` |
| Critério de pronto | Toggle troca o tema; F5 mantém; sem escolha salva segue o sistema; sem "flash" branco no escuro |
| Status | ✅ |
| Teste realizado | TC-20 (`theme.test.tsx`, 7 testes); conferido em Chrome real: troca, persistência após F5 e ausência de flash |
| Commit | `feat: add theme context and toggle` |

### [x] T-11 · Header
| Campo | Valor |
| --- | --- |
| Objetivo | Header com logo, `LocationChip`, `ThemeToggle` e botão do carrinho com `CartBadge` (contador fixo por enquanto) |
| Requisitos | RF-04 (visual), RF-14, RF-16, DP-07 |
| Arquivos | `src/components/Header/*`, `CartBadge/*`, `LocationChip/*`, `VisuallyHidden/*`, `src/styles/helpers.ts`, `src/layouts/DefaultLayout.*` (skip link e container), `src/tests/header.test.tsx` |
| Critério de pronto | Fiel ao Figma no desktop; adaptado no celular (chip mostra só a UF abaixo de 480 px; sem rolagem horizontal em 320 px); mascote troca com o tema; carrinho leva a `/checkout` com nome acessível que inclui a quantidade; contador mostra "99+" acima de 99 |
| Status | ✅ |
| Teste realizado | `header.test.tsx` (10 testes); prints em 1280, 375 e 320 px nos dois temas, sem rolagem horizontal |
| Commit | `feat: add header with brand, theme toggle and cart button` |

---

## Fase 4 — Home e catálogo

### [x] T-12 · Tipos e dados do catálogo
| Campo | Valor |
| --- | --- |
| Objetivo | Tipos do domínio e os 14 cafés tipados |
| Requisitos | RF-01, RN-04, RN-08 |
| Arquivos | `src/types/coffee.ts`, `cart.ts`, `order.ts`, `src/data/coffees.ts`, `src/utils/constants.ts`, `src/tests/catalog.test.ts` |
| Critério de pronto | 14 cafés com id, nome, descrição, tags, `priceInCents: 990` e imagem; sem `any` |
| Status | ✅ |
| Teste realizado | `catalog.test.ts`: 16 testes (14 cafés, ids únicos, campos válidos) |
| Commit | `feat: add domain types and coffee catalog data` |

### [x] T-13 · Utilitários de dinheiro e carrinho
| Campo | Valor |
| --- | --- |
| Objetivo | `formatBRL`, `formatPriceValue`, `countUnits`, `resolveCartItems`, `calcSubtotal`, `calcDeliveryFee`, `calcTotal`, `sanitizeCart` |
| Requisitos | RF-04, RF-10, RN-03, RN-04, RNF-04 |
| Arquivos | `src/utils/money.ts`, `src/utils/cart.ts`, `src/tests/money.test.ts`, `src/tests/cart-utils.test.ts` |
| Critério de pronto | Funções puras com testes passando |
| Status | ✅ |
| Teste realizado | TC-07, TC-08, TC-09, TC-10 (`money.test.ts`, `cart-utils.test.ts`: 21 testes) |
| Commit | `feat: add money formatting and cart calculation utils` |

### [x] T-14 · Hero da Home
| Campo | Valor |
| --- | --- |
| Objetivo | Título, subtítulo, 4 benefícios com ícones e imagem |
| Requisitos | RF-15 |
| Arquivos | `src/pages/Home/Home.tsx`, `Hero.tsx`, `Hero.styles.ts`, `src/assets/illustrations/hero-cup.webp`, `src/styles/global.ts` (`overflow-x: clip`), `src/tests/hero.test.tsx` |
| Critério de pronto | Fiel ao Figma no desktop; imagem abaixo do texto no celular; fundo desfocado funciona nos dois temas |
| Status | ✅ |
| Teste realizado | `hero.test.tsx` (2 testes); prints em 1440, 768, 375 e 320 px nos dois temas, sem rolagem horizontal |
| Commit | `feat: add home hero section` |

### [x] T-15 · QuantityInput, Tag e CoffeeCard
| Campo | Valor |
| --- | --- |
| Objetivo | Componentes do card com estado local de quantidade |
| Requisitos | RF-01, RF-02, RN-01 |
| Arquivos | `src/components/QuantityInput/*`, `Tag/*`, `CoffeeCard/*`, `src/tests/test-utils.tsx`, `src/tests/catalog-ui.test.tsx` |
| Critério de pronto | "−" desabilitado em 1 e "+" em 99; nomes acessíveis; alvos de toque ≥ 44 px |
| Status | ✅ |
| Teste realizado | `catalog-ui.test.tsx`: QuantityInput (limites 1 e 99) e CoffeeCard (adiciona e volta para 1) |
| Commit | `feat: add quantity input and coffee card` |

### [x] T-16 · CoffeeCatalog responsivo
| Campo | Valor |
| --- | --- |
| Objetivo | Seção "Nossos cafés" com grid adaptável |
| Requisitos | RF-01, RF-15 |
| Arquivos | `src/components/CoffeeCatalog/*`, `src/pages/Home/Home.tsx`, `src/styles/helpers.ts` (largura útil de 1120 px) |
| Critério de pronto | 14 cards; 1 coluna em 320 px e 4 em 1280 px; sem rolagem horizontal |
| Status | ✅ |
| Teste realizado | `catalog-ui.test.tsx`: 14 cards na seção "Nossos cafés"; prints: 4 colunas em 1440 px, 1 coluna em 375 e 320 px |
| Commit | `feat: add responsive coffee catalog` |

---

## Fase 5 — Carrinho

### [x] T-17 · Reducer do carrinho
| Campo | Valor |
| --- | --- |
| Objetivo | Ações e reducer puro conforme TECH_SPEC §5 |
| Requisitos | RF-03, RF-05, RN-01, RN-02 |
| Arquivos | `src/reducers/cart/actions.ts`, `reducer.ts`, `src/tests/cart-reducer.test.ts` |
| Critério de pronto | Todos os testes do reducer passando, incluindo o de não-mutação |
| Status | ✅ |
| Teste realizado | TC-01 a TC-06 (`cart-reducer.test.ts`: 16 testes, incluindo imutabilidade com `Object.freeze`) |
| Commit | `feat: add cart reducer and actions` |

### [x] T-18 · CartContext e useCart
| Campo | Valor |
| --- | --- |
| Objetivo | Provider com valores derivados e funções do carrinho |
| Requisitos | RF-03, RF-04, RF-05 |
| Arquivos | `src/contexts/CartContext.ts`, `CartProvider.tsx`, `src/hooks/useCart.ts`, `src/App.tsx`, `src/components/Header/Header.tsx`, `src/pages/Home/Home.tsx` (anúncio acessível), `src/tests/test-utils.tsx`, `header.test.tsx`, `cart-context.test.tsx` |
| Critério de pronto | Adicionar pelo card atualiza o badge do Header; `useCart` fora do Provider gera erro claro |
| Status | ✅ |
| Teste realizado | TC-14 (`cart-context.test.tsx`); Header lendo `totalUnits`; conferido no Chrome |
| Commit | `feat: add cart context and connect catalog and header` |

### [x] T-19 · Persistência do carrinho
| Campo | Valor |
| --- | --- |
| Objetivo | Carregar e salvar o carrinho no `localStorage` com sanitização |
| Requisitos | RF-06, RNF-04 |
| Arquivos | `src/contexts/CartProvider.tsx`, `src/tests/cart-persistence.test.tsx` |
| Critério de pronto | F5 mantém o carrinho; JSON corrompido no storage não quebra a aplicação |
| Status | ✅ |
| Teste realizado | TC-19 (`cart-persistence.test.tsx`: 4 testes); F5 conferido no Chrome |
| Commit | `feat: persist cart in local storage` |

---

## Fase 6 — Checkout

### [x] T-20 · Layout do Checkout, CartItem e CartSummary
| Campo | Valor |
| --- | --- |
| Objetivo | Coluna "Cafés selecionados" funcional e estado vazio |
| Requisitos | RF-05, RF-10, RN-09 |
| Arquivos | `src/components/CartItem/*`, `CartSummary/*`, `EmptyState/*`, `PanelHeader/*`, `src/pages/Checkout/Checkout.tsx`, `Checkout.styles.ts`, `src/pages/NotFound/NotFound.tsx` |
| Critério de pronto | +, − e Remover funcionam; valores batem com TC-08; carrinho vazio mostra `EmptyState` |
| Status | ✅ |
| Teste realizado | `checkout.test.tsx` (itens e resumo, +/−, "−" desabilitado em 1, remover até o estado vazio) e `router.test.tsx` (estado vazio) |
| Commit | `feat: add checkout cart list, summary and empty state` |

### [x] T-21 · Schema Zod e TextField
| Campo | Valor |
| --- | --- |
| Objetivo | Schema do checkout e campo de texto acessível |
| Requisitos | RF-08, RF-09, RN-07 |
| Arquivos | `src/schemas/checkoutSchema.ts`, `src/utils/cep.ts`, `src/components/TextField/*`, `src/types/order.ts` (`PAYMENT_METHODS`) |
| Critério de pronto | Testes do schema passando; `TextField` com label, erro e `aria-*` |
| Status | ✅ |
| Teste realizado | TC-11, TC-12 (`checkout-schema.test.ts`: 22 testes, incluindo a máscara de CEP) |
| Commit | `feat: add checkout schema and accessible text field` |

### [x] T-22 · Formulário de endereço
| Campo | Valor |
| --- | --- |
| Objetivo | `DeliveryAddressForm` com RHF + máscara de CEP |
| Requisitos | RF-08, RN-07, RF-15 |
| Arquivos | `src/components/DeliveryAddressForm/*`, `src/pages/Checkout/CheckoutForm.tsx` |
| Critério de pronto | Erros aparecem ao sair do campo; layout do Figma no desktop e em coluna no celular |
| Status | ✅ |
| Teste realizado | `checkout.test.tsx`; prints em 1440, 768, 375 e 320 px |
| Commit | `feat: add delivery address form` |

### [x] T-23 · Integração com o ViaCEP
| Campo | Valor |
| --- | --- |
| Objetivo | `services/viaCep.ts` + `useCepLookup` + preenchimento automático |
| Requisitos | RF-08, RN-07 |
| Arquivos | `src/services/viaCep.ts`, `src/hooks/useCepLookup.ts`, `src/pages/Checkout/CheckoutForm.tsx` |
| Critério de pronto | CEP `90250-440` preenche os 4 campos; CEP inexistente, erro de rede e carregamento tratados; foco vai para Número |
| Status | ✅ |
| Teste realizado | TC-13 (`viacep.test.ts`: 10 testes, incluindo timeout e cancelamento), TC-15 (`checkout.test.tsx`); fluxo no Chrome com ViaCEP simulado |
| Commit | `feat: autofill address with ViaCEP lookup` |

### [x] T-24 · Seletor de pagamento
| Campo | Valor |
| --- | --- |
| Objetivo | `PaymentMethodSelector` com rádios nativos estilizados |
| Requisitos | RF-09, RN-05 |
| Arquivos | `src/components/PaymentMethodSelector/*` |
| Critério de pronto | Setas do teclado trocam a opção; selecionado visível por cor e borda; erro sem seleção |
| Status | ✅ |
| Teste realizado | TC-12; navegação por setas conferida no Chrome |
| Commit | `feat: add payment method selector` |

### [x] T-25 · Envio e bloqueio do pedido
| Campo | Valor |
| --- | --- |
| Objetivo | Submit do formulário com bloqueios e feedback acessível |
| Requisitos | RF-11, RN-10 |
| Arquivos | `src/pages/Checkout/CheckoutForm.tsx` |
| Critério de pronto | Sem itens, com erro ou durante a consulta de CEP: nenhum pedido é criado; foco no primeiro erro; erro anunciado |
| Status | ✅ |
| Teste realizado | TC-16 (`checkout.test.tsx`): sem pedido, erros visíveis, alerta anunciado, foco no CEP; botão bloqueado durante a consulta |
| Commit | `feat: validate and block invalid checkout submission` |

---

## Fase 7 — Confirmação

### [x] T-26 · Snapshot do pedido e limpeza do carrinho
| Campo | Valor |
| --- | --- |
| Objetivo | `confirmOrder`, `lastOrder` persistido e navegação para `/success` |
| Requisitos | RF-12, RF-13, RN-06 |
| Arquivos | `src/utils/order.ts`, `src/contexts/CartContext.ts`, `CartProvider.tsx`, `src/components/Header/Header.tsx` |
| Critério de pronto | Após confirmar, carrinho vazio e badge oculto; `lastOrder` salvo; voltar não leva a checkout quebrado |
| Status | ✅ |
| Teste realizado | `order.test.ts` (12 testes), TC-17 |
| Commit | `feat: create order snapshot and clear cart on confirm` |

### [x] T-27 · Tela de sucesso
| Campo | Valor |
| --- | --- |
| Objetivo | `OrderSuccess` com endereço, previsão e pagamento; estado vazio |
| Requisitos | RF-12, RF-13, RN-09, DP-07 |
| Arquivos | `src/pages/Success/Success.tsx`, `src/components/OrderSuccess/*`, `src/assets/illustrations/delivery-mascot-{light,dark}.webp` |
| Critério de pronto | Dados corretos mesmo após F5; `/success` sem pedido mostra estado vazio; chip do Header mostra a cidade do pedido |
| Status | ✅ |
| Teste realizado | TC-17, TC-18 (`success.test.tsx`); F5 na tela de sucesso conferido no Chrome |
| Commit | `feat: add order success page` |

---

## Fase 8 — Tema, responsividade e acessibilidade

### [x] T-28 · Revisão completa do tema escuro
| Campo | Valor |
| --- | --- |
| Objetivo | Conferir todas as telas e estados no tema escuro |
| Requisitos | RF-14, RNF-01 |
| Arquivos | Estilos dos componentes conforme necessário |
| Critério de pronto | Cards, campos, erros, pagamento selecionado, badge, sucesso e ilustrações legíveis; nenhum hex fora de `styles/` |
| Status | ✅ |
| Teste realizado | 40 prints (5 telas × 4 larguras × 2 temas) revisados; contraste coberto por `themes.test.ts` |
| Commit | `style: polish dark theme across all screens` |

### [x] T-29 · Revisão de responsividade
| Campo | Valor |
| --- | --- |
| Objetivo | Testar e ajustar as três telas em 320, 375, 768, 1280 e 1440 px |
| Requisitos | RF-15, RNF-02 |
| Arquivos | Estilos dos componentes conforme necessário |
| Critério de pronto | Fluxo completo sem rolagem horizontal; alvos de toque ≥ 44 px; screenshots salvos em `docs/screenshots/` |
| Status | ✅ |
| Teste realizado | TC-21: 0 casos de rolagem horizontal nas 40 combinações; prints em `docs/screenshots/` |
| Commit | `style: refine responsive layouts` |

### [x] T-30 · Auditoria de acessibilidade
| Campo | Valor |
| --- | --- |
| Objetivo | Skip link, foco por rota, teclado, leitor de tela, Lighthouse |
| Requisitos | RNF-01, RNF-03, RNF-06 |
| Arquivos | `src/hooks/useRouteFocus.ts`, `src/layouts/DefaultLayout.tsx` (`ScrollRestoration`), `src/router.tsx` (rotas lazy), `src/main.tsx` (fontes locais), `index.html` (preload), `public/images/`, `public/robots.txt` |
| Critério de pronto | Fluxo completo só com teclado; Lighthouse mobile ≥ 90 em Accessibility e Performance |
| Status | ✅ |
| Teste realizado | TC-22: ordem do Tab, skip link e foco por rota no Chrome. Lighthouse: Acessibilidade 100, Boas práticas 100; Desempenho 100 (desktop) e 83 (mobile simulado), ver TECH_SPEC §9.5 |
| Commit | `fix: accessibility improvements` |

---

## Fase 9 — Qualidade e entrega

### [x] T-31 · Completar os testes
| Campo | Valor |
| --- | --- |
| Objetivo | Garantir TC-01..TC-20 automatizados e cobertura da lógica |
| Requisitos | Todos os RF e RN com lógica |
| Arquivos | `src/tests/*` |
| Critério de pronto | Todos os testes verdes; cobertura ≥ 80% em `utils/`, `reducers/`, `schemas/` |
| Status | ✅ |
| Teste realizado | 197 testes em 18 arquivos; cobertura de linhas: 97,6% geral, 98,3% em `utils/`, 93,3% em `reducers/`, 100% em `services/` |
| Commit | `test: complete unit and component test coverage` |

### [ ] T-32 · Deploy
| Campo | Valor |
| --- | --- |
| Objetivo | Publicar na Vercel a partir do GitHub |
| Requisitos | RF-07 |
| Arquivos | `vercel.json` |
| Critério de pronto | F5 em `/checkout` e `/success` funciona no link publicado; ViaCEP funciona em produção |
| Status | ⬜ (feito pelo aluno na Vercel; passo a passo no README) |
| Teste realizado | |
| Commit | `chore: configure deploy` |

### [ ] T-33 · README e documentação final
| Campo | Valor |
| --- | --- |
| Objetivo | README completo e SPECs atualizados com o que mudou durante a implementação |
| Requisitos | RF-16 (Branding com IA), entrega final |
| Arquivos | `README.md`, `docs/*.md`, `docs/AI_USAGE.md` |
| Critério de pronto | README com objetivos, stack, instalação, scripts, decisões, screenshots desktop/mobile/escuro, link do Figma, link publicado, Branding com IA e ≥ 3 evidências de uso de IA |
| Status | 🔄 (falta: link publicado, link do Figma, campos ✏️ do BRANDING e AI_USAGE com as palavras do aluno) |
| Teste realizado | |
| Commit | `docs: finalize readme and specs` |

### [ ] T-34 · Checklist final e demonstração
| Campo | Valor |
| --- | --- |
| Objetivo | Conferir o checklist do enunciado (§10) e preparar a apresentação |
| Requisitos | Todos |
| Arquivos | — |
| Critério de pronto | Todos os itens do checklist marcados; console limpo; vídeo ou roteiro curto do fluxo de compra; aluno consegue explicar reducer, Context, validação e persistência |
| Status | ⬜ |
| Teste realizado | |
| Commit | — |

---

## Opcionais (somente após T-34)
| ID | Extra |
| --- | --- |
| X-01 | Busca por nome e filtro por tag |
| X-02 | Histórico de pedidos local |
| X-03 | Cupom de desconto com testes |
| X-04 | E2E com Playwright + GitHub Actions |
| X-05 | Animações com `prefers-reduced-motion` |
