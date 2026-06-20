import type { Metadata } from 'next'
import Link from 'next/link'
import { getIndustries, getArchive } from '@/lib/content'
import type { ArchiveStat } from '@/lib/content/types'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CtaSection } from '@/components/layout/CtaSection'
import { IndustryCard } from '@/components/cards/IndustryCard'
import './industries.css'

export const metadata: Metadata = {
  title: 'Industries — Structure',
}

const FALLBACK_HERO_STATS: ArchiveStat[] = [
  { value: '12', label: 'Industries served' },
  { value: '40', suffix: '+', label: 'Projects shipped' },
]

const FALLBACK_RESULTS: ArchiveStat[] = [
  { value: '40', suffix: '+', label: 'Projects shipped' },
  { value: '12', label: 'Industries served' },
  { value: '0.9', suffix: 's', label: 'Median CWV' },
  { value: '96', suffix: '/100', label: 'Avg Lighthouse' },
]

export default async function IndustriesPage() {
  const [industries, content] = await Promise.all([getIndustries(), getArchive('industries')])

  const heroStats = content?.hero_stats?.length ? content.hero_stats : FALLBACK_HERO_STATS
  const resultsStats = content?.results_stats?.length ? content.results_stats : FALLBACK_RESULTS

  return (
    <>
      <header className="svc-hero">
        <div className="strx-container inner">
          <div className="crumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span>Industries</span>
          </div>
          <div className="lead-grid">
            <div>
              <Eyebrow>{content?.hero_eyebrow ?? '// Industries'}</Eyebrow>
              <h1>
                Built for how your <span className="accent">industry</span> actually works.
              </h1>
            </div>
            <div>
              <p className="lead">
                {content?.hero_lead ??
                  "Every field has its own rules — compliance, conversion, accessibility, speed. We bring the patterns that win in yours, not a generic template."}
              </p>
              <div className="acts">
                <Link href="/contact" className="btn btn-dark">
                  Start a project →
                </Link>
                <Link href="#grid" className="btn btn-ghost">
                  Browse industries
                </Link>
              </div>
            </div>
          </div>
          <div className="h-stats reveal" style={{ marginTop: 'var(--space-9)', maxWidth: 560 }}>
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

      <section className="manifesto">
        <div className="strx-container">
          {content?.manifesto ? (
            <p className="big reveal">{content.manifesto}</p>
          ) : (
            <p className="big reveal">
              <span className="mut">A pattern that converts a fashion store will sink a clinic.</span>{' '}
              We start from your industry&apos;s real constraints — and design the web that{' '}
              <span className="accent">moves your numbers.</span>
            </p>
          )}
        </div>
      </section>

      <section className="sec cream" id="grid">
        <div className="strx-container">
          <div className="sec-head reveal">
            <Eyebrow>// Where we work</Eyebrow>
            <h2>
              Six industries, <span className="accent">one playbook each.</span>
            </h2>
            <p>Pick yours to see the problems we solve, the patterns we use, and the numbers we move.</p>
          </div>
          <div className="ind-cards">
            {industries.map((industry) => (
              <IndustryCard key={industry.id} industry={industry} />
            ))}
          </div>
        </div>
      </section>

      <section className="sec on-dark" id="results">
        <div className="strx-container">
          <div className="sec-head reveal">
            <Eyebrow dark>{content?.results_eyebrow ?? '// Across every industry'}</Eyebrow>
            <h2>
              {content?.results_heading ?? 'The standard '}
              <span className="accent">{content?.results_heading_accent ?? "doesn't change."}</span>
            </h2>
            <p>
              {content?.results_lead ??
                'Different problems, same bar: fast, accessible, measurable. Averaged across all projects in the last 24 months.'}
            </p>
          </div>
          <div className="stat-strip reveal">
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

      <CtaSection
        heading={
          <>
            Don&apos;t see your <span className="accent">industry?</span>
          </>
        }
        text="We've shipped in 12 of them and counting. Tell us about yours — a 30-minute call to see if we're a fit."
        secondary={{ label: 'View work', href: '/work' }}
      />
    </>
  )
}
