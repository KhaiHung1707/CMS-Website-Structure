import './services.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getServices } from '@/lib/content'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CtaSection } from '@/components/layout/CtaSection'
import { ServiceCard } from '@/components/cards/ServiceCard'

export const metadata: Metadata = {
  title: 'Services — Structure',
  description:
    'From strategy to the final line of production code — no handoffs through middlemen. You work directly with the people who design and build.',
}

/** Services archive: hero + .svc-list (getServices → ServiceCard) + process
 *  timeline + engagement models + scope matrix + CTA. Ported from
 *  templates/services.html. Nav/Footer come from the frontend layout. */
export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      <header className="page-hero">
        <div className="strx-container inner">
          <Eyebrow>// Services</Eyebrow>
          <h1>
            Every stage.
            <br />
            <span className="accent">One single team.</span>
          </h1>
          <p className="lead">
            From strategy to the final line of production code — no handoffs through middlemen. You
            work directly with the people who design and build.
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
            <div className="pt-step">
              <div className="pt-week">Week 0</div>
              <div className="pt-dot" />
              <h4>Kick-off</h4>
              <p>Discovery workshop. Map goals and success metrics.</p>
            </div>
            <div className="pt-step">
              <div className="pt-week">Weeks 1–2</div>
              <div className="pt-dot" />
              <h4>Strategy</h4>
              <p>Sitemap, user flow, content strategy.</p>
            </div>
            <div className="pt-step">
              <div className="pt-week">Weeks 3–4</div>
              <div className="pt-dot" />
              <h4>Design</h4>
              <p>High-fidelity design and a full Figma prototype.</p>
            </div>
            <div className="pt-step future">
              <div className="pt-week">Weeks 5–8</div>
              <div className="pt-dot" />
              <h4>Build</h4>
              <p>Next.js + TypeScript code. Weekly staging.</p>
            </div>
            <div className="pt-step future">
              <div className="pt-week">Weeks 9–11</div>
              <div className="pt-dot" />
              <h4>Launch</h4>
              <p>QA, accessibility, performance, go-live.</p>
            </div>
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
            <div className="eng-card">
              <div className="ec-tag">Fixed-scope project</div>
              <h3>Project</h3>
              <div className="ec-price">
                6–12<span className="u">weeks / project</span>
              </div>
              <p className="ec-desc">
                Best when you have a well-defined product to design and build from start to launch.
              </p>
              <ul>
                <li>
                  <span className="ck">✓</span>Fixed quote staged by phase
                </li>
                <li>
                  <span className="ck">✓</span>Clear weekly deliverables
                </li>
                <li>
                  <span className="ck">✓</span>Design + build in one team
                </li>
                <li>
                  <span className="ck">✓</span>Full documentation &amp; code handoff
                </li>
              </ul>
              <div className="ec-foot">
                <Link href="/contact" className="btn btn-dark">
                  Start a project →
                </Link>
              </div>
            </div>
            <div className="eng-card feat">
              <div className="ec-tag">Long-term partnership</div>
              <h3>Retainer</h3>
              <div className="ec-price">
                2<span className="u">weeks / sprint</span>
              </div>
              <p className="ec-desc">
                Best when you need a product team to continuously design, build, and optimize over
                time.
              </p>
              <ul>
                <li>
                  <span className="ck">✓</span>Two-week sprints, async-first
                </li>
                <li>
                  <span className="ck">✓</span>Monthly metrics reports
                </li>
                <li>
                  <span className="ck">✓</span>Flexible prioritization by roadmap
                </li>
                <li>
                  <span className="ck">✓</span>Continuous optimization after go-live
                </li>
              </ul>
              <div className="ec-foot">
                <Link href="/contact" className="btn btn-accent">
                  Book a call →
                </Link>
              </div>
            </div>
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
                <li>
                  <span className="mk">✓</span>Custom web apps &amp; SaaS
                </li>
                <li>
                  <span className="mk">✓</span>Modern, headless e-commerce
                </li>
                <li>
                  <span className="mk">✓</span>Design system &amp; component library
                </li>
                <li>
                  <span className="mk">✓</span>Replatforming &amp; performance optimization
                </li>
                <li>
                  <span className="mk">✓</span>Technical SEO &amp; Core Web Vitals
                </li>
              </ul>
            </div>
            <div className="matrix-col dont">
              <span className="mt">✕ We don’t</span>
              <ul>
                <li>
                  <span className="mk">✕</span>WordPress / Wix template setups
                </li>
                <li>
                  <span className="mk">✕</span>Native mobile app
                </li>
                <li>
                  <span className="mk">✕</span>Standalone logo / brand work
                </li>
                <li>
                  <span className="mk">✕</span>Running ads / performance marketing
                </li>
                <li>
                  <span className="mk">✕</span>&quot;Quick and cheap&quot; projects
                </li>
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
