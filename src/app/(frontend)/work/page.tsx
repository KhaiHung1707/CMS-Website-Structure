import './work.css'
import type { Metadata } from 'next'
import { getProjects } from '@/lib/content'
import { WorkCard } from '@/components/cards/WorkCard'
import { WorkFilters } from '@/components/sections/WorkFilters'
import { CtaSection } from '@/components/layout/CtaSection'

export const metadata: Metadata = { title: 'Work — Structure' }

/** Work archive — hero, filters, work grid, featured case, results, CTA. */
export default async function WorkPage() {
  const projects = await getProjects()

  return (
    <>
      {/* HERO */}
      <header className="page-hero">
        <div className="strx-container inner">
          <p className="t-mono">// Portfolio</p>
          <h1>
            40 projects.
            <br />
            <span className="accent">12 industries.</span>
          </h1>
          <p className="lead">
            Every project is measured by real numbers after go-live. Here is some of the work we are
            proud of.
          </p>
          <div className="hero-stats">
            <div className="hs"><div className="v">40<span className="s">+</span></div><div className="k">Projects shipped</div></div>
            <div className="hs"><div className="v">12</div><div className="k">Industries</div></div>
            <div className="hs"><div className="v">96<span className="s">/100</span></div><div className="k">Avg Lighthouse</div></div>
            <div className="hs"><div className="v">0.9<span className="s">s</span></div><div className="k">Median CWV</div></div>
          </div>
        </div>
      </header>

      {/* WORK GRID */}
      <section className="sec" id="grid">
        <div className="strx-container">
          <WorkFilters />
          {/* @cms:loop name="portfolio" — each project → WorkCard */}
          <div className="work-grid" data-cms-loop="portfolio">
            {projects.map((project) => (
              <WorkCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CASE */}
      <section className="sec on-dark" id="featured">
        <div className="strx-container">
          <div className="sec-head">
            <p className="t-mono dark">// Featured case study</p>
            <h2>
              Luma Atelier — <span className="accent">a 6-week replatform.</span>
            </h2>
            <p>
              From 1.2% to 2.4% mobile conversion — we redesigned the entire shopping experience for a
              premium fashion brand.
            </p>
          </div>
          <div className="cs-feature">
            <div className="cs-visual">
              <svg viewBox="0 0 520 460" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="csf" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#A7282B" />
                    <stop offset="100%" stopColor="#6F1A1C" />
                  </linearGradient>
                </defs>
                <rect width="520" height="460" fill="url(#csf)" />
                <g opacity="0.24" fill="#3E0A0B">
                  <rect x="40" y="56" width="240" height="26" rx="5" />
                  <rect x="40" y="96" width="180" height="26" rx="5" />
                  <rect x="40" y="180" width="440" height="220" rx="14" />
                </g>
                <circle cx="430" cy="90" r="40" fill="#3E0A0B" opacity="0.5" />
              </svg>
              <span className="badge ink cs-badge">★ Case study</span>
            </div>
            <div className="cs-body">
              <div className="cs-eye">E-commerce · Headless · 6 weeks</div>
              <h3>Moved to a typed headless storefront, 3× mobile revenue.</h3>
              <p className="cs-desc">
                Sub-second loads, one-page checkout, product SEO built in — zero-downtime go-live during
                peak season.
              </p>
              <div className="cs-stats">
                <div className="st"><div className="v">+212<span className="s">%</span></div><div className="k">Mobile revenue</div></div>
                <div className="st"><div className="v">0.8<span className="s">s</span></div><div className="k">Median LCP</div></div>
                <div className="st"><div className="v">98<span className="s">/100</span></div><div className="k">Lighthouse</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="sec on-dark" id="results" style={{ paddingTop: 0 }}>
        <div className="strx-container">
          <div className="sec-head">
            <p className="t-mono dark">// Results</p>
            <h2>
              Real numbers, <span className="accent">not pretty slides.</span>
            </h2>
            <p>Averaged across all projects over the last 24 months.</p>
          </div>
          <div className="stat-strip">
            <div className="stat-cell"><div className="v">+64<span className="s">%</span></div><div className="k">Average conversion lift after replatform</div></div>
            <div className="stat-cell"><div className="v">−52<span className="s">%</span></div><div className="k">Page load time</div></div>
            <div className="stat-cell"><div className="v">96<span className="s">/100</span></div><div className="k">Average Lighthouse score</div></div>
            <div className="stat-cell"><div className="v">100<span className="s">%</span></div><div className="k">Projects with zero-downtime go-live</div></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        heading={<>Is your project <span className="accent">next?</span></>}
        primary={{ label: 'Start a project →', href: '/contact' }}
        secondary={{ label: 'View services', href: '/services' }}
      />
    </>
  )
}
