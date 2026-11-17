# PRD_SPEC — Coffee Delivery

> **Product Requirements Document** · Projeto Final 05 — Disciplina SPA
> Versão 0.1 · Status: rascunho para validação · Última atualização: 17/11/2026
>
> Documentos relacionados: [`TECH_SPEC.md`](./TECH_SPEC.md) · [`TASKS_SPEC.md`](./TASKS_SPEC.md) · [`../AGENTS.md`](../AGENTS.md)

---

## 1. Visão geral

### 1.1 Produto

**Coffee Delivery** é uma Single Page Application de e-commerce para uma cafeteria. O cliente navega por um catálogo de cafés, escolhe quantidades, monta um carrinho, informa o endereço de entrega (com preenchimento automático pelo CEP), escolhe a forma de pagamento e recebe a confirmação de um **pedido fictício**.

### 1.2 Problema

Quem quer pedir um café para entrega precisa de um fluxo curto e confiável: ver as opções com clareza, saber quanto vai pagar antes de confirmar e não perder o que já escolheu se a página for recarregada. Formulários de endereço longos e erros de digitação no CEP são pontos comuns de abandono.

### 1.3 Objetivos do produto

| ID     | Objetivo                                                                | Como medir                                                           |
| ------ | ----------------------------------------------------------------------- | -------------------------------------------------------------------- |
| OBJ-01 | Permitir concluir um pedido do início ao fim sem recarregar a página    | Fluxo Home → Checkout → Sucesso funciona apenas com navegação SPA    |
| OBJ-02 | Mostrar valores corretos e transparentes em todas as etapas             | Subtotal, entrega e total batem com os casos de teste de cálculo     |
| OBJ-03 | Reduzir digitação no endereço                                           | CEP válido preenche rua, bairro, cidade e UF automaticamente         |
| OBJ-04 | Ser utilizável em qualquer tela e por qualquer pessoa                   | Fluxo completo em 320 px a 1440 px, por teclado e com leitor de tela |
| OBJ-05 | Apresentar identidade visual própria, coerente nos temas claro e escuro | Logo gerada com IA aplicada no Header e no favicon; tema persistido  |

### 1.4 Objetivos de aprendizagem (contexto acadêmico)

Consolidar React, TypeScript, componentização, Props, Hooks, Context API, `useReducer`, imutabilidade, métodos de array, React Router, formulários com validação, persistência local, estilização com temas, testes, documentação SPEC e uso crítico de IA.

### 1.5 Público-alvo

- **Persona principal — "Cliente com pressa":** adulto que pede café pelo celular, no trabalho ou em casa. Quer escolher rápido, ver o total e confirmar em poucos toques.
- **Persona secundária — "Cliente no desktop":** compara opções com calma, pede para mais de uma pessoa (quantidades maiores, vários tipos).
- **Requisito transversal:** pessoas que navegam só pelo teclado, usam leitor de tela, preferem tema escuro ou têm sensibilidade a movimento.

---

## 2. Escopo

### 2.1 Dentro do escopo

- Catálogo de **14 cafés** carregado de arquivo local tipado (ver §2.4).
- Carrinho global com adicionar, incrementar, decrementar, remover e limpar.
- Persistência do carrinho, do último pedido confirmado e do tema em `localStorage`.
- Checkout com formulário de endereço validado e consulta à **API pública ViaCEP**.
- Seleção de forma de pagamento (crédito, débito ou dinheiro), apenas informativa.
- Resumo financeiro: total de itens, entrega e total geral.
- Tela de confirmação baseada em um **snapshot** do pedido.
- Tema claro/escuro com alternância no Header.
- Layout responsivo _mobile first_.
- Logo original criada com auxílio de IA, aplicada no Header e no favicon.

### 2.2 Fora do escopo (exclusões)

| Item                                       | Motivo                                                        |
| ------------------------------------------ | ------------------------------------------------------------- |
| Backend, API própria, banco de dados       | Não exigidos (RN-08); o catálogo é local                      |
| Login, cadastro, autenticação              | Não fazem parte do fluxo pedido                               |
| Pagamento real ou integração com gateway   | Pagamento é apenas informativo (RN-05)                        |
| Cálculo de frete por distância/CEP         | Frete fixo definido em RN-03                                  |
| Rastreamento real da entrega               | A previsão exibida é fixa e fictícia                          |
| Estoque, disponibilidade por horário       | Sem backend; todos os cafés estão sempre disponíveis          |
| Histórico de pedidos, cupons, busca/filtro | Desafios extras opcionais (§11); só após o escopo obrigatório |

