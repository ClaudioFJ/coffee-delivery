# TASKS_SPEC — Plano de implementação

> Projeto Final 05 — Coffee Delivery · Versão 0.1 · Última atualização: 17/11/2026
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

### [ ] T-04 · Criar o projeto e o repositório
| Campo | Valor |
| --- | --- |
| Objetivo | Projeto Vite `react-ts` rodando, versionado no GitHub |
| Requisitos | RF-07 (base), RNF-07 |
| Arquivos | `package.json`, `vite.config.ts`, `tsconfig*.json`, `.gitignore`, `index.html`, `README.md` (esqueleto) |
| Critério de pronto | `npm run dev` abre a página; `tsconfig` com `strict: true`; repositório público no GitHub com os `docs/` |
| Status | ⬜ |
| Teste realizado | |
| Commit | `chore: scaffold vite react-ts project` |

### [ ] T-05 · Instalar dependências e ferramentas de qualidade
| Campo | Valor |
| --- | --- |
| Objetivo | Bibliotecas do TECH_SPEC §1, ESLint, Prettier e scripts |
| Requisitos | RNF-07 |
| Arquivos | `package.json`, `eslint.config.js`, `.prettierrc` |
| Critério de pronto | Scripts `dev`, `build`, `preview`, `lint`, `typecheck`, `test`, `test:run`, `coverage` funcionando |
| Status | ⬜ |
| Teste realizado | |
| Commit | `chore: add dependencies, lint and format config` |

### [ ] T-06 · Configurar Vitest e Testing Library
| Campo | Valor |
| --- | --- |
| Objetivo | Ambiente de testes pronto, com um teste de exemplo passando |
| Requisitos | — (habilita os testes de todas as tarefas) |
| Arquivos | `vite.config.ts` (bloco `test`), `src/tests/setup.ts`, `src/tests/smoke.test.ts` |
| Critério de pronto | `npm run test:run` verde; `jest-dom` disponível nos testes |
| Status | ⬜ |
| Teste realizado | |
| Commit | `test: configure vitest and testing library` |

### [ ] T-07 · Estrutura de pastas, rotas e layout
| Campo | Valor |
| --- | --- |
| Objetivo | Pastas do TECH_SPEC §3, router com 4 rotas e `DefaultLayout` com Header provisório |
| Requisitos | RF-07 |
| Arquivos | `src/router.tsx`, `src/layouts/DefaultLayout.tsx`, `src/pages/*/index.tsx`, `vercel.json` |
| Critério de pronto | Navegar entre `/`, `/checkout`, `/success` e uma rota inexistente sem recarregar; `<title>` muda por página |
| Status | ⬜ |
| Teste realizado | |
| Commit | `feat: add routes and default layout` |

---

## Fase 3 — Branding e tema base

### [ ] T-08 · Criar a logo com IA
| Campo | Valor |
| --- | --- |
| Objetivo | Gerar propostas de logo, escolher uma e preparar as versões |
| Requisitos | RF-16 |
| Arquivos | `src/assets/brand/logo-light.svg`, `logo-dark.svg`, `symbol.svg`, `public/favicon.svg`, `docs/branding/` (prompts e propostas) |
| Critério de pronto | Versões para fundo claro e escuro; favicon legível em 16 px e 32 px; termos de uso da ferramenta conferidos |
| Status | ⬜ |
| Teste realizado | |
| Commit | `feat: add AI-generated brand assets` |

### [ ] T-09 · Tokens, temas e estilos globais
| Campo | Valor |
| --- | --- |
| Objetivo | `tokens.ts`, `themes.ts` (claro e escuro), `breakpoints.ts`, `GlobalStyle`, `styled.d.ts`, fontes |
| Requisitos | RF-14, RF-15, RNF-01 |
| Arquivos | `src/styles/*`, `index.html` (fontes, `color-scheme`) |
| Critério de pronto | Tokens do TECH_SPEC §8.2 implementados; cores `danger`/`success` definidas com contraste verificado e documentadas no TECH_SPEC; nenhum hex fora de `styles/` |
| Status | ⬜ |
| Teste realizado | |
| Commit | `style: add design tokens and light/dark themes` |

### [ ] T-10 · ThemeContext e ThemeToggle
| Campo | Valor |
| --- | --- |
| Objetivo | Alternar tema, persistir e respeitar `prefers-color-scheme` |
| Requisitos | RF-14 |
| Arquivos | `src/hooks/useLocalStorage.ts`, `src/contexts/ThemeContext.tsx`, `src/hooks/useTheme.ts`, `src/components/ThemeToggle/*`, script no `index.html` |
| Critério de pronto | Toggle troca o tema; F5 mantém; sem escolha salva segue o sistema; sem "flash" branco no escuro |
| Status | ⬜ |
| Teste realizado | TC-20 |
| Commit | `feat: add theme context and toggle` |

