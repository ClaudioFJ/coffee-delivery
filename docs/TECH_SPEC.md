# TECH_SPEC — Coffee Delivery

> **Technical Specification** · Projeto Final 05 — Disciplina SPA
> Versão 0.1 · Status: rascunho para validação · Última atualização: 17/11/2026
>
> Implementa os requisitos de [`PRD_SPEC.md`](./PRD_SPEC.md). As tarefas estão em [`TASKS_SPEC.md`](./TASKS_SPEC.md).
> IDs entre colchetes, como **[RF-03]**, apontam para o requisito do PRD atendido por cada decisão.

---

## 1. Stack e justificativa

Versões de referência consultadas no npm em 17/11/2026. Na instalação, usar a versão estável mais recente da mesma *major*.

| Tecnologia | Versão ref. | Papel | Por que esta escolha |
| --- | --- | --- | --- |
| React | 19.x | Biblioteca de UI | Exigida pela disciplina; componentes e Hooks |
| TypeScript | a do template Vite | Tipagem estática | Exigida; `strict: true` pega erros de modelo antes de rodar **[RNF-07]** |
| Vite | 8.x | Bundler e servidor de desenvolvimento | Inicialização rápida, template `react-ts` oficial |
| React Router | 7.x (pacote `react-router`, modo biblioteca) | Rotas da SPA | `createBrowserRouter` + layout com `<Outlet>` **[RF-07]**. A v8 já existe (jun/2026), mas a v7 continua recebendo atualizações e tem muito mais documentação e material de estudo. Instalar com `react-router@7` (DT-01) |
| styled-components | 6.x | Estilização e temas | Ferramenta do desafio original; `ThemeProvider` troca o tema inteiro de uma vez **[RF-14]** · decisão DP-10 |
| React Hook Form | 7.x | Estado do formulário | Pouca re-renderização, integra com Zod e com `setValue` (preenchimento pelo CEP) **[RF-08]** |
| Zod | 4.x | Schema de validação | Uma única fonte para validar **e** tipar o formulário (`z.infer`) **[RN-07]** |
| @hookform/resolvers | compatível com Zod 4 | Ponte RHF ↔ Zod | `zodResolver(checkoutSchema)` |
| @phosphor-icons/react | 2.x | Ícones | Biblioteca indicada no Style Guide do Figma |
| ViaCEP | API pública | Consulta de CEP | Gratuita, sem chave, CORS liberado: `https://viacep.com.br/ws/{cep}/json/` **[RF-08]** |
| Vitest | 5.x | Testes unitários e de componentes | Usa a configuração do Vite; API compatível com Jest |
| Testing Library (React + user-event + jest-dom) | 16.x | Testes de componentes | Testa como o usuário usa (por papel e rótulo), o que também força acessibilidade |
| oxlint + Prettier | 1.x / 3.x | Lint e formatação | O template atual do Vite já vem com **oxlint** no lugar do ESLint (bem mais rápido, sem configuração extra). Ativamos os plugins `react`, `typescript`, `jsx-a11y` e as regras `rules-of-hooks`, `exhaustive-deps`, `no-explicit-any` e `no-console` (DT-02) |
| Vercel | — | Deploy | Deploy a partir do GitHub; `vercel.json` com *rewrite* para a SPA |
| Playwright (opcional) | 1.x | E2E | Desafio extra; também pode ser usado via Playwright MCP |

**Decisões técnicas registradas na configuração (T-05):**
- **DT-01:** React Router fixado na v7 (ver tabela).
- **DT-02:** oxlint em vez de ESLint, por ser o padrão do template atual do Vite.
- **DT-03:** `"strict": true` declarado explicitamente no `tsconfig.app.json` (o TypeScript atual já liga o strict por padrão, mas deixar explícito documenta a intenção). O template também ativa `erasableSyntaxOnly`, que proíbe `enum`. Por isso o domínio usa *unions* de strings (`'credit' | 'debit' | 'cash'`).
- **DT-04:** Prettier sem ponto e vírgula, aspas simples, `trailingComma: all`, `printWidth: 100`, seguindo o estilo do template.

**Não usaremos:** Redux/Zustand (o Context + `useReducer` atende e é exigido), Axios (o `fetch` nativo com `AbortController` basta), bibliotecas de máscara (a máscara de CEP é uma função de 3 linhas).

---

## 2. Arquitetura

### 2.1 Visão em camadas
```
┌─────────────────────────── main.tsx ───────────────────────────┐
│ <AppThemeProvider>        tema + GlobalStyle      [RF-14]       │
│   <CartProvider>          carrinho + último pedido [RF-03..13]  │
│     <RouterProvider>                                             │
│       DefaultLayout (Header + <Outlet/>)                         │
│         ├── /          → Home                                    │
│         ├── /checkout  → Checkout                                │
│         ├── /success   → Success                                 │
│         └── *          → NotFound                                │
└──────────────────────────────────────────────────────────────────┘
```

