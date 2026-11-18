import arabeImg from '../assets/coffees/arabe.png'
import cafeComLeiteImg from '../assets/coffees/cafe-com-leite.png'
import capuccinoImg from '../assets/coffees/capuccino.png'
import chocolateQuenteImg from '../assets/coffees/chocolate-quente.png'
import cubanoImg from '../assets/coffees/cubano.png'
import expressoAmericanoImg from '../assets/coffees/expresso-americano.png'
import expressoCremosoImg from '../assets/coffees/expresso-cremoso.png'
import expressoGeladoImg from '../assets/coffees/expresso-gelado.png'
import expressoTradicionalImg from '../assets/coffees/expresso-tradicional.png'
import havaianoImg from '../assets/coffees/havaiano.png'
import irlandesImg from '../assets/coffees/irlandes.png'
import latteImg from '../assets/coffees/latte.png'
import macchiatoImg from '../assets/coffees/macchiato.png'
import mocaccinoImg from '../assets/coffees/mocaccino.png'
import type { Coffee } from '../types/coffee'

// Catálogo local tipado [RF-01, RN-08]. Textos e tags conforme o Figma.
export const coffees: Coffee[] = [
  {
    id: 'expresso-tradicional',
    name: 'Expresso Tradicional',
    description: 'O tradicional café feito com água quente e grãos moídos',
    tags: ['tradicional'],
    priceInCents: 990,
    image: expressoTradicionalImg,
  },
  {
    id: 'expresso-americano',
    name: 'Expresso Americano',
    description: 'Expresso diluído, menos intenso que o tradicional',
    tags: ['tradicional'],
    priceInCents: 990,
    image: expressoAmericanoImg,
  },
  {
    id: 'expresso-cremoso',
    name: 'Expresso Cremoso',
    description: 'Café expresso tradicional com espuma cremosa',
    tags: ['tradicional'],
    priceInCents: 990,
    image: expressoCremosoImg,
  },
  {
    id: 'expresso-gelado',
    name: 'Expresso Gelado',
    description: 'Bebida preparada com café expresso e cubos de gelo',
    tags: ['tradicional', 'gelado'],
    priceInCents: 990,
    image: expressoGeladoImg,
  },
  {
    id: 'cafe-com-leite',
    name: 'Café com Leite',
    description: 'Meio a meio de expresso tradicional com leite vaporizado',
    tags: ['tradicional', 'com leite'],
    priceInCents: 990,
    image: cafeComLeiteImg,
  },
  {
    id: 'latte',
    name: 'Latte',
    description: 'Uma dose de café expresso com o dobro de leite e espuma cremosa',
    tags: ['tradicional', 'com leite'],
    priceInCents: 990,
    image: latteImg,
  },
  {
    id: 'capuccino',
    name: 'Capuccino',
    description: 'Bebida com canela feita de doses iguais de café, leite e espuma',
    tags: ['tradicional', 'com leite'],
    priceInCents: 990,
    image: capuccinoImg,
  },
  {
    id: 'macchiato',
    name: 'Macchiato',
    description: 'Café expresso misturado com um pouco de leite quente e espuma',
    tags: ['tradicional', 'com leite'],
    priceInCents: 990,
    image: macchiatoImg,
  },
  {
    id: 'mocaccino',
    name: 'Mocaccino',
    description: 'Café expresso com calda de chocolate, pouco leite e espuma',
    tags: ['tradicional', 'com leite'],
    priceInCents: 990,
    image: mocaccinoImg,
  },
  {
    id: 'chocolate-quente',
    name: 'Chocolate Quente',
    description: 'Bebida feita com chocolate dissolvido no leite quente e café',
    tags: ['especial', 'com leite'],
    priceInCents: 990,
    image: chocolateQuenteImg,
  },
  {
    id: 'cubano',
    name: 'Cubano',
    description: 'Drink gelado de café expresso com rum, creme de leite e hortelã',
    tags: ['especial', 'alcoólico', 'gelado'],
    priceInCents: 990,
    image: cubanoImg,
  },
  {
    id: 'havaiano',
    name: 'Havaiano',
    description: 'Bebida adocicada preparada com café e leite de coco',
    tags: ['especial'],
    priceInCents: 990,
    image: havaianoImg,
  },
  {
    id: 'arabe',
    name: 'Árabe',
    description: 'Bebida preparada com grãos de café árabe e especiarias',
    tags: ['especial'],
    priceInCents: 990,
    image: arabeImg,
  },
  {
    id: 'irlandes',
    name: 'Irlandês',
    description: 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
    tags: ['especial', 'alcoólico'],
    priceInCents: 990,
    image: irlandesImg,
  },
]
