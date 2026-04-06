/**
 * Временная страница после успешного mock-входа.
 * Показывает, что пользователь "авторизован", и дает возможность выйти.
 */
import { useTranslation } from 'react-i18next'

type AccountPageProps = {
  userName: string
  onLogout: () => void
}

export const AccountPage = ({ userName, onLogout }: AccountPageProps) => {
  const { t } = useTranslation()

  return (
    <main className="account-layout">
      <section className="account-card">
        <p className="account-label">{t('account.label')}</p>
        <h1>{t('account.greeting', { name: userName })}</h1>
        <p className="account-text">{t('account.text')}</p>
        <button type="button" className="primary-button" onClick={onLogout}>
          {t('account.logout')}
        </button>
      </section>
    </main>
  )
}