### 2.3 Telas

| Rota        | Tela                                                   | Referência Figma                        |
| ----------- | ------------------------------------------------------ | --------------------------------------- |
| `/`         | Home: hero + catálogo "Nossos cafés"                   | frame 2:1550                            |
| `/checkout` | Checkout: "Complete seu pedido" + "Cafés selecionados" | frame 217:511 (vazio) e Checkout Filled |
| `/success`  | Confirmação: "Uhu! Pedido confirmado"                  | frame 222:824                           |
| `*`         | Página não encontrada, com link para a Home            | — (decisão própria)                     |

### 2.4 Catálogo inicial

Todos os cafés custam **R$ 9,90** (conforme Figma). As imagens estão em `src/assets/coffees/`.

| #   | Nome                 | Tags                        | Descrição                                                       |
| --- | -------------------- | --------------------------- | --------------------------------------------------------------- |
| 1   | Expresso Tradicional | Tradicional                 | O tradicional café feito com água quente e grãos moídos         |
| 2   | Expresso Americano   | Tradicional                 | Expresso diluído, menos intenso que o tradicional               |
| 3   | Expresso Cremoso     | Tradicional                 | Café expresso tradicional com espuma cremosa                    |
| 4   | Expresso Gelado      | Tradicional, Gelado         | Bebida preparada com café expresso e cubos de gelo              |
| 5   | Café com Leite       | Tradicional, Com leite      | Meio a meio de expresso tradicional com leite vaporizado        |
| 6   | Latte                | Tradicional, Com leite      | Uma dose de café expresso com o dobro de leite e espuma cremosa |
| 7   | Capuccino            | Tradicional, Com leite      | Bebida com canela feita de doses iguais de café, leite e espuma |
| 8   | Macchiato            | Tradicional, Com leite      | Café expresso misturado com um pouco de leite quente e espuma   |
| 9   | Mocaccino            | Tradicional, Com leite      | Café expresso com calda de chocolate, pouco leite e espuma      |
| 10  | Chocolate Quente     | Especial, Com leite         | Bebida feita com chocolate dissolvido no leite quente e café    |
| 11  | Cubano               | Especial, Alcoólico, Gelado | Drink gelado de café expresso com rum, creme de leite e hortelã |
| 12  | Havaiano             | Especial                    | Bebida adocicada preparada com café e leite de coco             |
| 13  | Árabe                | Especial                    | Bebida preparada com grãos de café árabe e especiarias          |
| 14  | Irlandês             | Especial, Alcoólico         | Bebida a base de café, uísque irlandês, açúcar e chantilly      |

---

## 3. Fluxos de usuário

### 3.1 Fluxo principal (caminho feliz)

```
Home                         Checkout                          Sucesso
────                         ────────                          ───────
1. Vê o catálogo             5. Revisa os cafés selecionados   11. Vê endereço, previsão
2. Ajusta a quantidade          (+ / − / Remover)                  e forma de pagamento
   no card (− 1 +)           6. Digita o CEP                   12. Carrinho já está vazio
3. Clica no carrinho roxo    7. Rua, bairro, cidade e UF           (badge some)
   → item adicionado            são preenchidos pela API
4. Clica no ícone do         8. Informa número (+ complemento)
   carrinho no Header        9. Escolhe o pagamento
   → /checkout               10. "Confirmar pedido"  ──────────►  /success
```

### 3.2 Fluxos alternativos e de erro

