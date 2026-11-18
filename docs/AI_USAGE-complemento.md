# Complemento do registro de uso de IA

> Rascunho das interações desde a última versão do `AI_USAGE.md`. **Copie para o final do `docs/AI_USAGE.md` e reescreva com as suas palavras**, principalmente a linha "Decisão tomada". Depois apague este arquivo.

---

## Interação 05 — Ambiente sem permissão de administrador (17/11/2026)

| Campo | Registro |
| --- | --- |
| Prompt | Erro ao instalar o Node.js: o PC da faculdade bloqueia permissões de administrador. |
| Objetivo | Atualizar o Node (o Vite atual exige 22.12+; o PC tinha 22.11). |
| Resposta resumida | A IA conferiu no npm a versão de Node exigida pelo Vite e pelo Vitest e propôs duas saídas sem admin: o Node portátil (.zip) com o PATH ajustado só no terminal, ou o GitHub Codespaces. |
| Decisão tomada | Usei o Node portátil. |
| Evidência | Projeto rodando com `npm run dev` |

## Interação 06 — Logo e mascote (17/11/2026)

| Campo | Registro |
| --- | --- |
| Prompt | Envio de uma foto de galinha de óculos e tênis como logo. |
| Objetivo | Definir a identidade visual (RF-16). |
| Resposta resumida | A IA explicou por que a foto não servia (não foi gerada por IA, tem direitos desconhecidos e fica ilegível em 16 px) e propôs um prompt para gerar um mascote nesse conceito, com a paleta do Figma e sem texto. Depois tratou a imagem gerada: fundo transparente, versão para tema escuro, favicon só com a cabeça. |
| Decisão tomada | Gerei o mascote com o prompt sugerido e aprovei os ajustes. |
| Evidência | `docs/BRANDING.md`, `docs/branding/` |

## Interação 07 — Implementação por tarefas, T-04 a T-19 (17/11/2026)

| Campo | Registro |
| --- | --- |
| Prompt | "Pode seguir" a cada tarefa do `TASKS_SPEC.md`. |
| Objetivo | Implementar configuração, temas, Header, catálogo, reducer, Context e persistência. |
| Resposta resumida | A IA testou cada entrega antes de enviar (testes, typecheck, lint e prints no Chrome) e apontou divergências com o planejado: o template do Vite usa oxlint no lugar do ESLint; o React Router já estava na v8; o catálogo mostrava 3 colunas em vez de 4. Registrou as decisões DT-01 a DT-04. |
| Decisão tomada | Mantive o oxlint, fixei o React Router 7 e aceitei a correção de largura. |
| Evidência | `docs/TECH_SPEC.md` §1; commits de T-04 a T-19 |

## Interação 08 — Pedido para concluir o restante de uma vez (17/11/2026)

| Campo | Registro |
| --- | --- |
| Prompt | "Consegue fazer o restante de uma vez?" |
| Objetivo | Acelerar as tarefas T-20 a T-34. |
| Resposta resumida | A IA lembrou que o `AGENTS.md` pede uma tarefa por vez e que o professor avalia o entendimento do código. Fez a implementação completa, mas manteve a separação por tarefas no `TASKS_SPEC.md`, a sequência de commits por tema e um resumo "Para você saber explicar". Verificou o fluxo inteiro no Chrome (ViaCEP simulado), rodou axe-core (0 violações) e Lighthouse, e registrou as limitações (desempenho mobile 83). |
| Decisão tomada | ✏️ *(ex.: aceitei a entrega em bloco e revisei cada parte antes de commitar; estudei o fluxo do reducer e do formulário para a apresentação)* |
| Evidência | `docs/TASKS_SPEC.md` (T-20 a T-31), `docs/CHECKLIST.md`, `docs/TECH_SPEC.md` §9 |

## Interação 09 — Revisão crítica (sugestão)

> Antes de entregar, peça à IA (ou a outra IA) uma **revisão** do código, por exemplo:
> "Revise o `CartProvider.tsx` e o `CheckoutForm.tsx` procurando bugs, mutações de estado e problemas de acessibilidade. Não reescreva: liste os problemas e explique."
> Registre aqui o que foi apontado e o que você decidiu corrigir. Isso mostra **uso crítico** da IA, que é o que o enunciado pede.
