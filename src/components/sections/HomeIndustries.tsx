'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface SvcCard {
  h: string
  p: string
}
interface Metric {
  v: string
  s?: string
  k: string
}
interface IndPanel {
  n: string
  name: string
  eye: string
  title: string
  lead: string
  services: SvcCard[]
  metrics: Metric[]
}

const PANELS: IndPanel[] = [
  {
    n: '01',
    name: 'E-commerce & Retail',
    eye: 'E-commerce · Conversion-first',
    title: 'Sell faster on every device.',
    lead: 'In retail, every 100ms of load time is revenue. We optimize storefronts for speed, frictionless checkout, and product SEO.',
    services: [
      { h: 'High-performance storefront', p: 'Headless commerce, optimized images, under 1s on 4G.' },
      { h: 'Checkout & payments', p: 'One-page flow, wallet & local gateway integration.' },
      { h: 'Product catalog SEO', p: 'Structured data, product schema, rich results.' },
      { h: 'Conversion A/B testing', p: 'Measure and iterate on funnel drop-off points.' },
    ],
    metrics: [
      { v: '+212', s: '%', k: 'Mobile revenue' },
      { v: '0.8', s: 's', k: 'Median LCP' },
      { v: '+38', s: '%', k: 'Checkout rate' },
    ],
  },
  {
    n: '02',
    name: 'SaaS & Software',
    eye: 'SaaS · Product-led',
    title: 'From marketing site to app, seamlessly.',
    lead: 'A SaaS product needs both a converting landing page and a smooth working app. We build both on one shared design system.',
    services: [
      { h: 'Onboarding & activation', p: 'Sign-up flow, trial-to-paid, clear empty states.' },
      { h: 'Dashboard & data viz', p: 'Real-time dashboards, readable charts.' },
      { h: 'Billing & subscription', p: 'Stripe integration, plan management, automated invoices.' },
      { h: 'Scalable design system', p: 'A component library so the team ships features fast.' },
    ],
    metrics: [
      { v: '+54', s: '%', k: 'Trial → paid' },
      { v: '3.2', s: 'x', k: 'Feature ship speed' },
      { v: '99.9', s: '%', k: 'Uptime' },
    ],
  },
  {
    n: '03',
    name: 'Fintech & Finance',
    eye: 'Fintech · Trust & compliance',
    title: 'Trust designed into the interface.',
    lead: 'Finance demands precision and security. We build transparent, compliant, secure experiences from the ground up.',
    services: [
      { h: 'Security & authentication', p: 'SSO, 2FA, encryption, full audit logs.' },
      { h: 'Compliance & KYC', p: 'Identity flows that meet local regulations.' },
      { h: 'Transaction display', p: 'Clear figures, no ambiguity.' },
      { h: 'Accessibility WCAG AA', p: 'Readable for every user and assistive tech.' },
    ],
    metrics: [
      { v: 'AA', k: 'WCAG compliant' },
      { v: '+47', s: '%', k: 'KYC completion' },
      { v: '0', k: 'Security incidents' },
    ],
  },
  {
    n: '04',
    name: 'Healthcare',
    eye: 'Healthcare · Clarity-first',
    title: 'Clear interfaces for critical decisions.',
    lead: 'Healthcare needs accurate, readable, accessible information. We prioritize clarity over decoration.',
    services: [
      { h: 'Booking & records', p: 'Appointment flows, secure patient record management.' },
      { h: 'Data security', p: 'Encryption, access control, healthcare compliance.' },
      { h: 'Maximum accessibility', p: 'High contrast, large type, screen-reader friendly.' },
      { h: 'Cross-platform', p: 'Smooth on both patient & clinician devices.' },
    ],
    metrics: [
      { v: '+63', s: '%', k: 'Online bookings' },
      { v: 'AAA', k: 'Text contrast' },
      { v: '−41', s: '%', k: 'Call-center calls' },
    ],
  },
  {
    n: '05',
    name: 'Real Estate',
    eye: 'Real estate · Visual-led',
    title: 'Property sells better when the web is better.',
    lead: 'Buyers decide with their eyes. We build image-rich property experiences that still load fast.',
    services: [
      { h: 'Property showcase', p: 'Galleries, 360° tours, interactive floor plans.' },
      { h: 'Search & filter', p: 'Filter by location, price, area — instantly.' },
      { h: 'Lead capture', p: 'Inquiry forms, CRM integration, source tracking.' },
      { h: 'Local SEO', p: 'Optimized for regional search & maps.' },
    ],
    metrics: [
      { v: '+89', s: '%', k: 'Qualified leads' },
      { v: '1.1', s: 's', k: 'Gallery load' },
      { v: '+2.4', s: 'x', k: 'Time on page' },
    ],
  },
  {
    n: '06',
    name: 'Education & EdTech',
    eye: 'EdTech · Engagement-first',
    title: 'Learning that retains through great experience.',
    lead: 'Digital education needs to keep learners coming back. We build smooth learning platforms with clear progress tracking that load fast on any network.',
    services: [
      { h: 'Course player', p: 'Video, quizzes, progress — synced across devices.' },
      { h: 'Progress tracking', p: 'Learner dashboards, gamification, certificates.' },
      { h: 'Content management', p: 'A CMS so instructors update lessons themselves.' },
      { h: 'Low-bandwidth performance', p: 'Lightweight, offline-friendly, works on 3G.' },
    ],
    metrics: [
      { v: '+71', s: '%', k: 'Completion rate' },
      { v: '+2.8', s: 'x', k: 'Weekly return' },
      { v: '1.4', s: 's', k: 'Load on 3G' },
    ],
  },
]

export function HomeIndustries() {
  const [active, setActive] = useState(0)
  return (
    <section className="sec cream" id="industry">
      <div className="strx-container">
        <div className="sec-head">
          <p className="t-mono">// By industry</p>
          <h2>
            Services <span className="accent">for every industry.</span>
          </h2>
          <p>
            Every industry has its own constraints — speed, trust, compliance, or conversion. We tune
            scope and technical priorities to your problem.
          </p>
        </div>

        <div className="ind-grid">
          <div className="ind-rail">
            {PANELS.map((p, i) => (
              <button
                key={p.n}
                type="button"
                className={cn('ind-pick', i === active && 'active')}
                onClick={() => setActive(i)}
              >
                <span className="in-n">{p.n}</span>
                <span className="in-name">{p.name}</span>
                <span className="in-arr">→</span>
              </button>
            ))}
          </div>

          <div className="ind-stage">
            {PANELS.map((p, i) => (
              <div key={p.n} className={cn('ind-panel', i === active && 'active')}>
                <span className="ip-eye">{p.eye}</span>
                <h3>{p.title}</h3>
                <p className="ip-lead">{p.lead}</p>
                <div className="ind-svc">
                  {p.services.map((s) => (
                    <div className="isc" key={s.h}>
                      <div className="h">
                        <span className="d" />
                        {s.h}
                      </div>
                      <p>{s.p}</p>
                    </div>
                  ))}
                </div>
                <div className="ind-metrics">
                  {p.metrics.map((m) => (
                    <div className="m" key={m.k}>
                      <div className="v">
                        {m.v}
                        {m.s ? <span className="s">{m.s}</span> : null}
                      </div>
                      <div className="k">{m.k}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
