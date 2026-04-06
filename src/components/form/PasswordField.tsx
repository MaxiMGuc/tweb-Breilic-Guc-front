// Поле пароля; при showStrengthHint — рекомендации по надёжному паролю.
import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'

type PasswordFieldProps = {
  id?: string
  label: string
  name?: string
  autoComplete: string
  /** Подсказки для нового пароля (регистрация, смена пароля). */
  showStrengthHint?: boolean
  wrapperClassName?: string
  required?: boolean
  minLength?: number
  /** Показать кнопку «показать / скрыть» пароль (вход, регистрация и т.д.). */
  showPasswordToggle?: boolean
}

function PasswordField({
  id: idProp,
  label,
  name = 'password',
  autoComplete,
  showStrengthHint = false,
  wrapperClassName = 'field-block',
  required = false,
  minLength: minLengthProp,
  showPasswordToggle = true,
}: PasswordFieldProps) {
  const { t } = useTranslation()
  const minLength = minLengthProp ?? (showStrengthHint ? 8 : undefined)
  const reactId = useId()
  const id = idProp ?? `password-${reactId.replace(/:/g, '')}`
  const hintId = `${id}-hint`
  const [visible, setVisible] = useState(false)
  const inputType = showPasswordToggle && visible ? 'text' : 'password'

  const inputEl = (
    <input
      id={id}
      name={name}
      type={inputType}
      autoComplete={autoComplete}
      required={required}
      minLength={minLength}
      aria-describedby={showStrengthHint ? hintId : undefined}
    />
  )

  return (
    <label className={wrapperClassName}>
      <span>{label}</span>
      {showPasswordToggle ? (
        <div className="password-input-wrap">
          {inputEl}
          <button
            type="button"
            className="password-toggle"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? t('password.hideAria') : t('password.showAria')}
            aria-pressed={visible}
          >
            {visible ? t('password.hide') : t('password.show')}
          </button>
        </div>
      ) : (
        inputEl
      )}
      {showStrengthHint ? (
        <div id={hintId} className="password-hint">
          <p className="password-hint-title">{t('password.hintTitle')}</p>
          <ul>
            <li>{t('password.hintLen')}</li>
            <li>{t('password.hintCase')}</li>
            <li>{t('password.hintNum')}</li>
            <li>{t('password.hintSpecial')}</li>
          </ul>
        </div>
      ) : null}
    </label>
  )
}

export default PasswordField