### [ ] T-11 · Header
| Campo | Valor |
| --- | --- |
| Objetivo | Header com logo, `LocationChip`, `ThemeToggle` e botão do carrinho com `CartBadge` (contador fixo por enquanto) |
| Requisitos | RF-04 (visual), RF-14, RF-16, DP-07 |
| Arquivos | `src/components/Header/*`, `CartBadge/*`, `LocationChip/*` |
| Critério de pronto | Fiel ao Figma no desktop; adaptado no celular; logo troca com o tema; carrinho leva a `/checkout` |
| Status | ⬜ |
| Teste realizado | |
| Commit | `feat: add header with brand, theme toggle and cart button` |

---

## Fase 4 — Home e catálogo

### [ ] T-12 · Tipos e dados do catálogo
| Campo | Valor |
| --- | --- |
| Objetivo | Tipos do domínio e os 14 cafés tipados |
| Requisitos | RF-01, RN-04, RN-08 |
| Arquivos | `src/types/*.ts`, `src/data/coffees.ts`, `src/utils/constants.ts` |
| Critério de pronto | 14 cafés com id, nome, descrição, tags, `priceInCents: 990` e imagem; sem `any` |
| Status | ⬜ |
| Teste realizado | |
| Commit | `feat: add domain types and coffee catalog data` |

### [ ] T-13 · Utilitários de dinheiro e carrinho
| Campo | Valor |
| --- | --- |
| Objetivo | `formatBRL`, `countUnits`, `calcSubtotal`, `calcTotal`, `sanitizeCart` |
| Requisitos | RF-04, RF-10, RN-03, RN-04, RNF-04 |
| Arquivos | `src/utils/money.ts`, `src/utils/cart.ts`, testes |
| Critério de pronto | Funções puras com testes passando |
| Status | ⬜ |
| Teste realizado | TC-07, TC-08, TC-09, TC-10 |
| Commit | `feat: add money formatting and cart calculation utils` |

### [ ] T-14 · Hero da Home
| Campo | Valor |
| --- | --- |
| Objetivo | Título, subtítulo, 4 benefícios com ícones e imagem |
| Requisitos | RF-15 |
| Arquivos | `src/pages/Home/*`, `src/assets/illustrations/hero.*` |
| Critério de pronto | Fiel ao Figma no desktop; imagem abaixo do texto no celular; fundo desfocado funciona nos dois temas |
| Status | ⬜ |
| Teste realizado | |
| Commit | `feat: add home hero section` |

### [ ] T-15 · QuantityInput, Tag e CoffeeCard
| Campo | Valor |
| --- | --- |
| Objetivo | Componentes do card com estado local de quantidade |
| Requisitos | RF-01, RF-02, RN-01 |
| Arquivos | `src/components/QuantityInput/*`, `Tag/*`, `CoffeeCard/*` |
| Critério de pronto | "−" desabilitado em 1 e "+" em 99; nomes acessíveis; alvos de toque ≥ 44 px |
| Status | ⬜ |
| Teste realizado | |
| Commit | `feat: add quantity input and coffee card` |

### [ ] T-16 · CoffeeCatalog responsivo
| Campo | Valor |
| --- | --- |
| Objetivo | Seção "Nossos cafés" com grid adaptável |
| Requisitos | RF-01, RF-15 |
| Arquivos | `src/components/CoffeeCatalog/*`, `src/pages/Home/*` |
| Critério de pronto | 14 cards; 1 coluna em 320 px e 4 em 1280 px; sem rolagem horizontal |
| Status | ⬜ |
| Teste realizado | |
| Commit | `feat: add responsive coffee catalog` |

---

## Fase 5 — Carrinho

### [ ] T-17 · Reducer do carrinho
| Campo | Valor |
| --- | --- |
| Objetivo | Ações e reducer puro conforme TECH_SPEC §5 |
| Requisitos | RF-03, RF-05, RN-01, RN-02 |
| Arquivos | `src/reducers/cart/actions.ts`, `reducer.ts`, testes |
| Critério de pronto | Todos os testes do reducer passando, incluindo o de não-mutação |
| Status | ⬜ |
| Teste realizado | TC-01..TC-06 |
| Commit | `feat: add cart reducer and actions` |

