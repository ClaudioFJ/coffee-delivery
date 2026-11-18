import { useCallback, useState } from 'react'
import { readStorage, writeStorage } from '../utils/storage'

// Estado do React que também fica salvo no localStorage.
// - A leitura acontece no inicializador preguiçoso do useState (só na 1ª renderização),
//   então a tela já nasce com o valor salvo, sem "piscar" o valor inicial.
// - A gravação acontece no momento do set, só quando o valor muda de verdade.
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  parse: (raw: unknown) => T | null,
) {
  const [value, setValue] = useState<T>(() => readStorage(key, parse) ?? initialValue)

  const setStoredValue = useCallback(
    (next: T) => {
      setValue(next)
      writeStorage(key, next)
    },
    [key],
  )

  return [value, setStoredValue] as const
}
