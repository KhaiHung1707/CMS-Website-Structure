import './services.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getServices, getArchive } from '@/lib/content'
import type { ArchiveContent } from '@/lib/content/types'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CtaSection } from '@/components/layout/CtaSection'
import { ServiceCard } from '@/components/cards/ServiceCard'

export const metadata: Metadata = {
  title: 'Services — Structure',
  description:
    'From strategy to the final line of production code — no handoffs through middlemen. You work directly with the people who design and build.',
}

const FALLBACK_ROADMAP: NonNullable<ArchiveContent['roadmap']> = [
  { week: 'Week 0', title: 'Kick-off', desc: 'Discovery workshop. Map goals and success metrics.' },
  { week: 'Weeks 1–2', title: 'Strategy', desc: 'Sitemap, user flow, content strategy.' },
  { week: 'Weeks 3–4', title: 'Design', desc: 'High-fidelity design and a full Figma prototype.' },
  { week: 'Weeks 5–8', title: 'Build', desc: 'Next.js + TypeScript code. Weekly staging.', future: true },
  { week: 'Weeks 9–11', title: 'Launch', desc: 'QA, accessibility, performance, go-live.', future: true },
]

const FALLBACK_ENGAGEMENT: NonNullable<ArchiveContent['engagement']> = [
  {
    tag: 'Fixed-scope project',
    title: 'Project',
    price: '6–12',
    price_unit: 'weeks / project',
    desc: 'Best when you have a well-defined product to design and build from start to launch.',
    cta_label: 'Start a project →',
    cta_href: '/contact',
    items: [
      { label: 'Fixed quote staged by phase' },
      { label: 'Clear weekly deliverables' },
      { label: 'Design + build in one team' },
      { label: 'Full documentation & code handoff' },
    ],
  },
  {
    tag: 'Long-term partnership',
    title: 'Retainer',
    price: '2',
    price_unit: 'weeks / sprint',
    desc: 'Best when you need a product team to continuously design, build, and optimize over time.',
    featured: true,
    cta_label: 'Book a call →',
    cta_href: '/contact',
    items: [
      { label: 'Two-week sprints, async-first' },
      { label: 'Monthly metrics reports' },
      { label: 'Flexible prioritization by roadmap' },
      { label: 'Continuous optimization after go-live' },
    ],
  },
]

const FALLBACK_MATRIX: NonNullable<ArchiveContent['matrix']> = {
  do: [
    { label: 'Custom web apps & SaaS' },
    { label: 'Modern, headless e-commerce' },
    { label: 'Design system & component library' },
    { label: 'Replatforming & performance optimization' },
    { label: 'Technical SEO & Core Web Vitals' },
  ],
  dont: [
    { label: 'WordPress / Wix template setups' },
    { label: 'Native mobile app' },
    { label: 'Standalone logo / brand work' },
    { label: 'Running ads / performance marketing' },
    { label: '"Quick and cheap" projects' },
  ],
}

/** Services archive: hero + .svc-list (getServices → ServiceCard) + process
 *  timeline + engagement models + scope matrix + CTA. Ported from
 *  templates/services.html. Nav/Footer come from the frontend layout. */
export default async function ServicesPage() {
  const [services, content] = await Promise.all([getServices(), getArchive('services')])

  const roadmap = content?.roadmap?.length ? content.roadmap : FALLBACK_ROADMAP
  const engagement = content?.engagement?.length ? content.engagement : FALLBACK_ENGAGEMENT
  const matrix =
    content?.matrix && (content.matrix.do?.length || content.matrix.dont?.length)
      ? content.matrix
      : FALLBACK_MATRIX

  return (
    <>
      <header className="page-hero">
        <div className="strx-container inner">
          <Eyebrow>{content?.hero_eyebrow ?? '// Services'}</Eyebrow>
          <h1>
            {content?.hero_heading ?? 'Every stage.'}
            <br />
            <span className="accent">{content?.hero_heading_accent ?? 'One single team.'}</span>
          </h1>
          <p className="lead">
            {content?.hero_lead ??
              'From strategy to the final line of production code — no handoffs through middlemen. You work directly with the people who design and build.'}
          </p>
          <div className="acts">
            <Link href="/contact" className="btn btn-dark">
              Start a project →
            </Link>
            <Link href="/work" className="btn btn-ghost">
              View work
            </Link>
          </div>
        </div>
      </header>

      <section className="sec" id="detail">
        <div className="strx-container">
          <div className="sec-head">
            <Eyebrow>// Deep dive</Eyebrow>
            <h2>
              A close look at <span className="accent">each service.</span>
            </h2>
            <p>
              Know exactly what you get. Every capability comes with a clear scope and one metric we
              commit to.
            </p>
          </div>
          <div className="svc-list">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="sec on-dark" id="timeline">
        <div className="strx-container">
          <div className="sec-head">
            <Eyebrow dark>// Project roadmap</Eyebrow>
            <h2>
              12 weeks from kick-off <span className="accent">to launch.</span>
            </h2>
            <p>
              Every week has a concrete deliverable. You always know where you are and what comes
              next.
            </p>
          </div>
          <div className="pt-line">
            {roadmap.map((step, i) => (
              <div className={step.future ? 'pt-step future' : 'pt-step'} key={i}>
                <div className="pt-week">{step.week}</div>
                <div className="pt-dot" />
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec cream" id="models">
        <div className="strx-container">
          <div className="sec-head">
            <Eyebrow>// Engagement models</Eyebrow>
            <h2>
              Two ways to <span className="accent">work together.</span>
            </h2>
            <p>The same senior team. Pick the model that fits your product stage.</p>
          </div>
          <div className="eng-grid">
            {engagement.map((e, i) => (
              <div className={e.featured ? 'eng-card feat' : 'eng-card'} key={i}>
                <div className="ec-tag">{e.tag}</div>
                <h3>{e.title}</h3>
                <div className="ec-price">
                  {e.price}
                  {e.price_unit ? <span className="u">{e.price_unit}</span> : null}
                </div>
                <p className="ec-desc">{e.desc}</p>
                <ul>
                  {(e.items ?? []).map((item, j) => (
                    <li key={j}>
                      <span className="ck">✓</span>
                      {item.label}
                    </li>
                  ))}
                </ul>
                <div className="ec-foot">
                  <Link
                    href={e.cta_href ?? '/contact'}
                    className={e.featured ? 'btn btn-accent' : 'btn btn-dark'}
                  >
                    {e.cta_label ?? 'Start a project →'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="scope">
        <div className="strx-container">
          <div className="sec-head">
            <Eyebrow>// A clear scope</Eyebrow>
            <h2>
              What we do, <span className="accent">and what we don’t.</span>
            </h2>
            <p>Focus creates quality. We say &quot;no&quot; so we can say &quot;yes&quot; really well.</p>
          </div>
          <div className="matrix-grid">
            <div className="matrix-col do">
              <span className="mt">✓ We do</span>
              <ul>
                {(matrix.do ?? []).map((item, i) => (
                  <li key={i}>
                    <span className="mk">✓</span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="matrix-col dont">
              <span className="mt">✕ We don’t</span>
              <ul>
                {(matrix.dont ?? []).map((item, i) => (
                  <li key={i}>
                    <span className="mk">✕</span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        eyebrow="// Get started"
        heading={
          <>
            Which service <span className="accent">fits you?</span>
          </>
        }
        text="A 30-minute call to see if we're a fit — no sales pitch, no commitment."
        primary={{ label: 'Book a call →', href: '/contact' }}
        secondary={{ label: 'View work', href: '/work' }}
      />
    </>
  )
}
