# AGENTS.md — Diretrizes para assistentes de IA

Este arquivo orienta qualquer assistente de IA (Claude, ChatGPT, Codex, Copilot, OpenCode…) que trabalhe neste repositório. **Leia-o inteiro antes de qualquer ação.**

## 1. Contexto do projeto

- **Projeto:** Coffee Delivery, SPA de e-commerce de cafeteria (catálogo → carrinho → checkout → confirmação de pedido fictício).
- **Natureza:** projeto final acadêmico da disciplina Single Page Application. **O aluno precisa entender e explicar cada linha.** O papel da IA é de mentor e par de programação, não de gerador da aplicação inteira.
- **Referência visual:** Figma "Coffee Delivery | Projeto Final React": Home (frame 2:1550), Checkout (217:511), Checkout Filled, Sucesso (222:824) e Style Guide.
- **Sem backend.** Única chamada externa: API ViaCEP.

## 2. Leitura obrigatória antes de escrever código

1. [`docs/PRD_SPEC.md`](docs/PRD_SPEC.md): o que construir (RF, RN, RNF, decisões DP-xx).
2. [`docs/TECH_SPEC.md`](docs/TECH_SPEC.md): como construir (tipos, reducer, rotas, schema, tokens, testes).
3. [`docs/TASKS_SPEC.md`](docs/TASKS_SPEC.md): qual é a **próxima tarefa** e o critério de pronto dela.

Se o pedido do aluno contradizer os SPEC, **aponte a contradição e pergunte** antes de agir. Não altere decisões registradas (DP-xx) sem que o aluno peça; quando ele pedir, atualize o SPEC na mesma tarefa.

## 3. Stack (não substituir sem aprovação)

React 19 · TypeScript (strict) · Vite · React Router 7 (não migrar para a v8; rotas `lazy` para Checkout e Sucesso) · oxlint + Prettier · Fontsource (fontes locais) · Context API + `useReducer` · styled-components 6 · React Hook Form + Zod 4 · Phosphor Icons · Vitest + Testing Library · Vercel.

**Não adicionar** Redux, Zustand, Axios, Tailwind, ESLint, UI kits ou bibliotecas de máscara sem aprovação explícita registrada no TECH_SPEC.

## 4. Como trabalhar

1. **Uma tarefa do TASKS_SPEC por vez.** Nunca gere a aplicação inteira, nem várias tarefas de uma vez.
2. Antes de codar, apresente: tarefa (ID), arquivos que serão criados/alterados, abordagem em poucos passos e como será testada. **Espere a confirmação do aluno.**
3. Escreva o código **e explique** os conceitos envolvidos (Props, Hooks, reducer, imutabilidade, tipagem) em linguagem simples, em português.
4. Termine cada tarefa com: comandos para testar, o que observar no navegador, a mensagem de commit sugerida e a atualização do TASKS_SPEC.
5. Ao consultar bibliotecas, prefira a **documentação oficial** (Context7 MCP, se disponível). Não invente APIs; se não tiver certeza da sintaxe de uma versão, diga isso.
6. Se encontrar um bug fora da tarefa atual, **registre e pergunte**; não corrija silenciosamente.

## 5. Regras de código

- TypeScript `strict`; **proibido `any`**. Dados externos (`localStorage`, ViaCEP) entram como `unknown` e são validados.
- **Nunca mutar estado.** Use `map`, `filter`, `find`, `reduce`, spread. Reducers são funções puras.
- **Dinheiro sempre em centavos (inteiros).** Formatação só na exibição, com `formatBRL`.
- Valores fixos (frete, limites de quantidade, previsão) só em `src/utils/constants.ts`.
- Cores, fontes e espaçamentos só via tema (`theme.colors.*`). **Nenhum hex fora de `src/styles/`.**
- Regras de negócio em funções puras (`utils/`, `reducers/`, `schemas/`); componentes só exibem e disparam ações.
- Componentes em pastas: `Nome/Nome.tsx` + `Nome/Nome.styles.ts` (+ `index.ts`).
- Acessibilidade conforme TECH_SPEC §8.5: labels, `aria-*`, foco visível, teclado, contraste.
- Sem `console.log` no código entregue. Sem segredos ou `.env` reais no repositório.

## 6. Testes

- Toda lógica nova em `utils/`, `reducers/`, `schemas/` e `services/` vem **com teste** na mesma tarefa.
- Use os IDs de caso de teste do TECH_SPEC §9.2 (TC-xx) nos nomes dos `describe`/`it`.
- Testes de componente buscam elementos por papel/rótulo (`getByRole`, `getByLabelText`), não por classe.
- Nunca chame a API real nos testes; simule o `fetch`.
- Antes de considerar a tarefa pronta: `npm run typecheck && npm run lint && npm run test:run`.

## 7. Commits

Commits semânticos em inglês, no imperativo, um por tarefa:
`feat:` · `fix:` · `docs:` · `test:` · `refactor:` · `style:` · `chore:`

Exemplo: `feat: add cart reducer and actions`

## 8. Limites de escopo

**Fora do escopo:** backend, autenticação, pagamento real, frete por distância, estoque. Extras (busca, histórico, cupom, E2E) **só depois da T-34**.

## 9. Registro de uso de IA

Interações relevantes (planejamento, explicação, revisão, depuração, testes) devem ser registradas pelo aluno em [`docs/AI_USAGE.md`](docs/AI_USAGE.md) com: prompt, objetivo, resposta resumida, decisão tomada e evidência. Ao fim de uma tarefa significativa, lembre o aluno de registrar.

## 10. Prompt inicial recomendado

> Atue como mentor de React e TypeScript neste projeto final Coffee Delivery. Leia AGENTS.md, PRD_SPEC.md, TECH_SPEC.md e TASKS_SPEC.md. Identifique a próxima tarefa pendente, explique o objetivo, os arquivos envolvidos, os riscos e o plano de testes. Não implemente nada antes de eu validar o plano. Depois de implementar, explique as decisões e espere minha validação antes de avançar.