### 2.2 Responsabilidades
| Camada | Pasta | Faz | Não faz |
| --- | --- | --- | --- |
| Dados | `data/` | Catálogo tipado de cafés | Lógica, estado |
| Tipos | `types/` | Interfaces e *unions* do domínio | Implementação |
| Regras puras | `utils/`, `reducers/`, `schemas/` | Cálculos, formatação, transições de estado, validação | Acessar DOM, `localStorage` ou rede |
| Estado global | `contexts/` | Ligar reducer + persistência + API pública do contexto | Renderizar UI |
| Hooks | `hooks/` | Lógica reutilizável com efeitos (storage, CEP, tema) | Regras de negócio que podem ser puras |
| Componentes | `components/` | UI reutilizável que recebe dados por Props | Ler `localStorage`, chamar API |
| Páginas | `pages/` | Compor componentes e ligar ao contexto/rotas | Cálculos (delegam para `utils/`) |
| Estilos | `styles/` | Tokens, temas, estilos globais, breakpoints | — |

**Princípio:** tudo que é regra de negócio fica em **funções puras** (fáceis de testar sem renderizar nada). Contextos e páginas apenas as chamam.

---

## 3. Estrutura de diretórios

```
coffee-delivery/
├── public/
│   ├── favicon-16.png, favicon-32.png  # cabeça do mascote IA   [RF-16]
│   ├── apple-touch-icon.png, icon-192.png
├── src/
│   ├── assets/
│   │   ├── brand/                   # mascot-light.png, mascot-dark.png (256 px) [RF-16]
│   │   ├── coffees/                 # 14 PNGs 200×200 exportados do Figma [RF-01]
│   │   └── illustrations/           # hero.png, delivery.svg
│   ├── components/
│   │   ├── Header/                  # Header.tsx, Header.styles.ts
│   │   ├── ThemeToggle/
│   │   ├── CartBadge/
│   │   ├── LocationChip/
│   │   ├── QuantityInput/
│   │   ├── CoffeeCard/
│   │   ├── CoffeeCatalog/
│   │   ├── Tag/
│   │   ├── CartItem/
│   │   ├── CartSummary/
│   │   ├── EmptyState/              # usado por carrinho vazio e pedido inexistente
│   │   ├── TextField/               # input + label + erro acessível
│   │   ├── DeliveryAddressForm/
│   │   ├── PaymentMethodSelector/
│   │   ├── OrderSuccess/
│   │   └── VisuallyHidden/
│   ├── layouts/
│   │   └── DefaultLayout.tsx        # Header + <Outlet/> + skip link
│   ├── pages/
│   │   ├── Home/
│   │   ├── Checkout/
│   │   ├── Success/
│   │   └── NotFound/
│   ├── contexts/
│   │   ├── CartContext.tsx
│   │   └── ThemeContext.tsx
│   ├── reducers/
│   │   └── cart/
│   │       ├── actions.ts
│   │       └── reducer.ts
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── useCart.ts
│   │   ├── useTheme.ts
│   │   └── useCepLookup.ts
│   ├── services/
│   │   └── viaCep.ts                # fetch + tratamento da resposta
│   ├── schemas/
│   │   └── checkoutSchema.ts
│   ├── data/
│   │   └── coffees.ts
│   ├── types/
│   │   ├── coffee.ts
│   │   ├── cart.ts
│   │   └── order.ts
│   ├── utils/
│   │   ├── money.ts                 # formatBRL
│   │   ├── cart.ts                  # subtotal, total, contagem, sanitize
│   │   ├── cep.ts                   # normalizeCep, maskCep
│   │   └── constants.ts             # DELIVERY_FEE_IN_CENTS, MAX_QUANTITY...
│   ├── styles/
│   │   ├── tokens.ts                # paleta bruta (Figma + ajustes)
│   │   ├── themes.ts                # lightTheme, darkTheme (semânticos)
│   │   ├── breakpoints.ts
│   │   ├── global.ts
│   │   └── styled.d.ts              # tipa o DefaultTheme
│   ├── tests/
│   │   ├── setup.ts
│   │   ├── test-utils.tsx           # render com providers
│   │   └── *.test.ts(x)
│   ├── router.tsx
│   ├── App.tsx
│   └── main.tsx
├── docs/  (PRD_SPEC.md, TECH_SPEC.md, TASKS_SPEC.md, AI_USAGE.md, BRANDING.md, branding/, screenshots/)
├── AGENTS.md
├── README.md
├── vercel.json
└── vite.config.ts
```

Os componentes ficam em pastas (`Componente.tsx` + `Componente.styles.ts`), assim o TSX fica limpo e os estilos ficam ao lado.