| ID    | Situação                                                      | Comportamento esperado                                                                          |
| ----- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| FA-01 | Usuário adiciona um café que já está no carrinho              | Quantidade somada à linha existente; nenhuma linha nova (RN-02)                                 |
| FA-02 | Usuário recarrega a página em qualquer etapa                  | Carrinho e tema são restaurados; em `/success`, o último pedido é restaurado                    |
| FA-03 | Usuário abre `/checkout` com carrinho vazio                   | Estado vazio com mensagem e link "Ver cafés"; botão de confirmar indisponível                   |
| FA-04 | CEP com formato inválido (menos de 8 dígitos)                 | Mensagem "Informe um CEP válido com 8 dígitos"; nenhuma consulta é feita                        |
| FA-05 | CEP com formato válido, mas inexistente                       | Mensagem "CEP não encontrado"; campos liberados para preenchimento manual                       |
| FA-06 | API ViaCEP fora do ar / sem internet / demora                 | Mensagem "Não foi possível consultar o CEP. Preencha o endereço manualmente."; campos liberados |
| FA-07 | Usuário tenta confirmar com campos inválidos ou sem pagamento | Pedido não é confirmado; erros aparecem nos campos; foco vai para o primeiro campo com erro     |
| FA-08 | Usuário abre `/success` sem nunca ter confirmado um pedido    | Estado vazio "Nenhum pedido encontrado" com link para a Home                                    |
| FA-09 | Usuário remove o último item no checkout                      | Resumo é substituído pelo estado vazio do carrinho                                              |

---

## 4. Requisitos funcionais

| ID    | Requisito                                                 | Critério de aceite (verificável)                                                                                                                                            | Tela     |
| ----- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| RF-01 | Exibir catálogo com imagem, nome, descrição, preço e tags | Os 14 cafés da §2.4 aparecem na Home com todos os campos; imagens com `alt` descritivo                                                                                      | Home     |
| RF-02 | Selecionar a quantidade antes de adicionar                | Seletor inicia em 1; "−" desabilitado em 1; "+" desabilitado em 99; apenas inteiros                                                                                         | Home     |
| RF-03 | Adicionar ao carrinho acumulando produto repetido         | Adicionar Latte ×2 e depois Latte ×3 resulta em **uma** linha Latte ×5; seletor do card volta a 1; feedback acessível "Latte adicionado ao carrinho"                        | Home     |
| RF-04 | Contador de unidades no Header                            | Com Latte ×5 e Expresso ×1, o badge mostra **6** (soma das unidades, não 2 tipos); sem itens, o badge não aparece                                                           | Todas    |
| RF-05 | Aumentar, diminuir e remover itens no carrinho            | Cada ação atualiza linha, subtotal, total e badge na mesma renderização; "−" desabilitado em 1 (RN-01)                                                                      | Checkout |
| RF-06 | Persistir carrinho com `localStorage`                     | Após F5 em qualquer rota, o carrinho tem os mesmos itens e quantidades                                                                                                      | Todas    |
| RF-07 | Navegar com React Router                                  | Home, Checkout e Sucesso trocam sem recarregar o documento; botão voltar do navegador funciona                                                                              | Todas    |
| RF-08 | Endereço validado com consulta de CEP                     | CEP `90250-440` preenche "Rua João Daniel Martinelli", "Farrapos", "Porto Alegre", "RS"; número e complemento ficam vazios para o usuário; erros dos FA-04 a FA-06 aparecem | Checkout |
| RF-09 | Selecionar forma de pagamento                             | Exatamente uma entre Cartão de crédito, Cartão de débito e Dinheiro; sem seleção, erro "Selecione uma forma de pagamento"                                                   | Checkout |
| RF-10 | Exibir subtotal, entrega e total                          | Expresso ×1 + Latte ×2 → Total de itens R$ 29,70 · Entrega R$ 3,50 · Total R$ 33,20                                                                                         | Checkout |
| RF-11 | Impedir finalização inválida                              | Com carrinho vazio ou formulário inválido, nenhum pedido é criado e a mensagem de erro é anunciada a leitores de tela                                                       | Checkout |
| RF-12 | Confirmar pedido e mostrar resumo                         | `/success` exibe rua + número, bairro, cidade/UF, previsão "20 min - 30 min" e a forma de pagamento escolhida                                                               | Sucesso  |
| RF-13 | Limpar carrinho preservando o pedido                      | Após confirmar, badge some e o checkout fica vazio; `/success` continua correto, inclusive após F5                                                                          | Sucesso  |
| RF-14 | Alternar light/dark mode                                  | Botão no Header troca o tema de **todas** as telas e componentes; escolha persiste após F5; sem escolha salva, segue `prefers-color-scheme`                                 | Todas    |
| RF-15 | Layout responsivo                                         | Fluxo completo sem rolagem horizontal em 320, 375, 768, 1280 e 1440 px; alvos de toque ≥ 44×44 px                                                                           | Todas    |
| RF-16 | Logo original criada com IA                               | Logo no Header (versões para fundo claro e escuro), favicon e seção "Branding com IA" no README                                                                             | Todas    |

