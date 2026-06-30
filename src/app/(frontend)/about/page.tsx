import type { Metadata } from 'next'
import './about.css'
import { CtaSection } from '@/components/layout/CtaSection'
import { Eyebrow } from '@/components/ui/Eyebrow'

export const metadata: Metadata = {
  title: 'About — Structure',
  description:
    'Five people. All senior. We take on fewer projects so each one gets full attention — and so we stay proud of what we ship.',
}

interface Member {
  nm: string
  rl: string
  art: React.ReactNode
}

const TEAM: Member[] = [
  {
    nm: 'Dana Reyes',
    rl: 'Founder · Design',
    art: (
      <svg viewBox="0 0 200 200">
        <rect width="200" height="200" fill="#A7282B" />
        <circle cx="100" cy="80" r="34" fill="#3E0A0B" opacity="0.28" />
        <rect x="48" y="128" width="104" height="64" rx="32" fill="#3E0A0B" opacity="0.28" />
      </svg>
    ),
  },
  {
    nm: 'Minh Trần',
    rl: 'Lead Engineer',
    art: (
      <svg viewBox="0 0 200 200">
        <rect width="200" height="200" fill="#1C1C22" />
        <circle cx="100" cy="80" r="34" fill="#fff" opacity="0.22" />
        <rect x="48" y="128" width="104" height="64" rx="32" fill="#fff" opacity="0.22" />
      </svg>
    ),
  },
  {
    nm: 'Sofia Park',
    rl: 'Product Designer',
    art: (
      <svg viewBox="0 0 200 200">
        <rect width="200" height="200" fill="#232329" />
        <circle cx="100" cy="80" r="34" fill="#fff" opacity="0.22" />
        <rect x="48" y="128" width="104" height="64" rx="32" fill="#fff" opacity="0.22" />
      </svg>
    ),
  },
  {
    nm: 'Liam Nguyễn',
    rl: 'Frontend Eng',
    art: (
      <svg viewBox="0 0 200 200">
        <rect width="200" height="200" fill="#8B1F22" />
        <circle cx="100" cy="80" r="34" fill="#fff" opacity="0.22" />
        <rect x="48" y="128" width="104" height="64" rx="32" fill="#fff" opacity="0.22" />
      </svg>
    ),
  },
  {
    nm: 'Aria Vũ',
    rl: 'SEO · Performance',
    art: (
      <svg viewBox="0 0 200 200">
        <rect width="200" height="200" fill="#2A2A2A" />
        <circle cx="100" cy="80" r="34" fill="#A7282B" opacity="0.85" />
        <rect x="48" y="128" width="104" height="64" rx="32" fill="#A7282B" opacity="0.7" />
      </svg>
    ),
  },
]

const VALUES: { vn: string; h: string; p: string }[] = [
  { vn: '01', h: 'Quality over speed', p: 'We’ll extend a timeline to hit the bar. We don’t ship "good enough".' },
  { vn: '02', h: 'Less but better', p: '8–12 projects a year instead of 50. Each one gets 100% of our attention.' },
  { vn: '03', h: 'Direct, always', p: 'Work directly with the designer/developer. No middle layers.' },
  { vn: '04', h: 'Measure everything', p: 'Every decision is grounded in data. Beautiful isn’t enough — it has to work.' },
  { vn: '05', h: 'Own the outcome', p: "We don't vanish after go-live. The outcome is our responsibility." },
  { vn: '06', h: 'Build to last', p: 'Typed, structured, maintainable code. So the product outlives the project.' },
]

const STATS: { v: React.ReactNode; k: string }[] = [
  { v: '5', k: 'People · all senior' },
  { v: '8–12', k: 'Projects per year' },
  { v: <>40<span className="s">+</span></>, k: 'Products shipped' },
  { v: '6', k: 'Years operating' },
]

export default function AboutPage() {
  return (
    <div className="about-page">
      <header className="page-hero">
        <div className="strx-container inner">
          <Eyebrow>// About Structure</Eyebrow>
          <h1>
            A small studio.
            <br />
            Working <span className="accent">extremely carefully.</span>
          </h1>
          <p className="lead">
            Five people. All senior. We take on fewer projects so each one gets full attention — and so
            we stay proud of what we ship.
          </p>
        </div>
      </header>

      <section className="sec" id="journey">
        <div className="strx-container">
          <div className="journey">
            <aside>
              <div className="num">01</div>
              <div className="lb">Our story</div>
            </aside>
            <div className="body">
              <p>
                Structure didn’t start from a business plan — it started from a question: &quot;Why is
                the web still slow and ugly when the technology is more than good enough to do it
                well?&quot;
              </p>
              <p className="muted">
                We came from large agencies, where projects passed through too many layers and quality
                fell away along the path. So we built the opposite kind of studio: small, direct, and
                owning the outcome end to end.
              </p>
              <blockquote>
                &quot;We build the web like a building — designed on a grid, engineered to last.&quot;
              </blockquote>
              <p className="muted">
                Today we still hold to that principle. Every product is measured in numbers, every
                decision is explained, and every line of code has someone accountable for it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team section hidden per request. The TEAM data + about.css .team-* rules
          are kept so it can be re-enabled by un-commenting this block.
      <section className="sec on-dark" id="team">
        <div className="strx-container">
          <div className="sec-head">
            <Eyebrow dark>// Team</Eyebrow>
            <h2>
              Five people. No more. <span className="accent">Senior only.</span>
            </h2>
            <p>No juniors, no interns filling in. The person you talk to is the person who designs and builds.</p>
          </div>
          <div className="team-grid">
            {TEAM.map((m) => (
              <div className="team-card" key={m.nm}>
                <div className="ph">{m.art}</div>
                <div className="meta">
                  <div className="nm">{m.nm}</div>
                  <div className="rl">{m.rl}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      <section className="sec" id="values">
        <div className="strx-container">
          <div className="sec-head">
            <Eyebrow>// Core values</Eyebrow>
            <h2>
              Six principles <span className="accent">that shape every decision.</span>
            </h2>
          </div>
          <div className="val-grid">
            {VALUES.map((v) => (
              <div className="val-card" key={v.vn}>
                <div className="vn">{v.vn}</div>
                <h4>{v.h}</h4>
                <p>{v.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec on-dark" id="numbers">
        <div className="strx-container">
          <div className="sec-head">
            <Eyebrow dark>// By the numbers</Eyebrow>
            <h2>
              The studio in <span className="accent">60 seconds.</span>
            </h2>
          </div>
          <div className="stat-strip">
            {STATS.map((s, i) => (
              <div className="stat-cell" key={i}>
                <div className="v">{s.v}</div>
                <div className="k">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        eyebrow="// Work with us"
        heading={
          <>
            Like how <span className="accent">we work?</span>
          </>
        }
        text="A 30-minute call to see if we're a fit — no sales pitch, no commitment."
        primary={{ label: 'Contact →', href: '/contact' }}
        secondary={{ label: 'View work', href: '/work' }}
      />
    </div>
  )
}
