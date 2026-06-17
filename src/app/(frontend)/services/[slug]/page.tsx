import './single-service.css'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServiceBySlug, getServiceSlugs, getServices } from '@/lib/content'
import type { Service } from '@/lib/content/types'
import { buildMetadata } from '@/lib/utils/seo'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Tag } from '@/components/ui/Tag'
import { CtaSection } from '@/components/layout/CtaSection'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { ServiceProcess } from '@/components/sections/ServiceProcess'
import { ServiceTabs } from '@/components/sections/ServiceTabs'
import { ServiceFaq } from '@/components/sections/ServiceFaq'
import { SaasConsole } from './SaasConsole'

export async function generateStaticParams() {
  const slugs = await getServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return {}
  return buildMetadata({
    seo: service.seo,
    fallbackTitle: service.title,
    fallbackDescription: service.lead,
  })
}

const SCROLLY_STEPS = [
  { num: '01', cap: 'Auth & tenancy', focus: 'p1', title: 'Multi-tenant, with the right permissions.', desc: 'Login, SSO, RBAC, and a multi-tenant model from day one. Each organization gets its own space, secure and isolated.', tags: ['SSO', 'RBAC', 'Multi-tenant'] },
  { num: '02', cap: 'Dashboard', focus: 'p2', title: 'Clear data, in real time.', desc: 'Dashboards show exactly the metrics that matter, updated live. Users understand what the product is doing for them.', tags: ['Realtime', 'Data viz', 'Analytics'] },
  { num: '03', cap: 'Billing', focus: 'p3', title: 'Revenue, automated.', desc: 'Plans, upgrades/downgrades, invoices, and trials — full Stripe integration. Collect revenue without lifting a finger each month.', tags: ['Stripe', 'Subscription', 'Invoice'] },
  { num: '04', cap: 'Scale', focus: 'p4', title: 'Ready for thousands of accounts.', desc: 'Infrastructure and design system that scale with the product. Add features, add customers — no platform rewrite.', tags: ['Scale-ready', 'Design system', '99.9% uptime'] },
]

const FAQS = [
  { q: 'Do you build both the landing page and the app?', a: 'Yes. A converting marketing site and a working app, built on the same design system.' },
  { q: 'Which payment integrations?', a: 'Stripe for subscriptions and international billing; we can add local gateways if needed.' },
  { q: 'What does multi-tenant mean?', a: 'Each customer organization gets its own data space and permissions, isolated and secure on shared infrastructure.' },
  { q: 'What happens after the MVP?', a: 'A retainer lets you continuously add features, optimize, and scale along the roadmap.' },
]

const PILLAR_ICONS = [
  <svg key="a" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
  <svg key="b" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><rect x="7" y="12" width="3" height="6" /><rect x="13" y="8" width="3" height="10" /></svg>,
  <svg key="c" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" /></svg>,
]

const PILLAR_DESCS = [
  'Authentication, SSO, role-based permissions, and multi-tenancy. A secure foundation for every organization.',
  'Dashboards, real-time charts, and reports. Data becomes value users can feel.',
  'Plans, recurring payments, invoices, and seat management. Revenue that runs automatically and transparently.',
]

const FALLBACK_PILLARS: { label: string }[] = [
  { label: 'Auth & RBAC' },
  { label: 'Dashboard & data' },
  { label: 'Billing & subscription' },
]

/** Single service page, ported from templates/service-saas.html.
 *  Nav/Footer come from the frontend layout. */