---

## 5. Regras de negócio

| ID    | Regra                       | Decisão adotada                                                                                                                                                                                                                                                            |
| ----- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RN-01 | **Quantidades**             | Adição só aceita inteiros de **1 a 99**. No carrinho, **"−" fica desabilitado quando a quantidade é 1**; para tirar o café, usa-se o botão "Remover". Motivo: evita remoção acidental, principalmente no toque. A soma de adições também respeita o máximo de 99 por café. |
| RN-02 | **Produto único**           | O carrinho é identificado pelo `id` do café. Adicionar um café existente soma a quantidade na mesma linha.                                                                                                                                                                 |
| RN-03 | **Cálculo e frete**         | `subtotal = Σ (preço unitário × quantidade)`; `total = subtotal + entrega`. **Entrega fixa de R$ 3,50** por pedido, definida em uma única constante. Com carrinho vazio, nenhum total é exibido.                                                                           |
| RN-04 | **Valores monetários**      | Todos os preços são armazenados e calculados **em centavos (inteiros)**: R$ 9,90 = `990`. A conversão para texto acontece só na exibição, com `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`.                                                        |
| RN-05 | **Pagamento**               | Escolha apenas informativa ("O pagamento é feito na entrega"). Nenhum dado de cartão é solicitado.                                                                                                                                                                         |
| RN-06 | **Persistência**            | Carrinho salvo a cada alteração. Ao confirmar, é criado um **snapshot** do pedido (itens, valores, endereço, pagamento, data) salvo separadamente como "último pedido". Limpar o carrinho não altera o snapshot.                                                           |
| RN-07 | **Endereço**                | Campos e validações na §5.1. Consulta ao **ViaCEP** quando o CEP tiver 8 dígitos. Campos preenchidos pela API **continuam editáveis** para correção.                                                                                                                       |
| RN-08 | **Dados**                   | Catálogo em arquivo local tipado. Única chamada externa: ViaCEP.                                                                                                                                                                                                           |
| RN-09 | **Estados vazios**          | Mensagens específicas para carrinho vazio (Checkout) e pedido inexistente (Sucesso), sempre com um caminho de volta para a Home.                                                                                                                                           |
| RN-10 | **Bloqueio de confirmação** | "Confirmar pedido" só gera pedido se o carrinho tiver ≥ 1 item válido (existente no catálogo), o formulário for válido e houver forma de pagamento. Também fica bloqueado enquanto a consulta de CEP estiver em andamento.                                                 |

### 5.1 Validação do endereço

| Campo       | Obrigatório | Regra                                                               | Mensagem de erro                      |
| ----------- | ----------- | ------------------------------------------------------------------- | ------------------------------------- |
| CEP         | Sim         | 8 dígitos; aceita com ou sem hífen; exibido com máscara `00000-000` | "Informe um CEP válido com 8 dígitos" |
| Rua         | Sim         | 3 a 100 caracteres                                                  | "Informe a rua"                       |
| Número      | Sim         | 1 a 10 caracteres; aceita letras (ex.: `102A`, `S/N`)               | "Informe o número"                    |
| Complemento | Não         | Até 60 caracteres                                                   | "Use no máximo 60 caracteres"         |
| Bairro      | Sim         | 2 a 60 caracteres                                                   | "Informe o bairro"                    |
| Cidade      | Sim         | 2 a 60 caracteres                                                   | "Informe a cidade"                    |
| UF          | Sim         | Uma das 27 siglas brasileiras, maiúsculas                           | "UF inválida"                         |
| Pagamento   | Sim         | `credit`, `debit` ou `cash`                                         | "Selecione uma forma de pagamento"    |

### 5.2 Estados da consulta de CEP

