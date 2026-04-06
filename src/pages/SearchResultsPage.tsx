// Результаты поиска: фильтры и список предложений (данные статические).
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function SearchResultsPage() {
  const { t } = useTranslation()

  return (
    <section className="page-shell" aria-label={t('searchResults.aria')}>
      <header className="page-header">
        <h1 className="page-title">{t('searchResults.title')}</h1>
        <p className="page-lead">{t('searchResults.lead')}</p>
      </header>

      <div className="results-layout">
        <aside className="results-filters" aria-label={t('searchResults.filtersAria')}>
          <h2 className="filters-title">{t('searchResults.filters')}</h2>
          <label className="filter-block">
            <span>{t('searchResults.maxPrice')}</span>
            <input type="range" min={0} max={2000} defaultValue={800} />
          </label>
          <fieldset className="filter-block">
            <legend>{t('searchResults.stops')}</legend>
            <label>
              <input type="checkbox" name="stops" /> {t('searchResults.any')}
            </label>
            <label>
              <input type="checkbox" name="stops" /> {t('searchResults.nonStop')}
            </label>
            <label>
              <input type="checkbox" name="stops" /> {t('searchResults.oneStop')}
            </label>
          </fieldset>
          <label className="filter-block">
            <span>{t('searchResults.airlines')}</span>
            <select multiple size={4} defaultValue={[]}>
              <option value="">{t('searchResults.allAirlines')}</option>
              <option value="a1">Airline A</option>
              <option value="a2">Airline B</option>
            </select>
          </label>
          <label className="filter-block">
            <span>{t('searchResults.departureTime')}</span>
            <input type="text" placeholder={t('searchResults.depPlaceholder')} />
          </label>
          <button type="button" className="secondary-button">
            {t('searchResults.resetFilters')}
          </button>
        </aside>

        <div className="results-main">
          <div className="results-toolbar">
            <label className="field-inline">
              <span>{t('searchResults.sort')}</span>
              <select defaultValue="price">
                <option value="price">{t('searchResults.price')}</option>
                <option value="duration">{t('searchResults.duration')}</option>
                <option value="departure">{t('searchResults.departure')}</option>
              </select>
            </label>
            <div className="toolbar-actions">
              <button type="button" className="ghost-button small">
                {t('searchResults.saveSearch')}
              </button>
              <button type="button" className="ghost-button small">
                {t('searchResults.share')}
              </button>
            </div>
          </div>

          <ul className="ticket-list">
            <li>
              <article className="ticket-card">
                <div>
                  <p className="airline">Sample Airline</p>
                  <p className="route">Moscow (SVO) → Istanbul (IST)</p>
                  <p className="date">28 Mar · 3h 40m · direct</p>
                </div>
                <div className="ticket-card-right">
                  <p className="price">{t('searchResults.fromPrice')}</p>
                  <Link to="/search/results/demo-ticket-1" className="text-button">
                    {t('searchResults.select')}
                  </Link>
                </div>
              </article>
            </li>
            <li>
              <article className="ticket-card">
                <div>
                  <p className="airline">Another Carrier</p>
                  <p className="route">Moscow (VKO) → Istanbul (SAW)</p>
                  <p className="date">28 Mar · 5h 10m · 1 stop</p>
                </div>
                <div className="ticket-card-right">
                  <p className="price">{t('searchResults.fromPrice2')}</p>
                  <Link to="/search/results/demo-ticket-2" className="text-button">
                    {t('searchResults.select')}
                  </Link>
                </div>
              </article>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SearchResultsPage
