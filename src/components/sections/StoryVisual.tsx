import type { CSSProperties, ReactNode } from 'react'

/**
 * STORY VISUAL — the persistent sticky artifact beside the scrolly steps.
 * Pure design decoration ported 1:1 from templates/service-*.html: web-design,
 * web-app, and saas use a dark `story-window` with four lit panels; seo uses a
 * Google-SERP mock. The active panel is driven by `active` (the step nearest
 * viewport centre, computed in ServiceTabs). Any unknown slug falls back to a
 * generic window built from the step copy, so CMS-authored services still work.
 * CSS lives in assets/service.css (windows) + single-service.css (serp).
 */
export function StoryVisual({
  slug,
  active,
  stepCount,
  fallback,
}: {
  slug: string
  active: number
  stepCount: number
  fallback: ReactNode
}) {
  const progress = `${((active + 1) / Math.max(stepCount, 1)) * 100}%`

  if (slug === 'seo') return <SerpWindow active={active} progress={progress} />

  const window = WINDOWS[slug]
  if (!window) return <>{fallback}</>

  return (
    <div className="story-window story-art" data-focus={`p${active + 1}`}>
      <div className="story-chrome">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="ttl">{window.title}</span>
      </div>
      <div className="story-body">{window.parts}</div>
      <div className="story-progress" style={{ width: progress }} />
    </div>
  )
}

const col = (gap: number, extra?: CSSProperties): CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  gap,
  ...extra,
})

