import './work.css'
import type { Metadata } from 'next'
import { getProjects, getArchive } from '@/lib/content'
import type { ArchiveStat, Project } from '@/lib/content/types'
import { WorkGrid } from '@/components/sections/WorkGrid'
import { CtaSection } from '@/components/layout/CtaSection'

export const metadata: Metadata = { title: 'Work — Structure' }

const FALLBACK_HERO_STATS: ArchiveStat[] = [
  { value: '40', suffix: '+', label: 'Projects shipped' },
  { value: '12', label: 'Industries' },
  { value: '96', suffix: '/100', label: 'Avg Lighthouse' },
  { value: '0.9', suffix: 's', label: 'Median CWV' },
]

const FALLBACK_RESULTS: ArchiveStat[] = [
  { value: '+64', suffix: '%', label: 'Average conversion lift after replatform' },
  { value: '−52', suffix: '%', label: 'Page load time' },
  { value: '96', suffix: '/100', label: 'Average Lighthouse score' },
  { value: '100', suffix: '%', label: 'Projects with zero-downtime go-live' },
]

const FALLBACK_FEATURED_STATS: ArchiveStat[] = [
  { value: '+212', suffix: '%', label: 'Mobile revenue' },
  { value: '0.8', suffix: 's', label: 'Median LCP' },
  { value: '98', suffix: '/100', label: 'Lighthouse' },
]

/** Work archive — hero, filters, work grid, featured case, results, CTA. */
export default async function WorkPage() {
  const [projects, content] = await Promise.all([getProjects(), getArchive('work')])

  const heroStats = content?.hero_stats?.length ? content.hero_stats : FALLBACK_HERO_STATS
  const resultsStats = content?.results_stats?.length ? content.results_stats : FALLBACK_RESULTS

  const feat = content?.featured
  const featuredProject: Project | null =
    feat?.project && typeof feat.project === 'object'
      ? feat.project
      : (projects.find((p) => p.featured) ?? null)
  const featuredStats = feat?.stats?.length ? feat.stats : FALLBACK_FEATURED_STATS

  return (
    <>
      {/* HERO */}
      <header className="page-hero">
        <div className="strx-container inner">
          <p className="t-mono">{content?.hero_eyebrow ?? '// Portfolio'}</p>
          <h1>
            {content?.hero_heading ?? '40 projects.'}
            <br />
            <span className="accent">{content?.hero_heading_accent ?? '12 industries.'}</span>
          </h1>
          <p className="lead">
            {content?.hero_lead ??
              'Every project is measured by real numbers after go-live. Here is some of the work we are proud of.'}
          </p>
          <div className="hero-stats">
            {heroStats.map((s, i) => (
              <div className="hs" key={i}>
                <div className="v">
                  {s.value}
                  {s.suffix ? <span className="s">{s.suffix}</span> : null}
                </div>
                <div className="k">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* WORK GRID */}
      <section className="sec" id="grid">
        <div className="strx-container">
          <WorkGrid projects={projects} />
        </div>
      </section>

      {/* FEATURED CASE */}
      <section className="sec on-dark" id="featured">
        <div className="strx-container">
          <div className="sec-head">
            <p className="t-mono dark">{feat?.eyebrow ?? '// Featured case study'}</p>
            <h2>
              {feat?.heading ?? 'Luma Atelier — '}
              <span className="accent">{feat?.heading_accent ?? 'a 6-week replatform.'}</span>
            </h2>
            <p>
              {feat?.desc ??
                'From 1.2% to 2.4% mobile conversion — we redesigned the entire shopping experience for a premium fashion brand.'}
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
              <div className="cs-eye">{featuredProject?.meta ?? 'E-commerce · Headless · 6 weeks'}</div>
              <h3>{featuredProject?.title ?? 'Moved to a typed headless storefront, 3× mobile revenue.'}</h3>
              <p className="cs-desc">
                {featuredProject?.summary ??
                  'Sub-second loads, one-page checkout, product SEO built in — zero-downtime go-live during peak season.'}
              </p>
              <div className="cs-stats">
                {featuredStats.map((s, i) => (
                  <div className="st" key={i}>
                    <div className="v">
                      {s.value}
                      {s.suffix ? <span className="s">{s.suffix}</span> : null}
                    </div>
                    <div className="k">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="sec on-dark" id="results" style={{ paddingTop: 0 }}>
        <div className="strx-container">
          <div className="sec-head">
            <p className="t-mono dark">{content?.results_eyebrow ?? '// Results'}</p>
            <h2>
              {content?.results_heading ?? 'Real numbers, '}
              <span className="accent">{content?.results_heading_accent ?? 'not pretty slides.'}</span>
            </h2>
            <p>{content?.results_lead ?? 'Averaged across all projects over the last 24 months.'}</p>
          </div>
          <div className="stat-strip">
            {resultsStats.map((s, i) => (
              <div className="stat-cell" key={i}>
                <div className="v">
                  {s.value}
                  {s.suffix ? <span className="s">{s.suffix}</span> : null}
                </div>
                <div className="k">{s.label}</div>
              </div>
            ))}
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
