import { useId, type ComponentProps } from 'react'
import {
  ErrorMessage,
  Field,
  HiddenLabel,
  Hint,
  Input,
  InputWrapper,
  OptionalHint,
} from './TextField.styles'

interface TextFieldProps extends ComponentProps<'input'> {
  label: string
  error?: string
  optional?: boolean
  hint?: string // mensagem informativa, ex.: "Buscando endereço…"
}

// Campo de texto acessível [RNF-01]. O Figma não mostra rótulo visível, então o <label>
// fica oculto visualmente (mas é lido pelo leitor de tela) e o texto aparece como placeholder.
// No React 19, `ref` chega como uma prop comum: o React Hook Form usa ela para ler o valor.
export function TextField({
  label,
  error,
  optional,
  hint,
  id,
  className,
  ...inputProps
}: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`
  const hintId = `${inputId}-hint`

  const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined

  return (
    <Field className={className}>
      <HiddenLabel htmlFor={inputId}>
        {label}
        {optional && ' (opcional)'}
      </HiddenLabel>

      <InputWrapper>
        <Input
          id={inputId}
          placeholder={label}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          data-optional={optional || undefined}
          {...inputProps}
        />
        {optional && <OptionalHint aria-hidden>Opcional</OptionalHint>}
      </InputWrapper>

      {hint && <Hint id={hintId}>{hint}</Hint>}
      {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
    </Field>
  )
}
