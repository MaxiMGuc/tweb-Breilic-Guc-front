import i18n from '../i18n'

/** Возвращает сообщение об ошибке или null, если значение допустимо. */
export function validateEmail(
  value: string,
  options: { required?: boolean } = {},
): string | null {
  const trimmed = value.trim()
  if (!trimmed) {
    return options.required ? i18n.t('validation.emailRequired') : null
  }
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
  return ok ? null : i18n.t('validation.emailInvalid')
}
