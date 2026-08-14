export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function toWhatsAppLink(phone: string): string {
  const digits = phone.replace(/\D/g, '')

  // wa.me exige o número com código do país; o app só cadastra
  // telefones no formato brasileiro, então 55 é fixo.
  return `https://wa.me/55${digits}`
}
