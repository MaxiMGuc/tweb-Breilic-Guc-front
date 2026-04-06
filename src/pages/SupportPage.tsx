// Обращение в поддержку.
import { useTranslation } from 'react-i18next'

function SupportPage() {
  const { t } = useTranslation()

  return (
    <section className="help-inner" aria-label={t('supportPage.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('supportPage.title')}</h1>
        <p className="page-lead">{t('supportPage.lead')}</p>
      </header>

      <form className="stack-form support-form">
        <label className="field-block">
          <span>{t('supportPage.topic')}</span>
          <select defaultValue="booking">
            <option value="booking">{t('supportPage.topicBooking')}</option>
            <option value="payment">{t('supportPage.topicPayment')}</option>
            <option value="refund">{t('supportPage.topicRefund')}</option>
            <option value="other">{t('supportPage.topicOther')}</option>
          </select>
        </label>
        <label className="field-block">
          <span>{t('supportPage.bookingRef')}</span>
          <input type="text" placeholder={t('supportPage.bookingRefPlaceholder')} />
        </label>
        <label className="field-block">
          <span>{t('supportPage.message')}</span>
          <textarea rows={5} placeholder={t('supportPage.messagePlaceholder')} />
        </label>
        <label className="field-block">
          <span>{t('supportPage.attachment')}</span>
          <input type="file" />
        </label>
        <button type="button" className="primary-button">
          {t('supportPage.submit')}
        </button>
      </form>
    </section>
  )
}

export default SupportPage
