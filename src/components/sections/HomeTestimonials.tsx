'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface Slide {
  quote: string
  initials: string
  name: string
  role: string
  co: string
}

const SLIDES: Slide[] = [
  {
    quote:
      'Structure didn’t just make us a beautiful site — they understood the product better than we did. Three months in, conversion had doubled.',
    initials: 'SM',
    name: 'Sarah Martin',
    role: 'CEO, Luma Atelier',
    co: 'E-commerce · London',
  },
  {
    quote:
      'Deeply professional from kickoff to launch. Deadlines hit to the day, clean code, easy to maintain. A 10/10 for any technical team.',
    initials: 'DK',
    name: 'David Kim',
    role: 'CTO, Quartz Analytics',
    co: 'SaaS · Singapore',
  },
  {
    quote:
      'They changed how we think about the web. Not a brochure — a real product that actually generates revenue.',
    initials: 'EP',
    name: 'Emma Petrov',
    role: 'Founder, Nordic Cloud',
    co: 'B2B Infra · Stockholm',
  },
]

export function HomeTestimonials() {
  const [active, setActive] = useState(0)
  return (
    <section className="sec" id="testimonials">
      <div className="strx-container">
        <div className="sec-head">
          <p className="t-mono">// Testimonials</p>
          <h2>
            Trust, built <span className="accent">one project at a time.</span>
          </h2>
          <p>The teams we&apos;ve shipped with — in their own words.</p>
        </div>
        <div className="tst-stage">
          {SLIDES.map((s, i) => (
            <div key={s.initials} className={cn('tst-slide', i === active && 'active')}>
              <blockquote className="tst-quote">
                <span className="qm">&ldquo;</span>
                {s.quote}&rdquo;
              </blockquote>
              <div className="tst-author">
                <span className="tst-avatar">{s.initials}</span>
                <span className="tst-who">
                  <span className="n">{s.name}</span>
                  <span className="r">{s.role}</span>
                </span>
                <span className="tst-co">{s.co}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="tst-controls">
          <div className="tst-dots">
            {SLIDES.map((s, i) => (
              <button
                key={s.initials}
                type="button"
                className={cn('tst-dot', i === active && 'active')}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
          <span className="tst-counter">
            {String(active + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  )
}
