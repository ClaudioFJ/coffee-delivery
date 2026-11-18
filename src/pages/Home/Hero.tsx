import { CoffeeIcon, PackageIcon, ShoppingCartIcon, TimerIcon } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import heroDark from '../../assets/illustrations/hero-mascot-dark.webp'
import heroLight from '../../assets/illustrations/hero-mascot-light.webp'
import { useTheme } from '../../hooks/useTheme'
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
  const { mode } = useTheme()

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
        <img
          src={mode === 'dark' ? heroDark : heroLight}
          alt=""
          width={558}
          height={558}
          fetchPriority="high"
        />
      </Illustration>
    </HeroSection>
  )
}