### [ ] T-18 · CartContext e useCart
| Campo | Valor |
| --- | --- |
| Objetivo | Provider com valores derivados e funções do carrinho |
| Requisitos | RF-03, RF-04, RF-05 |
| Arquivos | `src/contexts/CartContext.tsx`, `src/hooks/useCart.ts`, `src/main.tsx` |
| Critério de pronto | Adicionar pelo card atualiza o badge do Header; `useCart` fora do Provider gera erro claro |
| Status | ⬜ |
| Teste realizado | TC-14 |
| Commit | `feat: add cart context and connect catalog and header` |

### [ ] T-19 · Persistência do carrinho
| Campo | Valor |
| --- | --- |
| Objetivo | Carregar e salvar o carrinho no `localStorage` com sanitização |
| Requisitos | RF-06, RNF-04 |
| Arquivos | `src/contexts/CartContext.tsx` |
| Critério de pronto | F5 mantém o carrinho; JSON corrompido no storage não quebra a aplicação |
| Status | ⬜ |
| Teste realizado | TC-19 |
| Commit | `feat: persist cart in local storage` |

---

## Fase 6 — Checkout

### [ ] T-20 · Layout do Checkout, CartItem e CartSummary
| Campo | Valor |
| --- | --- |
| Objetivo | Coluna "Cafés selecionados" funcional e estado vazio |
| Requisitos | RF-05, RF-10, RN-09 |
| Arquivos | `src/pages/Checkout/*`, `src/components/CartItem/*`, `CartSummary/*`, `EmptyState/*` |
| Critério de pronto | +, − e Remover funcionam; valores batem com TC-08; carrinho vazio mostra `EmptyState` |
| Status | ⬜ |
| Teste realizado | |
| Commit | `feat: add checkout cart list, summary and empty state` |

### [ ] T-21 · Schema Zod e TextField
| Campo | Valor |
| --- | --- |
| Objetivo | Schema do checkout e campo de texto acessível |
| Requisitos | RF-08, RF-09, RN-07 |
| Arquivos | `src/schemas/checkoutSchema.ts`, `src/utils/cep.ts`, `src/components/TextField/*`, testes |
| Critério de pronto | Testes do schema passando; `TextField` com label, erro e `aria-*` |
| Status | ⬜ |
| Teste realizado | TC-11, TC-12 |
| Commit | `feat: add checkout schema and accessible text field` |

### [ ] T-22 · Formulário de endereço
| Campo | Valor |
| --- | --- |
| Objetivo | `DeliveryAddressForm` com RHF + máscara de CEP |
| Requisitos | RF-08, RN-07, RF-15 |
| Arquivos | `src/components/DeliveryAddressForm/*`, `src/pages/Checkout/*` |
| Critério de pronto | Erros aparecem ao sair do campo; layout do Figma no desktop e em coluna no celular |
| Status | ⬜ |
| Teste realizado | |
| Commit | `feat: add delivery address form` |

### [ ] T-23 · Integração com o ViaCEP
| Campo | Valor |
| --- | --- |
| Objetivo | `services/viaCep.ts` + `useCepLookup` + preenchimento automático |
| Requisitos | RF-08, RN-07 |
| Arquivos | `src/services/viaCep.ts`, `src/hooks/useCepLookup.ts`, `DeliveryAddressForm/*`, testes |
| Critério de pronto | CEP `90250-440` preenche os 4 campos; CEP inexistente, erro de rede e carregamento tratados; foco vai para Número |
| Status | ⬜ |
| Teste realizado | TC-13, TC-15 |
| Commit | `feat: autofill address with ViaCEP lookup` |

### [ ] T-24 · Seletor de pagamento
| Campo | Valor |
| --- | --- |
| Objetivo | `PaymentMethodSelector` com rádios nativos estilizados |
| Requisitos | RF-09, RN-05 |
| Arquivos | `src/components/PaymentMethodSelector/*` |
| Critério de pronto | Setas do teclado trocam a opção; selecionado visível por cor e borda; erro sem seleção |
| Status | ⬜ |
| Teste realizado | |
| Commit | `feat: add payment method selector` |

### [ ] T-25 · Envio e bloqueio do pedido
| Campo | Valor |
| --- | --- |
| Objetivo | Submit do formulário com bloqueios e feedback acessível |
| Requisitos | RF-11, RN-10 |
| Arquivos | `src/pages/Checkout/*` |
| Critério de pronto | Sem itens, com erro ou durante a consulta de CEP: nenhum pedido é criado; foco no primeiro erro; erro anunciado |
| Status | ⬜ |
| Teste realizado | TC-16 |
| Commit | `feat: validate and block invalid checkout submission` |

---

## Fase 7 — Confirmação

