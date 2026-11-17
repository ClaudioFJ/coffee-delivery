# Registro de uso de IA

> Exigência do enunciado (§8): pelo menos **três interações relevantes**, cada uma com prompt, objetivo, resposta resumida, decisão tomada e evidência.
>
> **Assistente principal:** Claude (Anthropic), modelo Claude Opus 5.5, via claude.ai.
> Escreva os resumos e as decisões **com as suas palavras**. O texto abaixo é um ponto de partida para você revisar.

---

## Interação 01 — Análise do enunciado e do Figma (17/11/2026)

| Campo             | Registro                                                                                                                                                                                                                                       |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prompt            | Envio do enunciado completo e de prints do Figma (telas e Style Guide), pedindo auxílio para iniciar o projeto.                                                                                                                                |
| Objetivo          | Verificar se o material era suficiente e entender o que o projeto exige.                                                                                                                                                                       |
| Resposta resumida | A IA identificou as telas, a paleta e a tipografia do Style Guide. Apontou que os prints das telas estavam em baixa resolução e pediu versões com zoom. Recortou provisoriamente as imagens dos cafés e recomendou exportá-las do Figma em 2x. |
| Decisão tomada    | Exportei as 14 imagens do Figma (200×200, fundo transparente) e enviei prints ampliados. Descartei o recorte provisório.                                                                                                                       |
| Evidência         | `src/assets/coffees/`                                                                                                                                                                                                                          |

## Interação 02 — Elaboração do PRD_SPEC (17/11/2026)

| Campo             | Registro                                                                                                                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prompt            | Pedido para iniciar o projeto do zero, começando pelos documentos SPEC.                                                                                                            |
| Objetivo          | Definir escopo, requisitos e regras de negócio antes de codar.                                                                                                                     |
| Resposta resumida | A IA perguntou as decisões que dependiam de mim (redução de 1 para 0, frete, marca, estilização) e propôs o PRD com RF-01..16, RN-01..10, fluxos de erro e uma tabela de decisões. |
| Decisão tomada    | Escolhi: "−" desabilitado em 1, frete fixo R$ 3,50, manter o nome Coffee Delivery e usar styled-components. Revisei e aprovei as decisões DP-01..DP-10.                            |
| Evidência         | `docs/PRD_SPEC.md` §8.2                                                                                                                                                            |

## Interação 03 — Elaboração do TECH_SPEC (17/11/2026)

| Campo             | Registro                                                                                                                                                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prompt            | "Aprovado, podemos seguir" (próximo documento: TECH_SPEC).                                                                                                                                                                                                          |
| Objetivo          | Definir arquitetura, tipos, reducer, schema, tokens de tema e casos de teste.                                                                                                                                                                                       |
| Resposta resumida | A IA conferiu as versões atuais das bibliotecas no npm e calculou o contraste WCAG das cores do Figma. Encontrou três pares reprovados (texto branco no botão amarelo 2,11:1; tags 2,7:1; contador 3,28:1) e propôs ajustes, além de uma paleta para o tema escuro. |
| Decisão tomada    | Aceitei os ajustes de acessibilidade (marcados com ⚠ na tabela de tokens) e o modelo de carrinho guardando só id + quantidade.                                                                                                                                      |
| Evidência         | `docs/TECH_SPEC.md` §4 e §8.2                                                                                                                                                                                                                                       |

## Interação 04 — Plano de tarefas e AGENTS.md (17/11/2026)

| Campo             | Registro                                                                                                                                                  |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prompt            | "Perfeito, podemos prosseguir" (próximos documentos: TASKS_SPEC e AGENTS).                                                                                |
| Objetivo          | Quebrar a implementação em tarefas pequenas e definir regras para o assistente.                                                                           |
| Resposta resumida | 34 tarefas em 9 fases, cada uma com requisitos, arquivos, critério de pronto e commit sugerido; AGENTS.md com regras de escopo, código, testes e commits. |
| Decisão tomada    | _(preencher)_                                                                                                                                             |
| Evidência         | `docs/TASKS_SPEC.md`, `AGENTS.md`                                                                                                                         |

---

## Modelo para as próximas interações

```md
## Interação NN — Título (dd/mm/aaaa)

| Campo             | Registro                      |
| ----------------- | ----------------------------- |
| Prompt            |                               |
| Objetivo          |                               |
| Resposta resumida |                               |
| Decisão tomada    |                               |
| Evidência         | (arquivo, commit, screenshot) |
```
