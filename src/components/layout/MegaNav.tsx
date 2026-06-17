import { cn } from '@/lib/utils/cn'

/**
 * Services mega panel. Markup ported 1:1 from assets/nav-mega.js (.mega / .mega-card …).
 * Static marketing content matches the design reference.
 * TODO(design): drive items from getServices() once copy is finalised in CMS.
 */
export function MegaNav({ open }: { open: boolean }) {
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
            <p className="t-mono">// Services</p>
            <h3>
              Four capabilities,
              <br />
              one team.
            </h3>
            <p className="mega-blurb">
              Strategy, design, and engineering under one roof — together from the first commit to
              launch and beyond.
            </p>
            <a href="/services" className="mega-all">
              View all services <span>→</span>
            </a>
            <div className="mega-promo">
              <span className="mp-eye">// Featured</span>
              <span className="mp-title">Luma Atelier — +212% mobile revenue</span>
              <a href="/work" className="mp-link">
                Read case study →
              </a>
            </div>
          </div>
          <div className="mega-grid">
            <MegaItem href="/services/web-design" n="01" name="Web Design" desc="High-fidelity interface design and interactive prototypes — a component system, not static mockups." />
            <MegaItem href="/services/web-app" n="02" name="Web Application" desc="Stateful web apps, typed end-to-end. Next.js, TypeScript, production-ready infrastructure." />
            <MegaItem href="/services/seo" n="03" name="SEO & Core Web Vitals" desc="Technical SEO and Core Web Vitals engineered in from the first commit — not bolted on later." />
            <MegaItem href="/services/saas" n="04" name="SaaS Platform" desc="Multi-tenant SaaS platforms: auth, billing, dashboards, and a design system that scales." />
          </div>
        </div>
      </div>
    </div>
  )
}

function MegaItem({ href, n, name, desc }: { href: string; n: string; name: string; desc: string }) {
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
