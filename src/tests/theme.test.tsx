import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { STORAGE_KEYS } from '../utils/storage'
import { mockPrefersDark } from './matchMedia'
import { renderApp } from './test-utils'

const toDark = { name: 'Ativar tema escuro' }
const toLight = { name: 'Ativar tema claro' }
const savedTheme = () => localStorage.getItem(STORAGE_KEYS.theme)

describe('TC-20 · tema claro/escuro [RF-14]', () => {
  it('sem escolha salva, segue o sistema (claro) e não grava nada', () => {
    renderApp()

    expect(screen.getByRole('button', toDark)).toBeInTheDocument()
    expect(savedTheme()).toBeNull()
  })

  it('sem escolha salva, segue o sistema (escuro)', () => {
    mockPrefersDark(true)
    renderApp()

    expect(screen.getByRole('button', toLight)).toBeInTheDocument()
  })

  it('acompanha a troca de tema do sistema com a página aberta', () => {
    const system = mockPrefersDark(false)
    renderApp()

    act(() => system.change(true))

    expect(screen.getByRole('button', toLight)).toBeInTheDocument()
  })

  it('alterna ao clicar e grava a escolha', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('button', toDark))
    expect(screen.getByRole('button', toLight)).toBeInTheDocument()
    expect(savedTheme()).toBe('"dark"')

    await user.click(screen.getByRole('button', toLight))
    expect(screen.getByRole('button', toDark)).toBeInTheDocument()
    expect(savedTheme()).toBe('"light"')
  })

  it('a escolha salva vence a preferência do sistema (persistência após F5)', () => {
    localStorage.setItem(STORAGE_KEYS.theme, '"dark"')
    mockPrefersDark(false)
    renderApp()

    expect(screen.getByRole('button', toLight)).toBeInTheDocument()
  })

  it('ignora valor inválido ou corrompido no storage', () => {
    localStorage.setItem(STORAGE_KEYS.theme, '{não é json')
    renderApp()

    expect(screen.getByRole('button', toDark)).toBeInTheDocument()
  })

  it('aplica o tema ao documento inteiro (<html data-theme>)', async () => {
    const user = userEvent.setup()
    renderApp()
    expect(document.documentElement.dataset.theme).toBe('light')

    await user.click(screen.getByRole('button', toDark))

    expect(document.documentElement.dataset.theme).toBe('dark')
  })
})