### 3.1 Componentes
| Componente | Props principais | Requisitos |
| --- | --- | --- |
| `Header` | — (lê `useCart`) | RF-04, RF-07, RF-14, RF-16 |
| `ThemeToggle` | — (lê `useTheme`) | RF-14 |
| `CartBadge` | `count: number` | RF-04 |
| `LocationChip` | `city: string; uf: string` | DP-07 |
| `QuantityInput` | `value; onIncrement; onDecrement; min?; max?; label` | RF-02, RF-05, RN-01 |
| `CoffeeCard` | `coffee: Coffee` | RF-01, RF-02, RF-03 |
| `CoffeeCatalog` | `coffees: Coffee[]` | RF-01 |
| `Tag` | `children` | RF-01 |
| `CartItem` | `coffee; quantity; onIncrement; onDecrement; onRemove` | RF-05 |
| `CartSummary` | `subtotal; deliveryFee; total` (centavos) | RF-10 |
| `EmptyState` | `title; description; actionLabel; actionTo` | RN-09 |
| `TextField` | `label; error?; optional?` + props de `<input>` (via `forwardRef`) | RF-08, RNF-01 |
| `DeliveryAddressForm` | — (usa `useFormContext`) | RF-08 |
| `PaymentMethodSelector` | — (usa `useFormContext`) | RF-09 |
| `OrderSuccess` | `order: Order` | RF-12 |

---

## 4. Tipos do domínio

```ts
// types/coffee.ts
export type CoffeeTag =
  | 'tradicional' | 'gelado' | 'com leite' | 'especial' | 'alcoólico'

export interface Coffee {
  id: string                 // slug estável: 'expresso-tradicional'
  name: string
  description: string
  tags: CoffeeTag[]
  priceInCents: number       // 990 = R$ 9,90           [RN-04]
  image: string              // import do PNG em assets/coffees
}

// types/cart.ts
export interface CartItem {
  coffeeId: Coffee['id']
  quantity: number           // inteiro 1..MAX_QUANTITY  [RN-01]
}

export interface CartState {
  items: CartItem[]
}

// types/order.ts
export type PaymentMethod = 'credit' | 'debit' | 'cash'

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  credit: 'Cartão de Crédito',
  debit: 'Cartão de Débito',
  cash: 'Dinheiro',
}

export interface DeliveryAddress {
  cep: string                // só dígitos: '90250440'
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  uf: string                 // 'RS'
}

export interface OrderItem {
  coffeeId: string
  name: string
  unitPriceInCents: number   // preço congelado no momento do pedido
  quantity: number
}

export interface Order {      // snapshot imutável  [RN-06]
  id: string                 // crypto.randomUUID()
  createdAt: string          // ISO 8601
  items: OrderItem[]
  address: DeliveryAddress
  paymentMethod: PaymentMethod
  subtotalInCents: number
  deliveryFeeInCents: number
  totalInCents: number
  estimatedDelivery: string  // '20 min - 30 min'  [DP-08]
}
```

**Decisão:** o carrinho guarda só `coffeeId` + `quantity`, não o objeto `Coffee` inteiro. Nome, imagem e preço são sempre lidos do catálogo. Assim um preço antigo salvo no `localStorage` nunca é usado, e itens que não existem mais no catálogo são descartados **[RN-10]**. Já o `Order` **copia** nome e preço, porque é um retrato do momento da compra **[RN-06]**.

---

## 5. Estado global: Context API + useReducer

### 5.1 Ações
```ts
// reducers/cart/actions.ts
export type CartAction =
  | { type: 'ADD_ITEM';       payload: { coffeeId: string; quantity: number } }
  | { type: 'INCREMENT_ITEM'; payload: { coffeeId: string } }
  | { type: 'DECREMENT_ITEM'; payload: { coffeeId: string } }
  | { type: 'REMOVE_ITEM';    payload: { coffeeId: string } }
  | { type: 'CLEAR_CART' }
```
Uma *union* discriminada pelo campo `type`: dentro de cada `case`, o TypeScript já sabe o formato do `payload`. Também são exportadas funções criadoras (`addItem(id, qty)` etc.) para os componentes não montarem objetos manualmente.

### 5.2 Regras do reducer (puro, sem mutação)
| Ação | Comportamento | Requisito |
| --- | --- | --- |
| `ADD_ITEM` | Ignora quantidade não inteira ou < 1. Se o café já existe → `map` somando, limitado a `MAX_QUANTITY` (99). Senão → `[...items, novo]` | RF-03, RN-01, RN-02 |
| `INCREMENT_ITEM` | `map`: `quantity + 1`, limitado a 99 | RF-05 |
| `DECREMENT_ITEM` | `map`: `quantity - 1`, **nunca abaixo de 1** | RF-05, RN-01 / DP-01 |
| `REMOVE_ITEM` | `filter` pelo `coffeeId` | RF-05 |
| `CLEAR_CART` | `{ items: [] }` | RF-13 |
| desconhecida | Retorna o estado sem alteração | — |

Quando nada muda (ex.: incrementar um item já em 99), o reducer devolve **a mesma referência** de estado, evitando renderização desnecessária.

### 5.3 API do contexto
```ts
interface CartContextValue {
  items: CartItemWithCoffee[]   // itens enriquecidos com os dados do catálogo
  totalUnits: number            // soma das quantidades       [RF-04]
  subtotalInCents: number                                      // [RF-10]
  deliveryFeeInCents: number
  totalInCents: number
  addItem(coffeeId: string, quantity: number): void
  incrementItem(coffeeId: string): void
  decrementItem(coffeeId: string): void
  removeItem(coffeeId: string): void
  lastOrder: Order | null                                      // [RF-12]
  confirmOrder(data: CheckoutFormData): Order                  // [RF-12, RF-13]
}
```
- Os valores derivados (`totalUnits`, `subtotalInCents`…) são calculados com `useMemo` a partir de `items`; **nunca** ficam guardados no estado (evita dados inconsistentes).
- O `value` do Provider também passa por `useMemo`, e as funções por `useCallback`.
- `useCart()` lança um erro claro se for usado fora do `CartProvider`.

