import { cn } from '@/lib/utils/cn'
import type { MegaContent } from '@/lib/content/types'

export interface MegaItemData {
  n: string
  name: string
  desc: string
  href: string
}

/**
 * Services mega panel. Markup ported 1:1 from assets/nav-mega.js (.mega / .mega-card …).
 * Surrounding copy comes from SiteSettings.mega; the four cards are the live Services.
 */
export function MegaNav({
  open,
  mega,
  items,
}: {
  open: boolean
  mega?: MegaContent | null
  items: MegaItemData[]
}) {
  const eyebrow = mega?.eyebrow || '// Services'
  const heading = mega?.heading || 'Four capabilities, one team.'
  const blurb =
    mega?.blurb ||
    'Strategy, design, and engineering under one roof — together from the first commit to launch and beyond.'
  const ctaLabel = mega?.ctaLabel || 'View all services'
  const promo = mega?.promo

  return (
    <div
      className={cn('mega', open && 'open')}
      id="megaPanel"
      role="region"
      aria-label="Services menu"
    >
      <div className="strx-container">
        <div className="mega-card">
          <div className="mega-aside">
            <p className="t-mono">{eyebrow}</p>
            <h3>{heading}</h3>
            <p className="mega-blurb">{blurb}</p>
            <a href="/services" className="mega-all">
              {ctaLabel} <span>→</span>
            </a>
            {promo?.title ? (
              <div className="mega-promo">
                <span className="mp-eye">{promo.eyebrow || '// Featured'}</span>
                <span className="mp-title">{promo.title}</span>
                <a href={promo.linkHref || '/work'} className="mp-link">
                  {promo.linkLabel || 'Read case study →'}
                </a>
              </div>
            ) : null}
          </div>
          <div className="mega-grid">
            {items.map((item) => (
              <MegaItem key={item.href} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MegaItem({ href, n, name, desc }: MegaItemData) {
  return (
    <a className="mega-item" href={href}>
      <span className="mi-ico">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      </span>
      <span className="mi-body">
        <span className="mi-top">
          <span className="mi-n">{n}</span>
          <span className="mi-name">{name}</span>
        </span>
        <span className="mi-desc">{desc}</span>
      </span>
      <span className="mi-arr">→</span>
    </a>
  )
}
