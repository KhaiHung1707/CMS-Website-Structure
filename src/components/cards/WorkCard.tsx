import Link from 'next/link'
import type { Project } from '@/lib/content/types'
import { mediaUrl, mediaAlt } from '@/lib/utils/format'
import { cn } from '@/lib/utils/cn'

/**
 * Masonry work card (.work-card) ported 1:1 from templates/work.html.
 * `featured` adds the 'feature' class (wide cell). Renders the project cover as
 * <img> when available, otherwise keeps the representative inline SVG placeholder
 * so the card layout holds. .info bindings: meta → .m, title → h3, hero_stat → .st.
 */
export function WorkCard({ project }: { project: Project }) {
  const cover = mediaUrl(project.cover)

  return (
    <Link className={cn('work-card', project.featured && 'feature')} href={`/work/${project.slug}`}>
      {cover ? (
        <img src={cover} alt={mediaAlt(project.cover, project.title)} />
      ) : (
        <svg viewBox="0 0 300 375" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id={`wc-${project.slug}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1C1C22" />
              <stop offset="100%" stopColor="#3A3A44" />
            </linearGradient>
          </defs>
          <rect width="300" height="375" fill={`url(#wc-${project.slug})`} />
          <g opacity="0.22" fill="#fff">
            <rect x="22" y="48" width="92" height="22" rx="4" />
            <rect x="22" y="88" width="72" height="72" rx="8" />
            <rect x="106" y="88" width="72" height="72" rx="8" />
            <rect x="22" y="176" width="256" height="150" rx="8" />
          </g>
        </svg>
      )}
      <div className="ov" />
      <div className="peek">↗</div>
      <div className="info">
        {project.meta ? <div className="m">{project.meta}</div> : null}
        <h3>{project.title}</h3>
        {project.hero_stat ? <div className="st">{project.hero_stat}</div> : null}
      </div>
    </Link>
  )
}
