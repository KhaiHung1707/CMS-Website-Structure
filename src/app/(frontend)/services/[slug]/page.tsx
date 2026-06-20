import './single-service.css'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServiceBySlug, getServiceSlugs, getServices } from '@/lib/content'
import type { Service } from '@/lib/content/types'
import { buildMetadata } from '@/lib/utils/seo'
import { renderAccentHeading } from '@/lib/utils/accentHeading'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CtaSection } from '@/components/layout/CtaSection'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { ServiceProcess } from '@/components/sections/ServiceProcess'
import { ServiceTabs } from '@/components/sections/ServiceTabs'
import { ServiceFaq } from '@/components/sections/ServiceFaq'

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

/** Positional capability glyphs — design decoration only; labels/copy come from data. */
const PILLAR_ICONS = [
  <svg key="a" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
  <svg key="b" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><rect x="7" y="12" width="3" height="6" /><rect x="13" y="8" width="3" height="10" /></svg>,
  <svg key="c" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" /></svg>,
]

/** Single service page, ported from templates/service-saas.html.
 *  All copy is data-driven; sections hide when their field is empty.
 *  Nav/Footer come from the frontend layout. */
export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) notFound()

  const all = await getServices()
  const others = all.filter((s) => s.slug !== service.slug).slice(0, 3)
  const h = service.headings
  const heroMetrics =
    service.hero_metrics && service.hero_metrics.length > 0
      ? service.hero_metrics
      : service.metric_value
        ? [{ value: service.metric_value, label: service.metric_label ?? '' }]
        : []

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
              <h1>{h?.hero ? renderAccentHeading(h.hero) : service.title}</h1>
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
          {heroMetrics.length > 0 ? (
            <div className="h-stats svc-hero-stats">
              {heroMetrics.map((m, i) => (
                <div className="hs" key={i}>
                  <div className="v">{m.value}</div>
                  <div className="k">{m.label}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      {service.manifesto ? (
        <section className="manifesto">
          <div className="strx-container">
            <p className="big">{service.manifesto}</p>
          </div>
        </section>
      ) : null}

      {service.scrolly && service.scrolly.length > 0 ? (
        <section className="sec cream" id="story">
          <div className="strx-container">
            <div className="sec-head">
              <Eyebrow>{h?.story_eyebrow ?? '// How it works'}</Eyebrow>
              <h2>
                {h?.story_heading ? (
                  renderAccentHeading(h.story_heading)
                ) : (
                  <>
                    How it <span className="accent">comes together.</span>
                  </>
                )}
              </h2>
              <p>{h?.story_lead ?? 'A walkthrough of the core systems we build into the product.'}</p>
            </div>
            <ServiceTabs steps={service.scrolly} slug={service.slug} />
          </div>
        </section>
      ) : null}

      {service.capabilities && service.capabilities.length > 0 ? (
        <section className="sec" id="capabilities">
          <div className="strx-container">
            <div className="sec-head">
              <Eyebrow>{h?.capabilities_eyebrow ?? '// Capabilities'}</Eyebrow>
              <h2>
                {h?.capabilities_heading ? (
                  renderAccentHeading(h.capabilities_heading)
                ) : (
                  <>
                    What we <span className="accent">deliver.</span>
                  </>
                )}
              </h2>
            </div>
            <div className="pillars">
              {service.capabilities.slice(0, 3).map((p, i) => (
                <div className="pillar" key={`${p.label}-${i}`}>
                  {PILLAR_ICONS[i] ? <span className="pi">{PILLAR_ICONS[i]}</span> : null}
                  <h3>{p.label}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {service.process && service.process.length > 0 ? (
        <section className="sec on-dark" id="process">
          <div className="strx-container">
            <div className="sec-head">
              <Eyebrow dark>{h?.process_eyebrow ?? '// Process'}</Eyebrow>
              <h2>
                {h?.process_heading ? (
                  renderAccentHeading(h.process_heading)
                ) : (
                  <>
                    How we <span className="accent">build.</span>
                  </>
                )}
              </h2>
              <p>{h?.process_lead ?? 'Transparent at every stage, with weekly staging for you to follow.'}</p>
            </div>
            <ServiceProcess steps={service.process} />
          </div>
        </section>
      ) : null}

      {service.results && service.results.length > 0 ? (
        <section className="sec on-dark results-tight" id="results">
          <div className="strx-container">
            <div className="stat-strip">
              {service.results.map((r, i) => (
                <div className="stat-cell" key={i}>
                  <div className="v">
                    {r.value}
                    {r.unit ? <span className="s">{r.unit}</span> : null}
                  </div>
                  <div className="k">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {service.faqs && service.faqs.length > 0 ? (
        <section className="sec cream" id="faq">
          <div className="strx-container">
            <div className="faq-grid">
              <div className="faq-aside">
                <Eyebrow>{h?.faq_eyebrow ?? '// FAQ'}</Eyebrow>
                <h2>{h?.faq_heading ? renderAccentHeading(h.faq_heading) : `${service.title} questions.`}</h2>
                <p>Don’t see your answer? Message us — we reply within one business day.</p>
                <Link href="/contact" className="btn btn-dark">
                  Contact →
                </Link>
              </div>
              <ServiceFaq items={service.faqs} />
            </div>
          </div>
        </section>
      ) : null}

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
            Ready to <span className="accent">build?</span>
          </>
        }
        text="A 30-minute call to look at your product idea and how we take it to market."
        primary={{ label: 'Book a call →', href: '/contact' }}
        secondary={{ label: 'View work', href: '/work' }}
      />
    </>
  )
}