### 5.4 Confirmação do pedido
`confirmOrder(data)`:
1. Garante que há ao menos 1 item válido (senão lança erro; a UI já impede antes) **[RN-10]**.
2. Monta o `Order` (snapshot com `crypto.randomUUID()` e `new Date().toISOString()`).
3. Salva em `lastOrder` (estado + `localStorage`).
4. Despacha `CLEAR_CART`.
5. Devolve o pedido. A página então chama `navigate('/success', { replace: true })`, para que o botão voltar não leve a um checkout vazio.

---

## 6. Hooks, efeitos e persistência

### 6.1 Chaves do localStorage
| Chave | Conteúdo | Quando grava |
| --- | --- | --- |
| `coffee-delivery:cart:v1` | `CartState` | A cada mudança em `items` |
| `coffee-delivery:last-order:v1` | `Order` | Ao confirmar o pedido |
| `coffee-delivery:theme:v1` | `'light' \| 'dark'` | Só quando o usuário clica no toggle |

O sufixo `:v1` permite mudar o formato no futuro sem ler dados incompatíveis **[RNF-04]**.

### 6.2 Hooks
| Hook | Responsabilidade | Detalhes |
| --- | --- | --- |
| `useLocalStorage<T>(key, initial, parse)` | Estado sincronizado com storage | Leitura no **inicializador preguiçoso** do `useState` (sem piscar o estado vazio). `parse` valida o JSON; se der erro ou vier inválido, usa `initial`. Grava em `useEffect`. `try/catch` em leitura e escrita (modo privado, cota cheia). |
| `useCart()` | Acessar o `CartContext` | Erro se usado fora do Provider |
| `useTheme()` | `{ mode, toggleTheme }` | Ver §8 |
| `useCepLookup()` | Consultar o ViaCEP | Ver §6.3 |

**Carrinho:** o `useReducer` usa o 3º argumento (função `init`), que lê o `localStorage` e aplica `sanitizeCart` (remove ids fora do catálogo, quantidades inválidas e duplicadas). Um `useEffect` com dependência `[state]` grava a cada mudança **[RF-06]**.

### 6.3 Consulta de CEP
```ts
type CepStatus = 'idle' | 'loading' | 'success' | 'not-found' | 'error'

function useCepLookup(): {
  status: CepStatus
  lookup(cep: string): Promise<ViaCepAddress | null>
}
```
- `services/viaCep.ts` → `fetchAddressByCep(cep, signal)`:
  - `GET https://viacep.com.br/ws/${cep}/json/`
  - HTTP fora de 2xx → erro `error`
  - Resposta `{ "erro": true }` → `not-found`
  - Sucesso → `{ street: logradouro, neighborhood: bairro, city: localidade, uf }`
- **Timeout** de 8 s com `AbortSignal.timeout`, combinado com o `AbortController` que cancela a consulta anterior quando o CEP muda.
- Gatilho: ao digitar o 8º dígito (`watch('cep')` + `useEffect`), ou no `blur`.
- Em `success`: `setValue` em `street`, `neighborhood`, `city`, `uf` com `{ shouldValidate: true }` e foco no campo **Número**. Campos que vierem vazios na API ficam para o usuário (DP-05).
- Em `not-found`/`error`: `setError('cep', …)` com a mensagem do PRD §3.2; os campos continuam editáveis.
- O botão "Confirmar pedido" fica desabilitado durante `loading` **[RN-10]**.

---

## 7. Rotas, formulário e cálculos

### 7.1 Rotas **[RF-07]**
```ts
// router.tsx
createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: '/',         element: <Home /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/success',  element: <Success /> },
      { path: '*',         element: <NotFound /> },
    ],
  },
])
```
- Links com `<Link>`/`useNavigate`, sem `<a href>` interno.
- A cada troca de rota: `document.title` específico ("Checkout · Coffee Delivery") e foco movido para o `<h1>` da página, para o leitor de tela anunciar a nova tela **[RNF-01]**.
- `vercel.json`: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`, para o F5 em `/checkout` não dar 404 no deploy.
- **Guardas:** `/checkout` com carrinho vazio mostra `EmptyState` (não redireciona, para a pessoa entender o que houve). `/success` sem `lastOrder` mostra `EmptyState` **[RN-09]**.

### 7.2 Schema Zod **[RF-08, RF-09, RN-07]**
```ts
// schemas/checkoutSchema.ts
const UFS = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA',
             'PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'] as const

