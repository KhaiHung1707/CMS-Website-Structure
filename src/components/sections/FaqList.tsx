'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface FaqListProps {
  faqs: { q: string; a: string }[]
}

/**
 * FAQ accordion ported from the single-industry template (#faqList).
 * Open/close state is client-side; first item opens by default (template parity).
 */
export function FaqList({ faqs }: FaqListProps) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div id="faqList">
      {faqs.map((faq, i) => {
        const open = openIndex === i
        return (
          <div key={i} className={cn('faq-item', open && 'open')}>
            <button
              type="button"
              className="faq-q"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? -1 : i)}
            >
              {faq.q}
              <span className="faq-ic">+</span>
            </button>
            <div className="faq-a">
              <div style={{ paddingTop: 4 }}>{faq.a}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