`idle` → (8 dígitos) → `loading` → `success` | `not-found` | `error`.
Durante `loading`, o campo mostra um indicador com texto acessível ("Buscando endereço…"). Um novo CEP cancela a consulta anterior.

---

## 6. Requisitos não funcionais

| ID     | Categoria           | Requisito                                                                                                                                                                                                                                                                                          |
| ------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF-01 | Acessibilidade      | Referência **WCAG 2.2 AA**: contraste ≥ 4.5:1 em textos e ≥ 3:1 em componentes de UI nos dois temas; foco visível; navegação completa por teclado; `label` associado a todo campo; erros ligados ao campo com `aria-describedby` e anunciados com `aria-live`; botões de ícone com nome acessível. |
| RNF-02 | Responsividade      | _Mobile first_. Larguras testadas: 320, 375/390, 768, 1280/1440 px. Sem rolagem horizontal involuntária, texto sobreposto ou imagem deformada.                                                                                                                                                     |
| RNF-03 | Desempenho          | Lighthouse (mobile) ≥ 90 em Performance e Accessibility; imagens com largura e altura definidas; fontes com `font-display: swap`.                                                                                                                                                                  |
| RNF-04 | Persistência        | Leitura do `localStorage` tolerante a dados corrompidos ou ausentes (volta ao estado inicial, sem quebrar a aplicação). Chaves versionadas (ex.: `coffee-delivery:cart:v1`).                                                                                                                       |
| RNF-05 | Compatibilidade     | Duas últimas versões de Chrome, Edge, Firefox e Safari (desktop e mobile).                                                                                                                                                                                                                         |
| RNF-06 | Movimento           | Animações respeitam `prefers-reduced-motion`.                                                                                                                                                                                                                                                      |
| RNF-07 | Qualidade de código | TypeScript em modo `strict`, sem `any`; estado nunca mutado diretamente; lint (oxlint) sem erros; console limpo em produção.                                                                                                                                                                       |
| RNF-08 | Privacidade         | Nenhum dado pessoal sai do navegador, exceto o CEP enviado ao ViaCEP.                                                                                                                                                                                                                              |

---

## 7. Marca, logo e temas

### 7.1 Marca

- **Nome:** Coffee Delivery (mantido).
- **Conceito:** café de cafeteria entregue rápido e quentinho. Amarelo = energia e calor do café; roxo = toque moderno e digital da entrega.
- **Tipografia:** Baloo 2 (títulos) e Roboto (textos), conforme Style Guide.
- **Ícones:** Phosphor Icons, peso `fill` nos destaques, conforme Figma.

### 7.2 Logo criada com IA (RF-16)

- Gerar **ao menos uma proposta original** em ferramenta de IA de imagem; não reutilizar a logo do protótipo.
- Entregáveis: versão para fundo claro, versão para fundo escuro, símbolo isolado para favicon (legível em 16×16 e 32×32 px).
- Formato preferencial SVG (ou PNG @2x), salvo em `src/assets/brand/` e favicon em `public/`.
- Documentar em "Branding com IA" (README): ferramenta, prompt, resultados, escolha, ajustes manuais e verificação dos termos de uso.

### 7.3 Paleta (base do Figma)

| Token Figma        | Hex                   | Uso                                                          |
| ------------------ | --------------------- | ------------------------------------------------------------ |
| yellow-dark        | `#C47F17`             | Títulos de destaque, ícones, hover do primário               |
| yellow             | `#DBAC2C`             | Botão primário (Confirmar pedido)                            |
| yellow-light       | `#F1E9C9`             | Fundo de tags e do ícone do carrinho                         |
| purple-dark        | `#4B2995`             | Botão de adicionar ao carrinho, texto do chip de localização |
| purple             | `#8047F8`             | Ícones, hover do botão de carrinho, selecionado              |
| purple-light       | `#EBE5F9`             | Fundo do chip de localização e do pagamento selecionado      |
| base-title → white | `#272221` … `#FFFFFF` | Textos, superfícies, inputs, bordas                          |

### 7.4 Temas claro e escuro (RF-14)

