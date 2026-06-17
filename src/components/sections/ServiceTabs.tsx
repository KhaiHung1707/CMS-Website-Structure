'use client'

import { useEffect, useRef, useState } from 'react'
import { Tag } from '@/components/ui/Tag'

interface ScrollyStep {
  num: string
  cap: string
  title: string
  desc: string
  focus: string
  tags: string[]
}

/**
 * SCROLLY — sticky highlight artifact + scrolling steps (service.js port).
 * The step nearest viewport centre lights up its matching `data-part` in the
 * persistent story window. Replaces the scroll-position logic from service.js
 * with React state. ('use client')
 */
export function ServiceTabs({ steps, children }: { steps: ScrollyStep[]; children: React.ReactNode }) {
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

  const focus = steps[active]?.focus ?? 'p1'
  const progress = `${((active + 1) / steps.length) * 100}%`

  return (
    <div className="scrolly-grid">
      <div className="scrolly-visual">
        <div className="story-window story-art" data-focus={focus}>
          {children}
          <div className="story-progress" style={{ width: progress }} />
        </div>
      </div>

      <div className="scrolly-steps">
        {steps.map((s, i) => (
          <article
            key={s.focus}
            ref={(el) => {
              stepRefs.current[i] = el
            }}
            className={i === active ? 'scrolly-step active' : 'scrolly-step'}
            data-step={i}
            data-focus={s.focus}
          >
            <div className="ss-num">
              <span className="dot">{s.num}</span>
              {s.cap}
            </div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="ss-tags">
              {s.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
