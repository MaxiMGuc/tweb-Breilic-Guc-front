// Общая оболочка раздела помощи: боковое меню и вложенные страницы.
import { useTranslation } from 'react-i18next'
import { NavLink, Outlet } from 'react-router-dom'

function HelpLayout() {
  const { t } = useTranslation()

  return (
    <div className="help-layout">
      <aside className="help-sidebar" aria-label={t('helpLayout.sidebarAria')}>
        <nav className="help-sidebar-nav">
          <NavLink
            to="/help"
            end
            className={({ isActive }) => `help-sidebar-link ${isActive ? 'active' : ''}`}
          >
            {t('nav.helpCenter')}
          </NavLink>
          <NavLink
            to="/help/faq"
            className={({ isActive }) => `help-sidebar-link ${isActive ? 'active' : ''}`}
          >
            {t('nav.faq')}
          </NavLink>
          <NavLink
            to="/help/support"
            className={({ isActive }) => `help-sidebar-link ${isActive ? 'active' : ''}`}
          >
            {t('nav.support')}
          </NavLink>
        </nav>
      </aside>
      <div className="help-layout-main">
        <Outlet />
      </div>
    </div>
  )
}

export default HelpLayout
