# Guia de estudo para a apresentação

> Material de apoio do aluno: o que cada parte faz e as perguntas que o professor provavelmente vai fazer. **Abra cada arquivo citado e leia junto.** Os comentários no código explicam as linhas mais importantes.

## 1. O fluxo completo, em uma frase por etapa
1. **Home**: `CoffeeCard` guarda a quantidade escolhida num `useState` **local**. Ao clicar no carrinho roxo, chama `onAddToCart(id, quantidade)`.
2. **Home → contexto**: `Home` chama `useCart().addItem`, que faz `dispatch({ type: 'ADD_ITEM', payload })`.
3. **Reducer** (`reducers/cart/reducer.ts`): função pura que devolve um **novo** estado (`map`, `filter`, spread), nunca altera o anterior.
4. **Provider** (`contexts/CartProvider.tsx`): recalcula unidades e totais com `useMemo` e grava no `localStorage` com `useEffect`.
5. **Header**: lê `totalUnits` do contexto e re-renderiza o contador.
6. **Checkout** (`pages/Checkout/CheckoutForm.tsx`): React Hook Form + Zod validam; o CEP dispara o ViaCEP; "Confirmar" chama `confirmOrder`.
7. **Pedido** (`utils/order.ts`): `createOrder` copia itens, preços, endereço e totais (snapshot), salva como `lastOrder` e limpa o carrinho.
8. **Sucesso**: lê `lastOrder`, não o carrinho. Por isso continua correto com o carrinho vazio e depois do F5.

## 2. Checkout, parte por parte
| Arquivo | O que explicar |
| --- | --- |
| `schemas/checkoutSchema.ts` | O mesmo schema **valida** e **gera os tipos** (`z.input` = o que o formulário guarda; `z.output` = o que sai validado, com CEP só com dígitos e UF em maiúsculas). |
| `components/TextField` | Campo acessível: `<label>` oculto (o Figma não tem rótulo visível), `aria-invalid`, `aria-describedby` ligando o erro ao campo. No React 19, o `ref` do React Hook Form chega como prop comum. |
| `components/DeliveryAddressForm` | Usa `useFormContext`, então não precisa receber `register` por Props. O `onChange` do CEP aplica a máscara e avisa o pai quando o CEP fica completo. |
| `services/viaCep.ts` | Só faz o `fetch` e traduz a resposta: sucesso, `not-found` (o ViaCEP responde 200 com `erro: true`) ou `error`. O dado da API entra como `unknown` e é conferido campo a campo. |
| `hooks/useCepLookup.ts` | Guarda o status (`idle → loading → success/not-found/error`). Usa `AbortController` para cancelar a consulta anterior quando o CEP muda e para desistir depois de 8 s. |
| `CheckoutForm.handleCepChange` | A consulta parte do **evento** de digitação, não de um `useEffect`: é resposta a uma ação do usuário. Preenche só os campos que a API devolveu e põe o foco no Número. |
| `components/PaymentMethodSelector` | Rádios **nativos** escondidos visualmente dentro de `<label>`s estilizados: o teclado (setas) e o leitor de tela funcionam sem código extra. O selecionado é marcado com `:has(input:checked)`. |
| `CheckoutForm.onValid` | Só roda se o Zod aprovar. Bloqueia se o CEP ainda estiver sendo consultado (RN-10), confirma e navega com `replace: true` (o "voltar" não leva a um checkout vazio). |

## 3. Perguntas prováveis e respostas curtas
**Por que Context + useReducer e não só useState?**
Há várias ações sobre o mesmo estado (adicionar, incrementar, decrementar, remover, limpar). O reducer concentra **todas as regras num lugar só**, numa função pura e fácil de testar. O Context entrega isso para qualquer componente sem passar Props por vários níveis.

**Onde está a imutabilidade?**
No reducer: `map` com `{ ...item, quantity }`, `filter`, `[...items, novo]`. O teste `cart-reducer.test.ts` congela o estado com `Object.freeze` antes de cada ação; se houvesse mutação, o teste quebraria.

**Por que os totais não ficam no estado?**
São **derivados** dos itens. Calculando com `useMemo`, é impossível o total ficar diferente dos itens.

**Por que centavos?**
`0.1 + 0.2` dá `0.30000000000000004` em JavaScript. Em centavos, `10 + 20 = 30` exato. A divisão por 100 só acontece no `formatBRL`.

**Como o carrinho sobrevive ao F5?**
O `useReducer` recebe uma função de inicialização que lê o `localStorage` uma vez, passando pelo `sanitizeCart`. Um `useEffect` grava a cada mudança.

**E se alguém mexer no localStorage?**
`sanitizeCart` e `parseOrder` recebem `unknown` e descartam tudo que não for válido. Há testes com JSON corrompido.

**Por que a tela de sucesso não quebra depois de limpar o carrinho?**
Porque ela mostra o *snapshot* (`lastOrder`), que é salvo separado do carrinho.

**Como o tema funciona?**
Prioridade: escolha salva → tema do sistema (`prefers-color-scheme`, lido com `useSyncExternalStore`) → claro. Os componentes usam nomes **semânticos** (`theme.colors.surface`), então o tema escuro troca tudo, não só o fundo.

**O que vocês fizeram de acessibilidade?**
Contraste testado automaticamente (com 3 cores do Figma ajustadas), foco visível, skip link, foco no título a cada troca de página, rótulos e erros ligados aos campos, rádios nativos, anúncio de "café adicionado". axe-core sem violações e Lighthouse 100 em acessibilidade.

**Para que serve o `lazy` nas rotas?**
O código do checkout (formulário, Zod) só é baixado quando a pessoa vai para o checkout. A Home abre mais rápido.

**Qual foi o papel da IA?**
Planejar os SPEC, sugerir arquitetura, implementar por tarefas, revisar e testar. As decisões foram minhas e estão registradas (DP/DT) e no `AI_USAGE.md`. Exemplos de crítica: recusei usar uma foto como logo, fixei o React Router 7 e aceitei ajustes de contraste depois de entender o motivo.

## 4. Treino rápido (faça antes da apresentação)
- [ ] Explicar em voz alta o fluxo da seção 1 olhando só para o código.
- [ ] Mudar o frete para R$ 5,00 em `utils/constants.ts`, rodar os testes e ver qual falha e por quê. Depois desfazer.
- [ ] Criar uma ação nova no reducer sem o `case` e ver o erro do TypeScript no `default`. Depois desfazer.
- [ ] Abrir o DevTools e mostrar `coffee-delivery:cart:v1` mudando ao adicionar um café.
