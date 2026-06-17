'use client'

import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface SvcTab {
  n: string
  name: string
  dd: string
  href: string
  cap: string
  big: React.ReactNode
  ico: React.ReactNode
  points: string[]
}

const TABS: SvcTab[] = [
  {
    n: '01',
    name: 'Web Design',
    dd: 'High-fidelity interface design and interactive prototypes. A component system, not static mockups.',
    href: '/services',
    cap: 'Design · Figma → Code',
    big: <>UI</>,
    ico: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    points: ['Design system & component library', 'Full interactive prototypes', 'Code-ready handoff for devs'],
  },
  {
    n: '02',
    name: 'Web Application',
    dd: 'Stateful web apps, typed end-to-end. Next.js, TypeScript, production-ready infrastructure.',
    href: '/services',
    cap: 'Engineering · Next.js · TS',
    big: <>APP</>,
    ico: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    points: ['Typed end-to-end, zero downtime deploy', 'Supabase · Stripe · CMS integration', 'Weekly staging, automated QA'],
  },
  {
    n: '03',
    name: 'SEO & Core Web Vitals',
    dd: 'Technical SEO and Core Web Vitals engineered in from the first commit — not bolted on later.',
    href: '/services',
    cap: 'Median CWV · 0.9s',
    big: (
      <>
        95<span className="sub">/100</span>
      </>
    ),
    ico: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20v-6M6 20v-4M18 20v-9" />
        <circle cx="12" cy="6" r="2" />
      </svg>
    ),
    points: ['Core Web Vitals in the "good" range', 'Technical SEO & structured data', 'WCAG AA accessibility'],
  },
  {
    n: '04',
    name: 'SaaS Platform',
    dd: 'Multi-tenant SaaS platforms: auth, billing, dashboards, and a design system that scales.',
    href: '/services',
    cap: 'Multi-tenant · Scale-ready',
    big: <>SaaS</>,
    ico: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    points: ['Auth, RBAC, billing & subscription', 'Real-time dashboards & analytics', 'A design system that scales with the product'],
  },
]

export function HomeServices() {
  const [active, setActive] = useState(0)
  return (
    <section className="sec" id="services">
      <div className="strx-container">
        <div className="sec-head">
          <p className="t-mono">// Services</p>
          <h2>
            Four capabilities, <span className="accent">one team.</span>
          </h2>
          <p>
            We don&apos;t split work across middlemen. Strategy, design, and engineering sit together
            from the first commit.
          </p>
        </div>

        <div className="svc-grid">
          <div className="svc-tabs">
            {TABS.map((t, i) => (
              <button
                key={t.n}
                type="button"
                className={cn('svc-tab', i === active && 'active')}
                onClick={() => setActive(i)}
              >
                <span className="tt">
                  <span className="tn">{t.n}</span>
                  {t.name}
                </span>
                <span className="dd">{t.dd}</span>
              </button>
            ))}
          </div>

          <div className="svc-stage">
            {TABS.map((t, i) => (
              <div key={t.n} className={cn('svc-panel', i === active && 'active')}>
                <div className="ptop">
                  <span className="pcap">{t.cap}</span>
                  <span className="pico">{t.ico}</span>
                </div>
                <div>
                  <div className="pbig">{t.big}</div>
                </div>
                <ul className="plist">
                  {t.points.map((p) => (
                    <li key={p}>
                      <span className="ck">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <Link className="psee" href={t.href}>
                  View details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
