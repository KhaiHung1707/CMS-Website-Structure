'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

const FAQS: { q: string; a: string }[] = [
  {
    q: 'Do you take on small projects?',
    a: "Yes, as long as the problem is clear and within what we do. Send an inquiry and we'll take a look.",
  },
  {
    q: 'How fast do you reply?',
    a: 'Within one business day. If it fits, we propose a 30-minute discovery call.',
  },
  {
    q: 'Do you work remotely?',
    a: 'Yes. Remote-first, serving clients worldwide, async-first.',
  },
  {
    q: 'What should I prepare before the call?',
    a: 'Just a few lines about goals, timeline, and any materials you have. No complete brief needed.',
  },
]

/** Contact FAQ accordion (ported 1:1 from templates/contact.html #faq). */
export function ContactFaq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="sec" id="faq">
      <div className="strx-container">
        <div className="faq-grid">
          <div className="faq-aside">
            <p className="t-mono">// Before you send an inquiry</p>
            <h2>A few things that might help.</h2>
            <p>Don&apos;t see your answer? Just send an inquiry — we&apos;ll clarify on the call.</p>
          </div>
          <div>
            {FAQS.map((f, i) => (
              <div key={f.q} className={cn('faq-item', i === open && 'open')}>
                <button
                  type="button"
                  className="faq-q"
                  onClick={() => setOpen(i === open ? -1 : i)}
                >
                  {f.q}
                  <span className="faq-ic">+</span>
                </button>
                <div className="faq-a">
                  <div className="inner-pad">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
