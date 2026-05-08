// Центр помощи: краткая инструкция по покупке билетов (вложена в HelpLayout).
import { useTranslation } from 'react-i18next'

function HelpPage() {
  const { t } = useTranslation()

  return (
    <section className="help-inner help-page" aria-label={t('helpPage.aria')}>
      <h2>{t('helpPage.title')}</h2>
      <p className="help-intro">{t('helpPage.intro')}</p>

      <ol className="help-steps">
        <li>
          <strong>{t('helpPage.step1Title')}</strong> {t('helpPage.step1')}
        </li>
        <li>
          <strong>{t('helpPage.step2Title')}</strong> {t('helpPage.step2')}
        </li>
        <li>
          <strong>{t('helpPage.step3Title')}</strong> {t('helpPage.step3')}
        </li>
        <li>
          <strong>{t('helpPage.step4Title')}</strong> {t('helpPage.step4')}
        </li>
        <li>
          <strong>{t('helpPage.step5Title')}</strong> {t('helpPage.step5')}
        </li>
        <li>
          <strong>{t('helpPage.step6Title')}</strong> {t('helpPage.step6')}
        </li>
      </ol>

      <div className="help-tips">
        <h3>{t('helpPage.tipsTitle')}</h3>
        <ul>
          <li>{t('helpPage.tip1')}</li>
          <li>{t('helpPage.tip2')}</li>
          <li>{t('helpPage.tip3')}</li>
        </ul>
      </div>
    </section>
  )
}

export default HelpPage
