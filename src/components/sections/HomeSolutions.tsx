interface Solution {
  n: string
  title: string
  desc: string
  tag: string
}

const SOLUTIONS: Solution[] = [
  {
    n: '01',
    title: 'Replatform & migration',
    desc: 'Move off slow templates and legacy CMS onto a typed, headless stack — migrated with zero downtime and no lost rankings.',
    tag: 'E-commerce · SaaS',
  },
  {
    n: '02',
    title: 'Conversion & growth',
    desc: 'We audit the funnel, fix what leaks, and ship experiments — optimizing for revenue and retention, not vanity metrics.',
    tag: 'Growth',
  },
  {
    n: '03',
    title: 'Design systems',
    desc: 'A single source of truth — tokens, components, and docs — so your team ships consistent product faster, for years.',
    tag: 'Scale',
  },
  {
    n: '04',
    title: 'Performance & SEO',
    desc: 'Sub-second loads, Core Web Vitals in the green, and technical SEO baked into the build — not bolted on after launch.',
    tag: 'Foundations',
  },
]

/** Solutions grid on dark (ported 1:1 from Structure Homepage.html). */
export function HomeSolutions() {
  return (
    <section className="sec on-dark" id="solutions">
      <div className="strx-container">
        <div className="sec-head">
          <p className="t-mono dark">// Solutions</p>
          <h2>
            Problems we solve.
            <br />
            <span className="ts-soft">End to end.</span>
          </h2>
          <p>
            We don&apos;t sell hours — we ship outcomes. Here&apos;s where teams bring us in, and what
            they walk away with.
          </p>
        </div>
        <div className="sol-grid">
          {SOLUTIONS.map((s) => (
            <article className="sol-card" key={s.n}>
              <span className="sol-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="sol-tag">{s.tag}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