export const checkoutSchema = z.object({
  cep: z.string().transform(onlyDigits).refine(v => v.length === 8, 'Informe um CEP válido com 8 dígitos'),
  street: z.string().trim().min(3, 'Informe a rua').max(100),
  number: z.string().trim().min(1, 'Informe o número').max(10),
  complement: z.string().trim().max(60, 'Use no máximo 60 caracteres').optional(),
  neighborhood: z.string().trim().min(2, 'Informe o bairro').max(60),
  city: z.string().trim().min(2, 'Informe a cidade').max(60),
  uf: z.string().trim().toUpperCase().pipe(z.enum(UFS, { error: 'UF inválida' })),
  paymentMethod: z.enum(['credit', 'debit', 'cash'], { error: 'Selecione uma forma de pagamento' }),
})

export type CheckoutFormInput = z.input<typeof checkoutSchema>
export type CheckoutFormData  = z.output<typeof checkoutSchema>
```
- `useForm<CheckoutFormInput, unknown, CheckoutFormData>({ resolver: zodResolver(checkoutSchema), mode: 'onTouched' })`: o erro aparece depois que o usuário sai do campo e é revalidado enquanto ele digita.
- `FormProvider` envolve o formulário; `DeliveryAddressForm` e `PaymentMethodSelector` usam `useFormContext`.
- O formulário e o resumo ficam no **mesmo `<form>`**; "Confirmar pedido" é `type="submit"`.
- Envio inválido: o RHF foca o primeiro campo com erro (`shouldFocusError`), e um resumo de erros em `aria-live="assertive"` é anunciado **[RF-11]**.
- A sintaxe exata da mensagem de erro no Zod 4 (`error` em vez de `message`/`errorMap`) deve ser conferida na documentação oficial (Context7) durante a implementação.

### 7.3 Cálculos e formatação **[RF-10, RN-03, RN-04]**
```ts
// utils/constants.ts
export const DELIVERY_FEE_IN_CENTS = 350
export const MIN_QUANTITY = 1
export const MAX_QUANTITY = 99
export const ESTIMATED_DELIVERY = '20 min - 30 min'

// utils/cart.ts — funções puras
countUnits(items)                       // items.reduce((s, i) => s + i.quantity, 0)
calcSubtotal(items, catalog)            // Σ priceInCents × quantity (inteiros)
calcTotal(subtotal)                     // subtotal > 0 ? subtotal + DELIVERY_FEE_IN_CENTS : 0
sanitizeCart(raw, catalog): CartState

