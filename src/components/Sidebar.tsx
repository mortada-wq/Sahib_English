import { useState } from 'react'
import SidebarBrandToggle from './SidebarBrandToggle'

const NAV_ITEMS = [
  { id: 'docs', label: 'Documentation', icon: 'documentation-icon' },
  { id: 'community', label: 'Community', icon: 'social-icon' },
  { id: 'github', label: 'GitHub', icon: 'github-icon' },
] as const

type Props = {
  children: React.ReactNode
}

export default function Sidebar({ children }: Props) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="app-shell">
      <aside
        className={`sidebar glass${expanded ? ' is-expanded' : ''}`}
        aria-label="Main navigation"
      >
        <div className="sidebar-top">
          <SidebarBrandToggle
            expanded={expanded}
            onToggle={() => setExpanded((open) => !open)}
          />
        </div>

        <nav className="sidebar-nav" aria-label="Sections">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="sidebar-nav-btn"
              title={item.label}
              aria-label={item.label}
            >
              <svg className="sidebar-nav-icon" aria-hidden>
                <use href={`/icons.svg#${item.icon}`} />
              </svg>
              {expanded && (
                <span className="sidebar-nav-label">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {expanded && (
          <p className="sidebar-footer">
            The intelligent companion for the Arabic world.
          </p>
        )}
      </aside>

      <div className="app-main">{children}</div>
    </div>
  )
}

