'use client'

import { useState } from 'react'

export interface FaqEntry {
  q: string
  a: string
}

/**
 * FAQ accordion (service.js #faqList port). Single-open behaviour, default open
 * on the first item, toggled via React state. ('use client')
 */
export function ServiceFaq({ items }: { items: FaqEntry[] }) {
  const [open, setOpen] = useState(0)
  return (
    <div id="faqList">
      {items.map((item, i) => (
        <div key={item.q} className={i === open ? 'faq-item open' : 'faq-item'}>
          <button className="faq-q" onClick={() => setOpen(i === open ? -1 : i)}>
            {item.q}
            <span className="faq-ic">+</span>
          </button>
          <div className="faq-a">
            <div className="faq-a-body">{item.a}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
