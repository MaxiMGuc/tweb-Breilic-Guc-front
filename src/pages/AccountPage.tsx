/**
 * Временная страница после успешного mock-входа.
 * Показывает, что пользователь "авторизован", и дает возможность выйти.
 */
type AccountPageProps = {
  userName: string
  onLogout: () => void
}

export const AccountPage = ({ userName, onLogout }: AccountPageProps) => {
  return (
    <main className="account-layout">
      <section className="account-card">
        <p className="account-label">Вы вошли в аккаунт</p>
        <h1>Привет, {userName}!</h1>
        <p className="account-text">
          Сейчас работает временный режим входа без backend. Позже этот экран будет подключен к C#
          API и базе данных.
        </p>
        <button type="button" className="primary-button" onClick={onLogout}>
          Выйти
        </button>
      </section>
    </main>
  )
}