// utils/money.ts
const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
formatBRL(cents) => brl.format(cents / 100)   // 2970 → 'R$ 29,70'
formatPriceValue(cents)                      // '9,90' (para o card, onde "R$" é menor)
```
A divisão por 100 só acontece **na exibição**. Atenção nos testes: o `Intl` usa espaço não separável entre "R$" e o número (`'R$ 29,70'`).

---

## 8. Tema, tokens, breakpoints e acessibilidade

### 8.1 Estratégia de tema **[RF-14]**
- `styles/tokens.ts`: cores brutas (Figma + ajustes de acessibilidade).
- `styles/themes.ts`: `lightTheme` e `darkTheme` com **os mesmos nomes semânticos**. Os componentes usam só nomes semânticos (`theme.colors.surface`), nunca hex.
- `styled.d.ts` amplia `DefaultTheme`; o TypeScript reclama se um tema esquecer um token.
- `ThemeContext`: estado inicial = valor salvo → `matchMedia('(prefers-color-scheme: dark)')` → `'light'`. Enquanto não houver escolha salva, acompanha mudanças do sistema. Só grava no `localStorage` quando o usuário clica.
- `GlobalStyle` aplica `color-scheme: light | dark` (barras de rolagem e campos nativos acompanham o tema) e `transition` de cores desligada com `prefers-reduced-motion`.
- Um script curto no `index.html` aplica a cor de fundo do tema salvo antes do React carregar, para evitar o "flash" branco no modo escuro.
- `ThemeToggle`: `<button aria-label="Ativar tema escuro">` (o texto muda conforme o estado) com ícones `Moon`/`Sun`.

### 8.2 Tokens semânticos
Os valores do tema claro seguem o Figma. **Ajustes de acessibilidade** (marcados com ⚠) foram necessários onde o par de cores do Figma não atinge o contraste mínimo da WCAG 2.2 AA (4.5:1 para texto normal; 3:1 para texto grande e componentes de UI). As razões foram calculadas com a fórmula de luminância relativa da WCAG.

| Token | Uso | Claro | Escuro |
| --- | --- | --- | --- |
| `background` | Fundo da página | `#FAFAFA` | `#161312` |
| `surface` | Cards, painéis do checkout, card do carrinho | `#F3F2F2` | `#231F1E` |
| `input` | Fundo dos campos | `#EDEDED` | `#2C2725` |
| `button` | Botões secundários, seletor de pagamento, quantidade | `#E6E5E5` | `#36302E` |
| `hover` | Hover dos secundários | `#D7D5D5` | `#443C39` |
| `divider` | Linhas decorativas entre itens | `#E6E5E5` | `#36302E` |
| `inputBorder` ⚠ | Borda dos campos (3:1) | `#8D8686` (3.05:1) | `#7D7472` (3.24:1) |
| `title` | Títulos | `#272221` | `#F5F2F0` |
| `subtitle` | Subtítulos, valores | `#403937` | `#E8E3E0` |
| `text` | Texto corrido | `#574F4D` (7.14:1 em `surface`) | `#D9D3D0` (11.02:1) |
| `placeholder` ⚠ | Placeholder dos campos | `#6E6766` (4.73:1) | `#A8A09D` (5.74:1) |
| `primary` | Fundo do botão "Confirmar pedido" | `#DBAC2C` | `#DBAC2C` |
| `onPrimary` ⚠ | Texto sobre `primary` | `#272221` (7.44:1)¹ | `#161312` |
| `primaryHover` | Hover do primário | `#C47F17` | `#F1C95A` |
| `accentStrong` | Botão de adicionar ao carrinho (fundo) | `#4B2995` | `#6D3FE0` |
| `onAccent` | Ícone sobre `accentStrong` | `#FFFFFF` (10.24:1) | `#FFFFFF` (6.11:1) |
| `accentHover` | Hover do botão de adicionar | `#8047F8` | `#8047F8` |
| `accentIcon` | Ícones roxos (+, −, lixeira, pagamento) | `#8047F8` (4.0:1 em `button`) | `#B794FF` |
| `accentSoft` | Chip de localização, pagamento selecionado | `#EBE5F9` | `#2E2448` |
| `onAccentSoft` | Texto sobre `accentSoft` | `#4B2995` (8.34:1) | `#D4C2FF` (8.86:1) |
| `selectedBorder` | Borda do pagamento selecionado | `#8047F8` | `#9A6BFF` (4.6:1) |
| `highlight` | Título "Uhu! Pedido confirmado", ícone do endereço | `#C47F17` (3.15:1, texto grande) | `#F1C95A` (11.66:1) |
| `tagBg` | Fundo da tag e do botão do carrinho no Header | `#F1E9C9` | `#3D3218` |
| `tagText` ⚠ | Texto da tag, ícone do carrinho no Header | `#8A5A10` (4.86:1)² | `#F1C95A` (7.94:1) |
| `badgeBg` ⚠ | Fundo do contador | `#8A5A10` | `#F1C95A` |
| `badgeText` | Número do contador | `#FFFFFF` (5.91:1)³ | `#161312` (11.66:1) |
| `focusRing` ⚠ | Contorno de foco (2px + 2px de afastamento) | `#8047F8` (4.82:1) | `#B794FF` (7.65:1) |
| `danger` | Erros de validação | `#C0261C` (5.07:1 em `input`) | `#FF8A80` (6.46:1 em `input`) |
| `success` | Feedback positivo | `#1E7B3A` (4.54:1 em `input`) | `#7DD891` (8.5:1 em `input`) |
| `iconYellowDark`, `iconYellow`, `iconPurple`, `iconNeutral`, `onIcon` | Círculos dos ícones do hero e da tela de sucesso (decorativos) | cores do Figma + branco | iguais, exceto `iconNeutral` = `#36302E` |

¹ No Figma o texto é branco sobre `#DBAC2C` (2.11:1, reprovado).
² No Figma é `#C47F17` sobre `#F1E9C9` (2.7:1, reprovado para texto de 10 px).
³ No Figma é branco sobre `#C47F17` (3.28:1, reprovado para texto de 12 px).

**Teste automatizado:** `src/tests/themes.test.ts` recalcula o contraste de 23 pares de cores em cada tema e falha se algum ficar abaixo do mínimo. Se alguém mudar uma cor no futuro e quebrar a acessibilidade, o teste avisa.

Os ícones dos itens do hero e da tela de sucesso mantêm as cores do Figma (`#C47F17`, `#574F4D`, `#DBAC2C`, `#8047F8`) com ícone branco. São decorativos (`aria-hidden`), porque o texto ao lado carrega a informação.

### 8.3 Tipografia
| Token | Fonte | Tamanho | Peso | Altura de linha |
| --- | --- | --- | --- | --- |
| `titleXL` | Baloo 2 | 48px → 32px no celular | 800 | 130% |
| `titleL` | Baloo 2 | 32px → 24px no celular | 800 | 130% |
| `titleM` | Baloo 2 | 24px | 800 | 130% |
| `titleS` | Baloo 2 | 20px | 700 | 130% |
| `titleXS` | Baloo 2 | 18px | 700 | 130% |
| `textL` | Roboto | 20px → 16px no celular | 400 / 700 | 130% |
| `textM` | Roboto | 16px | 400 / 700 | 130% |
| `textS` | Roboto | 14px | 400 | 130% |
| `textXS` | Roboto | 12px | 700 | 130% |
| `tag` | Roboto | 10px, maiúsculas | 700 | 130% |
| `buttonG` | Roboto | 14px, maiúsculas | 700 | 160% |
| `buttonM` | Roboto | 12px, maiúsculas | 400 | 160% |

Fontes carregadas do Google Fonts com `display=swap` e `preconnect`. Tamanhos em `rem`, para respeitar o zoom do navegador.

