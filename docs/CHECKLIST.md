# Checklist de validação final (enunciado §10)

> Cada item do enunciado com a evidência correspondente. ✅ = verificado · ✏️ = depende do aluno.
> Verificação em 17/11/2026.

| # | Item do enunciado | Status | Evidência |
| --- | --- | --- | --- |
| 1 | O projeto inicia e compila sem erros | ✅ | `npm run dev`, `npm run build`, `npm run typecheck` e `npm run lint` sem erros |
| 2 | Catálogo mostra imagem, nome, descrição, preço e quantidade | ✅ | `catalog.test.ts`, `catalog-ui.test.tsx`; [print](screenshots/desktop-light-home.png) |
| 3 | É possível adicionar o mesmo café sem duplicar linhas | ✅ | `cart-reducer.test.ts` (TC-02), `cart-context.test.tsx` (TC-14) |
| 4 | O badge do Header soma todas as unidades | ✅ | `cart-utils.test.ts` (TC-07), `header.test.tsx`, `cart-context.test.tsx` |
| 5 | Incrementar, decrementar e remover atualiza os valores | ✅ | `cart-reducer.test.ts` (TC-05, TC-06), `checkout.test.tsx` |
| 6 | Carrinho persiste após refresh e exibe estado vazio adequado | ✅ | `cart-persistence.test.tsx` (TC-19), `router.test.tsx`, `checkout.test.tsx` (FA-09) |
| 7 | Formulário consulta API pública pelo CEP, preenche rua, bairro, cidade e UF, valida, trata erros e mantém número manual e complemento opcional | ✅ | `viacep.test.ts` (TC-13), `checkout.test.tsx` (TC-15), `checkout-schema.test.ts` (TC-11) |
| 8 | Forma de pagamento obrigatória, sem pagamento real | ✅ | `checkout-schema.test.ts` (TC-12), `checkout.test.tsx` (TC-16) |
| 9 | Subtotal, entrega e total calculados e formatados corretamente | ✅ | `cart-utils.test.ts` (TC-08), `money.test.ts` (TC-09), `checkout.test.tsx` |
| 10 | Não é possível confirmar pedido inválido ou carrinho vazio | ✅ | `checkout.test.tsx` (TC-16 e bloqueio durante o CEP), `order.test.ts` |
| 11 | Página de sucesso mostra os dados corretos | ✅ | `checkout.test.tsx` (TC-17), `success.test.tsx` (TC-18) |
| 12 | Logo criada com IA presente, nítida e documentada | ✅ / ✏️ | Header, favicon e hero; [`BRANDING.md`](BRANDING.md) (preencher ferramenta e termos de uso) |
| 13 | Light/dark mode em todas as telas e persistente | ✅ | `theme.test.tsx` (TC-20), `themes.test.ts` (contraste); prints claro e escuro |
| 14 | Home, Checkout e Sucesso em desktop, tablet e celular | ✅ | 40 prints (320, 375, 768, 1440 px × 2 temas) sem rolagem horizontal; [`screenshots/`](screenshots/) |
| 15 | Componentes reutilizáveis, tipos, Hooks e reducer sem mutações | ✅ | `cart-reducer.test.ts` (estado congelado com `Object.freeze`); TypeScript strict sem `any` (lint) |
| 16 | PRD_SPEC, TECH_SPEC, TASKS_SPEC, AGENTS e README no GitHub | ✅ | `docs/`, `AGENTS.md`, `README.md` |
| 17 | Uso de IA documentado com pelo menos três evidências | ✏️ | [`AI_USAGE.md`](AI_USAGE.md): revisar com as suas palavras |
| 18 | Testes, evidências visuais e link de publicação | ✅ / ✏️ | 197 testes; prints em `docs/screenshots/`; **link da Vercel a preencher no README** |

## Entregáveis extras do enunciado (§11)
| Item | Status |
| --- | --- |
| Repositório público, sem `node_modules`, secrets ou `.env` | ✅ (`.gitignore` do Vite) |
| Link da aplicação publicada | ✏️ |
| Capturas de Home, Checkout, Sucesso e Dark Mode em mobile | ✅ `docs/screenshots/mobile-*.png` |
| Breve demonstração do fluxo de compra | ✏️ (gravar a tela: adicionar → checkout → CEP → confirmar → sucesso → alternar tema) |

## Roteiro sugerido para a demonstração (2 a 3 minutos)
1. Home: mostrar o catálogo, alternar o tema e voltar.
2. Escolher 2 Lattes e 1 Expresso; mostrar o contador somando 3.
3. Adicionar mais 1 Latte: o contador vai a 4, e no checkout continua uma linha só.
4. Checkout: clicar em "Confirmar pedido" vazio para mostrar os erros.
5. Digitar o CEP `90250-440`: rua, bairro, cidade e UF aparecem; o foco vai para o número.
6. Preencher o número, escolher o pagamento e confirmar.
7. Sucesso: mostrar os dados; dar F5 e mostrar que continuam lá, com o carrinho vazio.
8. DevTools no modo celular: repetir rapidamente em 375 px.
