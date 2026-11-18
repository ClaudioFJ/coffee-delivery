export function onlyDigits(value: string): string {
  return value.replace(/\D/g, '')
}

// '90250440' ou '90250-440' → '90250-440' (máscara aplicada enquanto o usuário digita)
export function maskCep(value: string): string {
  const digits = onlyDigits(value).slice(0, 8)
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits
}

export function isCompleteCep(value: string): boolean {
  return onlyDigits(value).length === 8
}
