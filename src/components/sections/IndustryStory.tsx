'use client'

import { useEffect, useRef, useState } from 'react'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Tag } from '@/components/ui/Tag'
import { renderAccentHeading } from '@/lib/utils/accentHeading'
import { StageVisual } from './StageVisual'
import type { StoryStep } from '@/lib/content/types'

interface IndustryStoryProps {
  slug?: string
  story?: {
    eyebrow?: string | null
    title?: string | null
    lead?: string | null
    steps?: StoryStep[] | null
  } | null
}

/**
 * Case-study scrolly section (template industry-saas.html #story), data-driven.
 * The step nearest viewport centre lights its matching panel in the story window.
 * Window chrome is design decoration; copy comes from `industry.story`. Hidden when
 * there are no steps.
 */
export function IndustryStory({ story, slug = '' }: IndustryStoryProps) {
  const steps = story?.steps ?? []
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    if (steps.length === 0) return
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
  }, [steps.length])

  if (steps.length === 0) return null

  const current = steps[active] ?? steps[0]
  const focus = `p${active + 1}`
  const progress = `${((active + 1) / steps.length) * 100}%`

  return (
    <section className="sec cream" id="story">
      <div className="strx-container">
        <div className="sec-head reveal">
          {story?.eyebrow ? <Eyebrow>{story.eyebrow}</Eyebrow> : null}
          {story?.title ? <h2>{renderAccentHeading(story.title)}</h2> : null}
          {story?.lead ? <p>{story.lead}</p> : null}
        </div>

        <div className="scrolly-grid">
          <div className="scrolly-visual">
            <StageVisual
              slug={slug}
              active={active}
              stepCount={steps.length}
              fallback={
                <div className="story-window story-art" data-focus={focus}>
                  <div className="story-chrome">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                    <span className="ttl">{story?.title ?? 'Case study'}</span>
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
              }
            />
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
      </div>
    </section>
  )
}