const WINDOWS: Record<string, { title: string; parts: ReactNode }> = {
  'web-design': {
    title: 'luma-atelier.com — design',
    parts: (
      <>
        <div className="story-part" data-part="p1">
          <div className="sp-cap">01 · Structure &amp; wireframe</div>
          <div style={col(10)}>
            <div className="sp-bar" style={{ width: '45%' }} />
            <div className="sp-bar" style={{ width: '75%', height: 20 }} />
            <div className="sp-row" style={{ gap: 10 }}>
              <div className="sp-bar" style={{ flex: 1, height: 46 }} />
              <div className="sp-bar" style={{ flex: 1, height: 46 }} />
              <div className="sp-bar" style={{ flex: 1, height: 46 }} />
            </div>
          </div>
        </div>
        <div className="story-part" data-part="p2">
          <div className="sp-cap">02 · Design system</div>
          <div className="sp-row" style={{ justifyContent: 'space-between' }}>
            <div className="sp-row" style={{ gap: 8 }}>
              <span className="sp-swatch" style={{ background: '#A7282B' }} />
              <span className="sp-swatch" style={{ background: '#0A0A0B' }} />
              <span className="sp-swatch" style={{ background: '#6B6B66' }} />
              <span className="sp-swatch" style={{ background: '#F0EEE6' }} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="sp-title" style={{ fontSize: 22 }}>
                Aa
              </span>{' '}
              <span className="sp-muted">Space Grotesk</span>
            </div>
          </div>
        </div>
        <div className="story-part" data-part="p3" style={{ padding: 0, overflow: 'hidden' }}>
          <div
            style={{
              background: 'var(--accent)',
              color: 'var(--accent-ink)',
              padding: '14px 18px',
              fontWeight: 600,
            }}
          >
            Luma Atelier · Wool coat
          </div>
          <div style={{ padding: '16px 18px' }}>
            <div className="sp-row" style={{ justifyContent: 'space-between' }}>
              <span className="sp-title">$96.00</span>
              <span className="sp-chip accent">Buy now →</span>
            </div>
          </div>
        </div>
        <div className="story-part" data-part="p4">
          <div className="sp-cap">04 · Handoff dev-ready</div>
          <div className="sp-code">
            <span className="k">--space-4</span>: 16px; · <span className="k">--radius-lg</span>: 16px; ·{' '}
            <span className="k">font</span>: 20px/1.4
          </div>
          <div className="sp-row" style={{ gap: 8, marginTop: 12 }}>
            <span className="sp-chip accent">Figma</span>
            <span className="sp-chip">Specs</span>
            <span className="sp-chip">Tokens</span>
          </div>
        </div>
      </>
    ),
  },

  'web-app': {
    title: 'app.structure.studio — build',
    parts: (
      <>
        <div className="story-part" data-part="p1">
          <div className="sp-cap">01 · System architecture</div>
          <div style={col(10, { alignItems: 'center' })}>
            <span className="sp-chip accent">Client</span>
            <span className="sp-muted">↓</span>
            <span className="sp-chip">Next.js · API</span>
            <span className="sp-muted">↓</span>
            <div className="sp-row" style={{ gap: 8 }}>
              <span className="sp-chip">DB</span>
              <span className="sp-chip">Cache</span>
              <span className="sp-chip">Storage</span>
            </div>
          </div>
        </div>
        <div className="story-part" data-part="p2">
          <div className="sp-cap">02 · Typed build</div>
          <div className="sp-code">
            <span className="k">type</span> Project = {'{'} id: <span className="k">string</span>; status:{' '}
            <span className="k">&apos;live&apos;</span> | <span className="k">&apos;draft&apos;</span>; score:{' '}
            <span className="k">number</span> {'}'}
          </div>
          <div className="sp-row" style={{ gap: 8, marginTop: 12 }}>
            <span className="sp-chip accent">0 any</span>
            <span className="sp-chip">Strict mode</span>
          </div>
        </div>
        <div className="story-part" data-part="p3">
          <div className="sp-cap">03 · Integrations</div>
          <div style={col(9)}>
            <div className="sp-row" style={{ justifyContent: 'space-between' }}>
              <span className="sp-title">Supabase</span>
              <span className="sp-chip accent">Auth · DB</span>
            </div>
            <div className="sp-row" style={{ justifyContent: 'space-between' }}>
              <span className="sp-title">Stripe</span>
              <span className="sp-chip accent">Billing</span>
            </div>
            <div className="sp-row" style={{ justifyContent: 'space-between' }}>
              <span className="sp-title">Sanity</span>
              <span className="sp-chip accent">CMS</span>
            </div>
          </div>
        </div>
        <div className="story-part" data-part="p4">
          <div className="sp-cap">04 · Deploy CI/CD</div>
          <div style={col(9)}>
            {['Tests passed', 'Build · 42s', 'Deployed · 0 downtime'].map((label) => (
              <div className="sp-row" style={{ gap: 10 }} key={label}>
                <span
                  style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--accent)' }}
                />
                <span className="sp-title">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    ),
  },

  saas: {
    title: 'app.structure.studio — console',
    parts: (
      <>
        <div className="story-part" data-part="p1">
          <div className="sp-cap">01 · Auth &amp; tenancy</div>
          <div className="sp-bar story-mock-tall" />
          <div className="sp-bar story-mock-tall" />
          <div className="sp-sso">Continue with SSO</div>
          <div className="sp-chips">
            <span className="sp-chip accent">Admin</span>
            <span className="sp-chip">Member</span>
            <span className="sp-chip">Viewer</span>
          </div>
        </div>
        <div className="story-part" data-part="p2">
          <div className="sp-cap">02 · Realtime dashboard</div>
          <div className="sp-split gap">
            <div>
              <span className="sp-num sp-num-lg">1,284</span>
              <div className="sp-muted sp-muted-xs">Active users</div>
            </div>
            <div>
              <span className="sp-num sp-num-lg">+18%</span>
              <div className="sp-muted sp-muted-xs">MoM</div>
            </div>
          </div>
          <svg viewBox="0 0 300 70" className="sp-spark">
            <polyline
              points="6,60 50,48 96,54 142,34 188,40 234,20 296,12"
              fill="none"
              stroke="#A7282B"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="story-part" data-part="p3">
          <div className="sp-cap">03 · Billing</div>
          <div className="sp-split">
            <span className="sp-title">Studio plan</span>
            <span className="sp-num sp-num-md">
              $49<span className="sp-per">/mo</span>
            </span>
          </div>
          <div className="sp-split gap-top">
            <span className="sp-muted">Seats · 8</span>
            <span className="sp-chip accent">Active</span>
          </div>
        </div>
        <div className="story-part" data-part="p4">
          <div className="sp-cap">04 · Scale · tenants</div>
          <div className="sp-tenants">
            {['', 'fill', '', '', 'fill', '', 'fill', '', '', 'fill', '', ''].map((f, i) => (
              <div className={f ? 'sp-bar fill' : 'sp-bar'} key={i} />
            ))}
          </div>
          <div className="sp-split gap-top-lg">
            <span className="sp-muted">128 tenants</span>
            <span className="sp-chip accent">99.9% uptime</span>
          </div>
        </div>
      </>
    ),
  },
}

const SEO_FOCUS = ['title', 'meta', 'schema', 'intent', 'surround'] as const

/** Google-SERP mock for the SEO service (templates/service-seo.html). */
function SerpWindow({ active, progress }: { active: number; progress: string }) {
  const focus = SEO_FOCUS[Math.min(active, SEO_FOCUS.length - 1)]
  return (
    <div className="serp-window" data-focus={focus}>
      <div className="serp-bar">
        <span className="serp-g">
          <span style={{ color: '#4285F4' }}>G</span>
          <span style={{ color: '#EA4335' }}>o</span>
          <span style={{ color: '#FBBC05' }}>o</span>
          <span style={{ color: '#4285F4' }}>g</span>
          <span style={{ color: '#34A853' }}>l</span>
          <span style={{ color: '#EA4335' }}>e</span>
        </span>
        <div className="serp-input">
          seo services for fashion stores<span className="serp-x">×</span>
        </div>
        <span className="serp-mag">⌕</span>
      </div>
      <div className="serp-tabs">
        <span className="on">All</span>
        <span>Images</span>
        <span>News</span>
        <span>Video</span>
        <span>Maps</span>
      </div>
      <div className="serp-meta-line">About 2,140,000 results (0.42 seconds)</div>

      <div className="serp-result surround" data-part="surround">
        <div className="r-url">competitor-a.vn › dich-vu-seo</div>
        <div className="r-title alt">Cheap SEO services — Top rankings guaranteed</div>
        <div className="r-desc">All-in SEO pricing, top-10 Google rankings guaranteed in 3 months…</div>
      </div>

      <div className="serp-result main">
        <div className="r-head part" data-part="meta">
          <span className="fav">S</span>
          <div>
            <div className="r-site">Structure Studio</div>
            <div className="r-url">https://structure.studio › seo</div>
          </div>
        </div>
        <div className="r-title part" data-part="title">
          SEO &amp; Core Web Vitals services for fashion stores
        </div>
        <div className="r-rich part" data-part="schema">
          <span className="stars">★★★★★</span> <b>4.9</b> · 48 reviews · Quotes from $900
        </div>
        <div className="r-desc part" data-part="meta">
          Grow organic search revenue with <b>technical SEO</b> and sub-second page loads. Full
          structured data, rich results on every device…
        </div>
        <div className="r-sitelinks part" data-part="schema">
          <a>
            <span className="sl-t">Pricing &amp; packages</span>
            <span className="sl-d">Transparent, staged by phase</span>
          </a>
          <a>
            <span className="sl-t">Case study</span>
            <span className="sl-d">+186% organic traffic</span>
          </a>
        </div>
      </div>

      <div className="serp-paa part" data-part="intent">
        <div className="paa-h">People also ask</div>
        <div className="paa-q">
          How long does SEO take for a fashion store?<span>+</span>
        </div>
        <div className="paa-q">
          How much does SEO for a website cost?<span>+</span>
        </div>
        <div className="paa-q">
          Should I choose SEO or run ads?<span>+</span>
        </div>
      </div>

      <div className="serp-result surround" data-part="surround">
        <div className="r-url">competitor-b.vn › blog</div>
        <div className="r-title alt">Top 10 trusted SEO companies 2026</div>
        <div className="r-desc">A list of highly rated, leading SEO agencies…</div>
      </div>

      <div className="serp-progress" style={{ width: progress }} />
    </div>
  )
}
