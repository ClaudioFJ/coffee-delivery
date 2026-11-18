# Branding com IA — Coffee Delivery

> Atende ao **RF-16** e à seção 4 do enunciado. Este conteúdo também vai resumido para o README (T-33).
> Campos marcados com ✏️ precisam ser preenchidos ou confirmados pelo aluno.

## 1. Conceito da marca

**Nome:** Coffee Delivery (mantido, decisão DP-09).

**Mascote:** uma galinha descolada, de óculos escuros redondos e tênis, andando com um copo de café para viagem na mão.

**Por quê:**
- **Movimento:** ela está andando, com o corpo inclinado para frente. Isso comunica *entrega* sem precisar desenhar moto ou caixa.
- **Personalidade:** óculos e tênis dão um tom bem-humorado e jovem, que diferencia a marca das cafeterias "sérias".
- **Coerência com o protótipo:** as cores são exatamente as do Style Guide do Figma. O amarelo (`#DBAC2C`) é o corpo e o roxo (`#4B2995` / `#8047F8`) são o contorno, a crista e os detalhes.

## 2. Ferramenta e prompt

| Campo | Registro |
| --- | --- |
| Ferramenta | ✏️ (ex.: ChatGPT / Gemini / …) |
| Data | 17/11/2026 |
| Origem da ideia | Uma foto de galinha de óculos e tênis serviu de referência de conceito. A foto **não** foi usada como logo, porque não foi gerada por IA e tem direitos desconhecidos |
| Variações geradas | ✏️ (quantas e por que esta foi escolhida) |

**Prompt utilizado** ✏️ *(confirmar se foi este ou colar o texto exato):*

> Logo minimalista em estilo flat vector para uma cafeteria delivery chamada "Coffee Delivery". Mascote: uma galinha estilizada e descolada usando óculos escuros redondos e tênis, segurando um copo de café para viagem. Formas geométricas simples e traços grossos, legível em tamanho pequeno. Paleta restrita: roxo #4B2995, roxo #8047F8, amarelo #DBAC2C e amarelo escuro #C47F17. Fundo branco liso, sem sombras, sem degradês, sem texto, centralizado, formato quadrado.

**Por que o prompt pede "sem texto":** ferramentas de imagem costumam errar letras. O nome "Coffee Delivery" é escrito em HTML ao lado do mascote, com a fonte Baloo 2. Isso garante texto nítido, acessível a leitores de tela e que muda de cor com o tema.

**Resultado original:** [`branding/original-ia.jpg`](./branding/original-ia.jpg)

## 3. Curadoria e ajustes feitos depois da geração

| Ajuste | Motivo |
| --- | --- |
| Remoção do fundo branco (PNG transparente) e recorte das margens | Encaixar no Header e funcionar sobre qualquer cor de fundo |
| **Versão para tema escuro** com contorno externo claro (efeito "adesivo", `#F5F2F0`) | O contorno roxo-escuro quase desaparece sobre o fundo `#161312` |
| **Símbolo/favicon** só com a cabeça, sobre quadrado arredondado `#F1E9C9` | O corpo inteiro vira uma mancha em 16 px; a cabeça de óculos continua reconhecível |
| Exportação em 256 px para a interface | No Header ela aparece com ~40–48 px; 256 px garante nitidez em telas retina sem pesar no carregamento |

**Pontos observados na imagem gerada** (típicos de IA, aceitos conscientemente):
- A galinha tem duas asas e um "braço" segurando o copo. Anatomicamente estranho, mas lido como estilo cartoon.
- O símbolo no copo é abstrato (não é texto nem a marca de outra empresa).

## 4. Testes de legibilidade

| Teste | Resultado | Evidência |
| --- | --- | --- |
| Mascote em 200, 64, 40, 32 e 16 px, fundo claro e escuro | Reconhecível até 32 px; em 16 px vira mancha, por isso o favicon usa só a cabeça | [`teste-tamanhos.png`](./branding/teste-tamanhos.png) |
| Favicon em 128, 64, 32 e 16 px, aba clara e escura | Cabeça de óculos reconhecível em 16 px | [`teste-favicon.png`](./branding/teste-favicon.png) |

## 5. Arquivos

| Arquivo | Uso |
| --- | --- |
| `src/assets/brand/mascot-light.png` | Header no tema claro |
| `src/assets/brand/mascot-dark.png` | Header no tema escuro |
| `public/favicon-16.png`, `public/favicon-32.png` | Ícone da aba |
| `public/apple-touch-icon.png`, `public/icon-192.png` | Atalho na tela inicial do celular |
| `docs/branding/symbol-512.png` | Símbolo em alta resolução (README, apresentação) |
| `docs/branding/original-ia.jpg` | Imagem original gerada pela IA |

## 6. Direitos de uso ✏️

Conferir os termos da ferramenta usada e registrar aqui. Exemplo: "Os termos de uso da [ferramenta], consultados em dd/mm/aaaa, atribuem ao usuário os direitos sobre as imagens geradas, inclusive para uso comercial". O projeto é acadêmico e sem fins comerciais.
