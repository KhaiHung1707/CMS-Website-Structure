import type { Metadata } from 'next'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Tag } from '@/components/ui/Tag'
import { CtaSection } from '@/components/layout/CtaSection'

export const metadata: Metadata = { title: 'Styleguide — Structure' }

/**
 * Token + component verification page. If a value in tokens-brick.css changes,
 * everything here should shift with it (DoD: token-swap test).
 */
export default function StyleguidePage() {
  return (
    <>
      <header className="page-hero">
        <div className="strx-container inner">
          <Eyebrow>// Styleguide</Eyebrow>
          <h1>
            Design tokens <span className="accent">in the flesh.</span>
          </h1>
          <p className="lead">Buttons, tags, cards, type, and stat strips rendered straight from the design system.</p>
        </div>
      </header>

      <section className="sec">
        <div className="strx-container">
          <div className="sec-head">
            <Eyebrow>// Buttons</Eyebrow>
            <h2>Buttons</h2>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <button className="btn btn-dark">Dark</button>
            <button className="btn btn-accent">Accent</button>
            <button className="btn btn-soft">Soft</button>
            <button className="btn btn-ghost">Ghost</button>
            <button className="btn btn-light">Light</button>
          </div>
        </div>
      </section>

      <section className="sec cream">
        <div className="strx-container">
          <div className="sec-head">
            <Eyebrow>// Tags & cards</Eyebrow>
            <h2>Tags & cards</h2>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-6)' }}>
            <Tag dot>Strategy</Tag>
            <Tag>Design</Tag>
            <Tag>Engineering</Tag>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
            <div className="card lift">
              <h3 className="t-h3">Surface</h3>
              <p className="t-soft">.card.lift</p>
            </div>
            <div className="card outline">
              <h3 className="t-h3">Outline</h3>
              <p className="t-soft">.card.outline</p>
            </div>
            <div className="card dark">
              <h3 className="t-h3">Dark</h3>
              <p className="t-soft-dark">.card.dark</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec on-dark">
        <div className="strx-container">
          <div className="sec-head">
            <Eyebrow dark>// Stat strip</Eyebrow>
            <h2>
              Real numbers, <span className="accent">on dark.</span>
            </h2>
          </div>
          <div className="stat-strip">
            <div className="stat-cell"><div className="v">+64<span className="s">%</span></div><div className="k">Average conversion lift</div></div>
            <div className="stat-cell"><div className="v">−52<span className="s">%</span></div><div className="k">Page load time</div></div>
            <div className="stat-cell"><div className="v">96<span className="s">/100</span></div><div className="k">Average Lighthouse</div></div>
            <div className="stat-cell"><div className="v">100<span className="s">%</span></div><div className="k">Zero-downtime go-live</div></div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
