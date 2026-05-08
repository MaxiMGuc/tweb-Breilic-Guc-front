// Поле email: type=email, inputMode, проверка при потере фокуса.
import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { validateEmail } from '../../lib/validation'

type EmailFieldProps = {
  id?: string
  label: string
  name?: string
  autoComplete?: string
  placeholder?: string
  required?: boolean
  /** Обёртка: field-block (по умолчанию), field-inline и т.п. */
  wrapperClassName?: string
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
}

function EmailField({
  id: idProp,
  label,
  name = 'email',
  autoComplete = 'email',
  placeholder,
  required = false,
  wrapperClassName = 'field-block',
  defaultValue = '',
  value: valueProp,
  onChange: onChangeProp,
}: EmailFieldProps) {
  useTranslation()
  const reactId = useId()
  const id = idProp ?? `email-${reactId.replace(/:/g, '')}`
  const errorId = `${id}-error`
  const controlled = valueProp !== undefined
  const [internal, setInternal] = useState(defaultValue)
  const value = controlled ? valueProp : internal
  const [touched, setTouched] = useState(false)

  const error = touched ? validateEmail(value, { required }) : null
  const invalid = Boolean(error)

  const setValue = (next: string) => {
    if (!controlled) {
      setInternal(next)
    }
    onChangeProp?.(next)
  }

  return (
    <label className={wrapperClassName}>
      <span>{label}</span>
      <input
        id={id}
        name={name}
        type="email"
        inputMode="email"
        autoComplete={autoComplete}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        placeholder={placeholder}
        required={required}
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
      />
      {invalid ? (
        <span id={errorId} className="field-error" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  )
}

export default EmailField
