import { CoffeeIcon, PackageIcon, ShoppingCartIcon, TimerIcon } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import {
  Benefit,
  Benefits,
  Content,
  HeroSection,
  IconCircle,
  Illustration,
  Subtitle,
  Title,
  type IconColor,
} from './Hero.styles'

interface BenefitItem {
  icon: Icon
  color: IconColor
  text: string
}

// Ordem igual à do Figma (lida em linhas: esquerda → direita)
const BENEFITS: BenefitItem[] = [
  { icon: ShoppingCartIcon, color: 'iconYellowDark', text: 'Compra simples e segura' },
  { icon: PackageIcon, color: 'iconNeutral', text: 'Embalagem mantém o café intacto' },
  { icon: TimerIcon, color: 'iconYellow', text: 'Entrega rápida e rastreada' },
  { icon: CoffeeIcon, color: 'iconPurple', text: 'O café chega fresquinho até você' },
]

export function Hero() {
  return (
    <HeroSection aria-labelledby="hero-title">
      <Content>
        <Title id="hero-title">Encontre o café perfeito para qualquer hora do dia</Title>
        <Subtitle>
          Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora
        </Subtitle>

        <Benefits>
          {BENEFITS.map(({ icon: BenefitIcon, color, text }) => (
            <Benefit key={text}>
              <IconCircle $color={color} aria-hidden>
                <BenefitIcon size={16} weight="fill" />
              </IconCircle>
              {text}
            </Benefit>
          ))}
        </Benefits>
      </Content>

      <Illustration>
        {/* Ilustração decorativa: o texto ao lado já transmite a mensagem */}
        {/* Fica em public/ com nome fixo para o index.html poder pré-carregá-la (LCP) [RNF-03].
            srcSet: o celular baixa a versão de 600px; telas grandes/retina, a de 952px. */}
        <img
          src="/images/hero-cup-952.webp"
          srcSet="/images/hero-cup-600.webp 600w, /images/hero-cup-952.webp 952w"
          sizes="(min-width: 1024px) 476px, (min-width: 480px) 352px, 100vw"
          alt=""
          width={952}
          height={718}
          fetchPriority="high"
        />
      </Illustration>
    </HeroSection>
  )
}
