import Link from 'next/link'
import type { NavLink, SiteSettings } from '@/lib/content/types'
import { BrandLogo } from './BrandLogo'

const DEFAULT_COLUMNS: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Services',
    links: [
      { label: 'Web Design', href: '/services/web-design' },
      { label: 'Web Application', href: '/services/web-app' },
      { label: 'SEO', href: '/services/seo' },
      { label: 'SaaS Platform', href: '/services/saas' },
    ],
  },
  {
    heading: 'Studio',
    links: [
      { label: 'Work', href: '/work' },
      { label: 'About', href: '/about' },
      { label: 'Process', href: '/services#timeline' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Industries',
    links: [
      { label: 'E-commerce', href: '/industries' },
      { label: 'SaaS', href: '/industries' },
      { label: 'Fintech', href: '/industries' },
      { label: 'Healthcare', href: '/industries' },
    ],
  },
]

/** Shared footer. Markup/classes ported 1:1 from templates (footer). */
export function Footer({ settings }: { settings: SiteSettings }) {
  const brand = settings.brandWord || 'Structure'
  const tagline =
    settings.footerTagline ||
    'A web design and development studio. Strategy, design, and engineering for teams who care how products are built.'
  const columns =
    settings.footerColumns && settings.footerColumns.length > 0
      ? settings.footerColumns.map((c) => ({ heading: c.heading, links: c.links ?? [] }))
      : DEFAULT_COLUMNS

  return (
    <footer>
      <div className="strx-container">
        <div className="foot-grid">
          <div className="foot-brand">
            <BrandLogo src="/logo-white.svg" word={brand} className="foot-logo" />
            <p>{tagline}</p>
          </div>
          {columns.map((col) => (
            <div className="foot-col" key={col.heading}>
              <h4>{col.heading}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={`${col.heading}-${link.href}-${link.label}`}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <span>{settings.footerBottom?.left || '© 2026 STRUCTURE STUDIO'}</span>
          <span>{settings.footerBottom?.right || 'WE BUILD THE WEB WITH STRUCTURE.'}</span>
        </div>
      </div>
    </footer>
  )
}
