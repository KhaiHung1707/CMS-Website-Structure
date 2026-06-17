'use client'

import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface Faq {
  q: string
  a: string
}

const FAQS: Faq[] = [
  {
    q: 'How long does a typical project take?',
    a: 'A Studio engagement is usually 6–12 weeks from kick-off to launch, with clear weekly deliverables.',
  },
  {
    q: 'What stack do you use?',
    a: 'Next.js, TypeScript, Tailwind. Supabase, Stripe, and CMS integrations depending on each industry’s needs.',
  },
  {
    q: 'Do you work in specific industries?',
    a: 'Yes. We tune scope and technical priorities by industry — e-commerce, SaaS, fintech, healthcare, real estate, education.',
  },
  {
    q: 'Do you offer retainers after launch?',
    a: 'Yes. Two-week sprints, async-first, monthly metrics reports for continuous optimization.',
  },
  {
    q: 'How much does a project cost?',
    a: 'It depends on scope. After kick-off we send a fixed quote staged by phase — no surprises.',
  },
]

export function HomeFaq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="sec cream" id="faq">
      <div className="strx-container">
        <div className="faq-grid">
          <div className="faq-aside">
            <p className="t-mono">// FAQ</p>
            <h2>Frequently asked questions.</h2>
            <p>Don&apos;t see the answer you need? Message us — we reply within one business day.</p>
            <Link href="/contact" className="btn btn-dark">
              Contact →
            </Link>
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
