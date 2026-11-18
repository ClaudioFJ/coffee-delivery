import { describe, expect, it } from 'vitest'
import { coffees } from '../data/coffees'
import type { CoffeeTag } from '../types/coffee'

const VALID_TAGS: CoffeeTag[] = ['tradicional', 'gelado', 'com leite', 'especial', 'alcoólico']

describe('catálogo de cafés [RF-01]', () => {
  it('tem os 14 cafés do Figma', () => {
    expect(coffees).toHaveLength(14)
  })

  it('não repete ids', () => {
    const ids = coffees.map((coffee) => coffee.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it.each(coffees)('$name tem todos os campos preenchidos e válidos', (coffee) => {
    expect(coffee.name.trim()).not.toBe('')
    expect(coffee.description.trim()).not.toBe('')
    expect(coffee.image).toMatch(/\.png$/)
    expect(Number.isInteger(coffee.priceInCents)).toBe(true)
    expect(coffee.priceInCents).toBeGreaterThan(0)
    expect(coffee.tags.length).toBeGreaterThan(0)
    coffee.tags.forEach((tag) => expect(VALID_TAGS).toContain(tag))
  })
})