### 8.4 Breakpoints (mobile first) **[RF-15]**
```ts
export const breakpoints = { sm: '480px', md: '768px', lg: '1024px', xl: '1280px' }
// uso: ${mq.md} { ... }  →  @media (min-width: 768px)
```
| Área | < 768 px | 768–1023 px | ≥ 1024 px |
| --- | --- | --- | --- |
| Container | padding 16–24px | padding 32px | largura máx. 1120px, centralizado |
| Hero | imagem abaixo do texto, benefícios em 1 coluna | benefícios em 2 colunas | texto e imagem lado a lado (Figma) |
| Catálogo | `repeat(auto-fill, minmax(16rem, 1fr))`: 1 coluna em 320–480, 2 em ~600 | 2–3 colunas | 4 colunas |
| Checkout | endereço → pagamento → resumo, em coluna | idem; campos em 2 colunas | 2 colunas: formulário (≈ 640px) + resumo (≈ 448px) |
| Endereço | todos os campos em 1 coluna | grid do Figma (CEP · Rua · Número/Complemento · Bairro/Cidade/UF) | idem |
| Pagamento | opções empilhadas | 3 lado a lado | 3 lado a lado |
| Sucesso | ilustração abaixo do card, reduzida | idem | lado a lado |
| Header | logo + toggle + chip (só UF) + carrinho | completo | completo, `position: sticky` |

Alvos de toque de no mínimo **44×44 px** no celular: os botões "+" e "−" ganham área clicável maior do que o ícone. Imagens com `width`/`height` declarados para não deslocar o layout.

### 8.5 Checklist de acessibilidade **[RNF-01]**
- HTML semântico: `<header>`, `<main>`, `<nav>`, um `<h1>` por página, catálogo como `<ul>`/`<li>`.
- *Skip link* "Pular para o conteúdo" no início do layout.
- `QuantityInput`: botões com `aria-label="Diminuir quantidade de Latte"`, valor com `aria-live="polite"` e `disabled` nos limites.
- Botão de adicionar: `aria-label="Adicionar 2 Latte ao carrinho"`; depois de clicar, uma mensagem em região `role="status"` confirma a adição.
- Contador do carrinho: link com `aria-label="Carrinho, 6 itens"`.
- Campos: o Figma não mostra rótulo visível, então cada campo terá `<label>` **visualmente oculto** + placeholder com contraste ≥ 4.5:1. "Opcional" faz parte do nome acessível do Complemento. Erros com `aria-invalid` e `aria-describedby`.
- Pagamento: `<fieldset>` + `<legend>` + `input type="radio"` nativos estilizados (setas do teclado funcionam sem código extra). Selecionado indicado por cor **e** borda.
- Foco sempre visível (`:focus-visible` com `focusRing`), nunca `outline: none` sem substituto.
- Imagens de café com `alt` = nome do café; ilustrações decorativas com `alt=""`.

---

## 9. Testes e qualidade

### 9.1 Ferramentas
- **Vitest** + **jsdom** + **@testing-library/react** + **@testing-library/user-event** + **@testing-library/jest-dom**.
- Configuração no bloco `test` do `vite.config.ts` (ambiente `jsdom`, `setupFiles: src/tests/setup.ts`, cobertura `v8`). Sem `globals`: cada teste importa `describe`/`it`/`expect` de `vitest`, o que deixa claro de onde vem cada função. O `setup.ts` chama `cleanup()` e `localStorage.clear()` depois de cada teste.
- `fetch` do ViaCEP simulado com `vi.spyOn(globalThis, 'fetch')`. Os testes nunca dependem da internet.
- `localStorage` limpo em `beforeEach`.
- `tests/test-utils.tsx`: `renderWithProviders(ui, { route })` com Theme + Cart + `MemoryRouter`.
- **Manual/visual:** DevTools nas larguras 320/375/768/1280/1440, Lighthouse, navegação só por teclado, leitor de tela (NVDA ou VoiceOver) em um fluxo completo.
- **Opcional:** Playwright para E2E do fluxo principal (desafio extra).

