'use client'

import { useEffect, useRef, useState } from 'react'
import { Tag } from '@/components/ui/Tag'
import type { StoryStep } from '@/lib/content/types'
import { StoryVisual } from './StoryVisual'

/**
 * SCROLLY — sticky highlight artifact + scrolling steps (service.js port).
 * The step nearest viewport centre lights up its panel in the persistent story
 * window. The window itself is the bespoke per-service design artifact (see
 * StoryVisual); all step copy comes from `steps`. ('use client')
 */
export function ServiceTabs({ steps, slug }: { steps: StoryStep[]; slug: string }) {
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const update = () => {
      const mid = window.innerHeight / 2
      let best = 0
      let bestDist = Infinity
      stepRefs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const d = Math.abs(r.top + r.height / 2 - mid)
        if (d < bestDist) {
          bestDist = d
          best = i
        }
      })
      setActive(best)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  if (steps.length === 0) return null

  const current = steps[active] ?? steps[0]
  const focus = `p${active + 1}`
  const progress = `${((active + 1) / steps.length) * 100}%`

  // Generic window used only for CMS-authored services with no bespoke artifact.
  const genericWindow = (
    <div className="story-window story-art" data-focus={focus}>
      <div className="story-chrome">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="ttl">app.structure.studio — console</span>
      </div>
      <div className="story-body">
        <div className="story-part" data-part={focus}>
          <div className="sp-cap">
            {current.num} · {current.cap}
          </div>
          <div className="sp-row" style={{ marginTop: 14 }}>
            <span className="sp-title" style={{ fontSize: 16 }}>
              {current.title}
            </span>
          </div>
        </div>
      </div>
      <div className="story-progress" style={{ width: progress }} />
    </div>
  )

  return (
    <div className="scrolly-grid">
      <div className="scrolly-visual">
        <StoryVisual slug={slug} active={active} stepCount={steps.length} fallback={genericWindow} />
      </div>

      <div className="scrolly-steps">
        {steps.map((s, i) => (
          <article
            key={`${s.num}-${i}`}
            ref={(el) => {
              stepRefs.current[i] = el
            }}
            className={i === active ? 'scrolly-step active' : 'scrolly-step'}
            data-step={i}
            data-focus={`p${i + 1}`}
          >
            <div className="ss-num">
              <span className="dot">{s.num}</span>
              {s.cap}
            </div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            {s.tags && s.tags.length > 0 ? (
              <div className="ss-tags">
                {s.tags.map((t) => (
                  <Tag key={t.label}>{t.label}</Tag>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  )
}
