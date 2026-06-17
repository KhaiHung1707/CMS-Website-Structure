import type { Metadata } from 'next'
import Link from 'next/link'
import { getIndustries } from '@/lib/content'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CtaSection } from '@/components/layout/CtaSection'
import { IndustryCard } from '@/components/cards/IndustryCard'
import './industries.css'

export const metadata: Metadata = {
  title: 'Industries — Structure',
}

export default async function IndustriesPage() {
  const industries = await getIndustries()

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
              <Eyebrow>// Industries</Eyebrow>
              <h1>
                Built for how your <span className="accent">industry</span> actually works.
              </h1>
            </div>
            <div>
              <p className="lead">
                Every field has its own rules — compliance, conversion, accessibility, speed. We
                bring the patterns that win in yours, not a generic template.
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
            <div className="hs">
              <div className="v">12</div>
              <div className="k">Industries served</div>
            </div>
            <div className="hs">
              <div className="v">
                40<span className="s">+</span>
              </div>
              <div className="k">Projects shipped</div>
            </div>
          </div>
        </div>
      </header>

      <section className="manifesto">
        <div className="strx-container">
          <p className="big reveal">
            <span className="mut">A pattern that converts a fashion store will sink a clinic.</span>{' '}
            We start from your industry&apos;s real constraints — and design the web that{' '}
            <span className="accent">moves your numbers.</span>
          </p>
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
            <Eyebrow dark>// Across every industry</Eyebrow>
            <h2>
              The standard <span className="accent">doesn&apos;t change.</span>
            </h2>
            <p>
              Different problems, same bar: fast, accessible, measurable. Averaged across all projects
              in the last 24 months.
            </p>
          </div>
          <div className="stat-strip reveal">
            <div className="stat-cell">
              <div className="v">
                40<span className="s">+</span>
              </div>
              <div className="k">Projects shipped</div>
            </div>
            <div className="stat-cell">
              <div className="v">12</div>
              <div className="k">Industries served</div>
            </div>
            <div className="stat-cell">
              <div className="v">
                0.9<span className="s">s</span>
              </div>
              <div className="k">Median CWV</div>
            </div>
            <div className="stat-cell">
              <div className="v">
                96<span className="s">/100</span>
              </div>
              <div className="k">Avg Lighthouse</div>
            </div>
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