### 9.2 Casos de teste
| ID | Tipo | Cenário | Esperado | Req. |
| --- | --- | --- | --- | --- |
| TC-01 | Unit | `ADD_ITEM` de café novo | Nova linha com a quantidade | RF-03 |
| TC-02 | Unit | `ADD_ITEM` de café existente (2 + 3) | Uma linha com 5 | RN-02 |
| TC-03 | Unit | `ADD_ITEM` com 0, −1 ou 1.5 | Estado inalterado | RN-01 |
| TC-04 | Unit | `ADD_ITEM` somando acima de 99 | Fica em 99 | DP-03 |
| TC-05 | Unit | `DECREMENT_ITEM` com quantidade 1 | Continua 1 | RN-01 / DP-01 |
| TC-06 | Unit | `INCREMENT`, `REMOVE`, `CLEAR` | Resultado correto; estado anterior **não** foi mutado (`Object.freeze` no estado de entrada) | RF-05 |
| TC-07 | Unit | `countUnits` com Latte ×5 + Expresso ×1 | 6 | RF-04 |
| TC-08 | Unit | Subtotal/total: Expresso ×1 + Latte ×2 | 2970 / 3320 | RF-10, RN-03 |
| TC-09 | Unit | `formatBRL(3320)` | `R$ 33,20` | RN-04 |
| TC-10 | Unit | `sanitizeCart` com id inexistente, quantidade inválida, JSON corrompido | Itens inválidos descartados, sem exceção | RN-10, RNF-04 |
| TC-11 | Unit | Schema: dados válidos; CEP com 7 dígitos; UF "XX"; número vazio; complemento ausente | Válido / erros com as mensagens do PRD; complemento opcional passa | RN-07 |
| TC-12 | Unit | Schema sem `paymentMethod` | Erro "Selecione uma forma de pagamento" | RF-09 |
| TC-13 | Unit | `viaCep` com resposta OK, `{erro:true}`, HTTP 500 e falha de rede | Endereço / `not-found` / `error` / `error` | RF-08 |
| TC-14 | Componente | Card: aumentar para 3 e adicionar | Badge mostra 3; seletor volta a 1 | RF-02, RF-03, RF-04 |
| TC-15 | Componente | Checkout: digitar CEP válido (fetch simulado) | Rua, bairro, cidade e UF preenchidos; foco em Número | RF-08 |
| TC-16 | Componente | Checkout: enviar vazio | Pedido não criado; erros visíveis; foco no CEP | RF-11 |
| TC-17 | Componente | Checkout: fluxo válido completo | Navega para `/success`, mostra endereço e pagamento; carrinho vazio | RF-12, RF-13 |
| TC-18 | Componente | `/success` sem pedido | Estado vazio com link para a Home | RN-09 |
| TC-19 | Componente | Montar com carrinho no `localStorage` | Itens restaurados | RF-06 |
| TC-20 | Componente | ThemeToggle | Alterna e grava; sem valor salvo, respeita `matchMedia` simulado | RF-14 |
| TC-21 | Manual | Larguras 320–1440, nos dois temas | Sem rolagem horizontal; tudo legível | RF-15 |
| TC-22 | Manual | Fluxo completo só com teclado | Todos os controles alcançáveis, foco visível | RNF-01 |

### 9.3 Instruções de execução
```bash
npm install
npm run dev          # http://localhost:5173
npm run test         # Vitest em modo watch
npm run test:run     # execução única (CI)
npm run coverage     # relatório de cobertura (meta: ≥ 80% em utils/, reducers/, schemas/)
npm run lint         # oxlint
npm run format       # prettier --write .
npm run typecheck    # tsc --noEmit
npm run build && npm run preview
```

### 9.4 Padrões de código
- TypeScript `strict`, sem `any`. Para dados externos (`localStorage`, ViaCEP), usar `unknown` e validar.
- Nomes de componentes em PascalCase; hooks começam com `use`; constantes em `UPPER_SNAKE_CASE`.
- Sem `console.log` no código entregue.
- Commits semânticos: `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `style:`, `chore:`.

---

## 10. Rastreabilidade (requisito → onde é implementado)

| Req. | Implementação principal | Testes |
| --- | --- | --- |
| RF-01 | `data/coffees.ts`, `CoffeeCatalog`, `CoffeeCard`, `Tag` | TC-14 |
| RF-02 | `QuantityInput`, estado local no `CoffeeCard` | TC-14 |
| RF-03 | `reducer` `ADD_ITEM`, `CartContext.addItem` | TC-01, TC-02, TC-14 |
| RF-04 | `countUnits`, `CartBadge`, `Header` | TC-07, TC-14 |
| RF-05 | `reducer` `INCREMENT`/`DECREMENT`/`REMOVE`, `CartItem` | TC-05, TC-06 |
| RF-06 | `useLocalStorage`, `init` do reducer, `sanitizeCart` | TC-10, TC-19 |
| RF-07 | `router.tsx`, `DefaultLayout`, `vercel.json` | TC-17 |
| RF-08 | `checkoutSchema`, `DeliveryAddressForm`, `useCepLookup`, `services/viaCep` | TC-11, TC-13, TC-15 |
| RF-09 | `PaymentMethodSelector`, `checkoutSchema` | TC-12 |
| RF-10 | `utils/cart.ts`, `utils/money.ts`, `CartSummary` | TC-08, TC-09 |
| RF-11 | `Checkout` (submit), `EmptyState` | TC-16 |
| RF-12 | `confirmOrder`, `OrderSuccess` | TC-17 |
| RF-13 | `confirmOrder` (snapshot + `CLEAR_CART`) | TC-17 |
| RF-14 | `ThemeContext`, `themes.ts`, `ThemeToggle`, `GlobalStyle` | TC-20 |
| RF-15 | `breakpoints.ts`, estilos de cada componente | TC-21 |
| RF-16 | `assets/brand/`, `public/favicon.svg`, `Header`, README | Revisão visual |
| RN-01..RN-10 | Ver §5.2, §6, §7 | TC-01..TC-13 |
| RNF-01 | §8.5 | TC-22 |