### [ ] T-26 · Snapshot do pedido e limpeza do carrinho
| Campo | Valor |
| --- | --- |
| Objetivo | `confirmOrder`, `lastOrder` persistido e navegação para `/success` |
| Requisitos | RF-12, RF-13, RN-06 |
| Arquivos | `src/contexts/CartContext.tsx`, `src/pages/Checkout/*` |
| Critério de pronto | Após confirmar, carrinho vazio e badge oculto; `lastOrder` salvo; voltar não leva a checkout quebrado |
| Status | ⬜ |
| Teste realizado | |
| Commit | `feat: create order snapshot and clear cart on confirm` |

### [ ] T-27 · Tela de sucesso
| Campo | Valor |
| --- | --- |
| Objetivo | `OrderSuccess` com endereço, previsão e pagamento; estado vazio |
| Requisitos | RF-12, RF-13, RN-09, DP-07 |
| Arquivos | `src/pages/Success/*`, `src/components/OrderSuccess/*`, `src/assets/illustrations/delivery.*` |
| Critério de pronto | Dados corretos mesmo após F5; `/success` sem pedido mostra estado vazio; chip do Header mostra a cidade do pedido |
| Status | ⬜ |
| Teste realizado | TC-17, TC-18 |
| Commit | `feat: add order success page` |

---

## Fase 8 — Tema, responsividade e acessibilidade

### [ ] T-28 · Revisão completa do tema escuro
| Campo | Valor |
| --- | --- |
| Objetivo | Conferir todas as telas e estados no tema escuro |
| Requisitos | RF-14, RNF-01 |
| Arquivos | Estilos dos componentes conforme necessário |
| Critério de pronto | Cards, campos, erros, pagamento selecionado, badge, sucesso e ilustrações legíveis; nenhum hex fora de `styles/` |
| Status | ⬜ |
| Teste realizado | |
| Commit | `style: polish dark theme across all screens` |

### [ ] T-29 · Revisão de responsividade
| Campo | Valor |
| --- | --- |
| Objetivo | Testar e ajustar as três telas em 320, 375, 768, 1280 e 1440 px |
| Requisitos | RF-15, RNF-02 |
| Arquivos | Estilos dos componentes conforme necessário |
| Critério de pronto | Fluxo completo sem rolagem horizontal; alvos de toque ≥ 44 px; screenshots salvos em `docs/screenshots/` |
| Status | ⬜ |
| Teste realizado | TC-21 |
| Commit | `style: refine responsive layouts` |

### [ ] T-30 · Auditoria de acessibilidade
| Campo | Valor |
| --- | --- |
| Objetivo | Skip link, foco por rota, teclado, leitor de tela, Lighthouse |
| Requisitos | RNF-01, RNF-03, RNF-06 |
| Arquivos | `DefaultLayout`, páginas, componentes conforme necessário |
| Critério de pronto | Fluxo completo só com teclado; Lighthouse mobile ≥ 90 em Accessibility e Performance |
| Status | ⬜ |
| Teste realizado | TC-22 |
| Commit | `fix: accessibility improvements` |

---

## Fase 9 — Qualidade e entrega

### [ ] T-31 · Completar os testes
| Campo | Valor |
| --- | --- |
| Objetivo | Garantir TC-01..TC-20 automatizados e cobertura da lógica |
| Requisitos | Todos os RF e RN com lógica |
| Arquivos | `src/tests/*` |
| Critério de pronto | Todos os testes verdes; cobertura ≥ 80% em `utils/`, `reducers/`, `schemas/` |
| Status | ⬜ |
| Teste realizado | |
| Commit | `test: complete unit and component test coverage` |

### [ ] T-32 · Deploy
| Campo | Valor |
| --- | --- |
| Objetivo | Publicar na Vercel a partir do GitHub |
| Requisitos | RF-07 |
| Arquivos | `vercel.json` |
| Critério de pronto | F5 em `/checkout` e `/success` funciona no link publicado; ViaCEP funciona em produção |
| Status | ⬜ |
| Teste realizado | |
| Commit | `chore: configure deploy` |

### [ ] T-33 · README e documentação final
| Campo | Valor |
| --- | --- |
| Objetivo | README completo e SPECs atualizados com o que mudou durante a implementação |
| Requisitos | RF-16 (Branding com IA), entrega final |
| Arquivos | `README.md`, `docs/*.md`, `docs/AI_USAGE.md` |
| Critério de pronto | README com objetivos, stack, instalação, scripts, decisões, screenshots desktop/mobile/escuro, link do Figma, link publicado, Branding com IA e ≥ 3 evidências de uso de IA |
| Status | ⬜ |
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