- O tema claro segue o Figma. O tema escuro é **derivado** (não existe no Figma) e será definido no `TECH_SPEC.md` como tokens semânticos (`background`, `surface`, `text`, `border`, `primary`, `accent`, `feedback`…), não como troca de cor de fundo apenas.
- Cards, inputs, seletor de pagamento, carrinho, badge, tela de sucesso e ilustração precisam ser legíveis nos dois temas.
- Prioridade da escolha: **escolha salva** → `prefers-color-scheme` → claro.

---

## 8. Critérios de aceite gerais e decisões de produto

### 8.1 Definição de pronto do produto

O produto está pronto quando todos os itens abaixo forem verdadeiros:

- [ ] RF-01 a RF-16 atendidos e verificados.
- [ ] RN-01 a RN-10 cobertas por testes automatizados onde houver lógica (reducer, cálculos, validação, formatação).
- [ ] Fluxo principal (§3.1) e fluxos FA-01 a FA-09 demonstráveis.
- [ ] Telas validadas em 320, 375, 768 e 1440 px, nos temas claro e escuro.
- [ ] Aplicação publicada (Vercel ou Netlify) e README com screenshots.

### 8.2 Registro de decisões

| ID    | Decisão                                                                                         | Alternativa descartada         | Motivo                                                                         |
| ----- | ----------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------ |
| DP-01 | "−" desabilitado em 1 no carrinho                                                               | Remover ao chegar a 0          | Evita remoção acidental; o botão "Remover" já cumpre esse papel                |
| DP-02 | Frete fixo R$ 3,50                                                                              | Frete grátis acima de um valor | Fiel ao Figma; regra simples e testável                                        |
| DP-03 | Quantidade máxima 99 por café                                                                   | Sem limite                     | Evita valores absurdos e layout quebrado no seletor                            |
| DP-04 | Cálculos em centavos                                                                            | Cálculos com `number` decimal  | Evita erros de ponto flutuante (ex.: `0.1 + 0.2`)                              |
| DP-05 | Campos preenchidos pela API continuam editáveis                                                 | Travar os campos               | O ViaCEP às vezes retorna dados incompletos (CEPs gerais de cidade)            |
| DP-06 | Último pedido persistido em `localStorage`                                                      | Pedido só em memória           | `/success` continua correto após F5 (RF-13)                                    |
| DP-07 | Chip de localização no Header mostra cidade/UF do último pedido; sem pedido, o chip fica oculto | Texto fixo "Porto Alegre, RS"  | Evita mostrar um dado falso ao usuário                                         |
| DP-08 | Previsão de entrega fixa "20 min - 30 min"                                                      | Previsão calculada             | Sem backend nem rastreamento real                                              |
| DP-09 | Nome "Coffee Delivery" mantido, com logo nova criada por IA                                     | Marca autoral                  | Foco no fluxo funcional; a identidade nova vem pela logo e pelo tema escuro    |
| DP-10 | Estilização com styled-components                                                               | Tailwind CSS                   | Ferramenta do desafio original; `ThemeProvider` facilita os temas claro/escuro |

---

## 9. Riscos

| Risco                                       | Impacto                      | Mitigação                                                             |
| ------------------------------------------- | ---------------------------- | --------------------------------------------------------------------- |
| ViaCEP indisponível no dia da apresentação  | Fluxo de endereço travado    | Preenchimento manual sempre possível (DP-05); testes usam mock da API |
| Tema escuro com contraste insuficiente      | Reprovação em acessibilidade | Validar pares de cores com verificador de contraste antes de aplicar  |
| Dados antigos/corrompidos no `localStorage` | Tela em branco               | Validação na leitura e chaves versionadas (RNF-04)                    |
| Imagem gerada por IA com restrição de uso   | Problema de direitos         | Conferir termos da ferramenta e registrar no README                   |

---

## 10. Rastreabilidade

Cada requisito deste documento é referenciado no `TECH_SPEC.md` (onde é implementado) e no `TASKS_SPEC.md` (em qual tarefa). Alterações de escopo devem atualizar os três documentos.

## 11. Desafios extras (após o escopo obrigatório)

Busca e filtro por tag · Histórico de pedidos local · Cupom de desconto · Testes E2E com Playwright + GitHub Actions · Animações com `prefers-reduced-motion` · Página de detalhes do produto.
