'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * Client filter chips for the work archive. Ports the template's visual
 * filter-chip toggle (.filter / .filter.on) using useState — clicking a chip
 * marks it active. Categories are static, matching templates/work.html.
 */
const CATEGORIES = ['All', 'E-commerce', 'SaaS', 'Fintech', 'Healthcare', 'Real estate', 'Education']

export function WorkFilters() {
  const [active, setActive] = useState('All')

  return (
    <div className="filters">
      {CATEGORIES.map((cat) => (
        <span
          key={cat}
          className={cn('filter', active === cat && 'on')}
          onClick={() => setActive(cat)}
        >
          {cat}
        </span>
      ))}
    </div>
  )
}