export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) notFound()

  const all = await getServices()
  const others = all.filter((s) => s.slug !== service.slug).slice(0, 3)
  const pillars = service.features && service.features.length > 0 ? service.features : FALLBACK_PILLARS

  return (
    <>
      <header className="svc-hero">
        <div className="strx-container inner">
          <div className="crumb">
            <Link href="/services">Services</Link>
            <span className="sep">/</span>
            <span>{service.title}</span>
          </div>
          <div className="lead-grid">
            <div>
              <Eyebrow>{service.number ? `// Service ${service.number}` : '// Service'}</Eyebrow>
              <h1>{service.title}</h1>
            </div>
            <div>
              <p className="lead">{service.lead}</p>
              <div className="acts">
                <Link href="/contact" className="btn btn-dark">
                  Book a call →
                </Link>
                <Link href="#story" className="btn btn-ghost">
                  See how it works
                </Link>
              </div>
            </div>
          </div>
          {service.metric_value ? (
            <div className="h-stats svc-hero-stats">
              <div className="hs">
                <div className="v">{service.metric_value}</div>
                <div className="k">{service.metric_label}</div>
              </div>
              <div className="hs">
                <div className="v">×3.2</div>
                <div className="k">Feature ship speed</div>
              </div>
            </div>
          ) : null}
        </div>
      </header>

      <section className="manifesto">
        <div className="strx-container">
          <p className="big">
            <span className="mut">SaaS isn’t a website.</span> It’s a living product — it needs auth,
            billing, dashboards, and <span className="accent">scalability</span> from the foundation
            up.
          </p>
        </div>
      </section>

      <section className="sec cream" id="story">
        <div className="strx-container">
          <div className="sec-head">
            <Eyebrow>// From foundation to scale</Eyebrow>
            <h2>
              Four systems, <span className="accent">one platform.</span>
            </h2>
            <p>
              Scroll to see a SaaS take shape — from multi-tenant auth to serving thousands of
              accounts.
            </p>
          </div>
          <ServiceTabs steps={SCROLLY_STEPS}>
            <SaasConsole />
          </ServiceTabs>
        </div>
      </section>

      <section className="sec" id="capabilities">
        <div className="strx-container">
          <div className="sec-head">
            <Eyebrow>// Capabilities</Eyebrow>
            <h2>
              Three pillars <span className="accent">of a SaaS.</span>
            </h2>
          </div>
          <div className="pillars">
            {pillars.slice(0, 3).map((p, i) => (
              <div className="pillar" key={`${p.label}-${i}`}>
                <span className="pi">{PILLAR_ICONS[i]}</span>
                <h3>{p.label}</h3>
                <p>{PILLAR_DESCS[i]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec on-dark" id="process">
        <div className="strx-container">
          <div className="sec-head">
            <Eyebrow dark>// Process</Eyebrow>
            <h2>
              How we <span className="accent">build SaaS.</span>
            </h2>
            <p>Transparent at every stage, with weekly staging for you to follow.</p>
          </div>
          <ServiceProcess steps={service.process} />
        </div>
      </section>

      <section className="sec on-dark results-tight" id="results">
        <div className="strx-container">
          <div className="stat-strip">
            <div className="stat-cell">
              <div className="v">
                99.9<span className="s">%</span>
              </div>
              <div className="k">Average uptime</div>
            </div>
            <div className="stat-cell">
              <div className="v">×3.2</div>
              <div className="k">Feature ship speed</div>
            </div>
            <div className="stat-cell">
              <div className="v">
                +54<span className="s">%</span>
              </div>
              <div className="k">Trial → paid</div>
            </div>
            <div className="stat-cell">
              <div className="v">∞</div>
              <div className="k">Multi-tenant, scale-ready</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec cream" id="faq">
        <div className="strx-container">
          <div className="faq-grid">
            <div className="faq-aside">
              <Eyebrow>// FAQ</Eyebrow>
              <h2>SaaS questions.</h2>
              <p>Don’t see your answer? Message us — we reply within one business day.</p>
              <Link href="/contact" className="btn btn-dark">
                Contact →
              </Link>
            </div>
            <ServiceFaq items={FAQS} />
          </div>
        </div>
      </section>

      {others.length > 0 ? (
        <section className="sec" id="other">
          <div className="strx-container">
            <div className="sec-head">
              <Eyebrow>// Other services</Eyebrow>
              <h2>
                Explore <span className="accent">more.</span>
              </h2>
            </div>
            <div className="other-grid">
              {others.map((o: Service) => (
                <Link key={o.id} href={`/services/${o.slug}`} className="other-card">
                  <div>
                    <div className="oc-n">{o.number}</div>
                    <h4>{o.title}</h4>
                  </div>
                  <span className="oc-arr">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <BlockRenderer blocks={service.extra_blocks} />

      <CtaSection
        eyebrow="// Get started"
        heading={
          <>
            Build a SaaS <span className="accent">worth using?</span>
          </>
        }
        text="A 30-minute call to look at your product idea and how we take it to market."
        primary={{ label: 'Book a call →', href: '/contact' }}
        secondary={{ label: 'View work', href: '/work' }}
      />
    </>
  )
}
