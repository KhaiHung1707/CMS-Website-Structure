'use client'

import { useMemo, useState } from 'react'
import { WorkCard } from '@/components/cards/WorkCard'
import { cn } from '@/lib/utils/cn'
import type { Project } from '@/lib/content/types'

function industryLabel(project: Project): string | null {
  if (!project.industry) return null
  return typeof project.industry === 'object' ? project.industry.title : project.industry
}

/**
 * Work archive grid + filter chips. Categories are derived from the industries
 * present in the data; clicking a chip filters the grid by industry (real filter,
 * not cosmetic). Keeps the template's `.filters` / `.filter.on` / `.work-grid` DOM.
 */
export function WorkGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>()
    projects.forEach((p) => {
      const label = industryLabel(p)
      if (label) set.add(label)
    })
    return ['All', ...Array.from(set)]
  }, [projects])

  const [active, setActive] = useState('All')
  const visible = active === 'All' ? projects : projects.filter((p) => industryLabel(p) === active)

  return (
    <>
      <div className="filters">
        {categories.map((cat) => (
          <span
            key={cat}
            className={cn('filter', active === cat && 'on')}
            onClick={() => setActive(cat)}
          >
            {cat}
          </span>
        ))}
      </div>
      {/* @cms:loop name="portfolio" — each project → WorkCard */}
      <div className="work-grid" data-cms-loop="portfolio">
        {visible.map((project) => (
          <WorkCard key={project.id} project={project} />
        ))}
      </div>
    </>
  )
}
