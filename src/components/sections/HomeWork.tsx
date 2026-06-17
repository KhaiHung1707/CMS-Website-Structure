import Link from 'next/link'
import type { Project } from '@/lib/content/types'
import { mediaUrl, mediaAlt } from '@/lib/utils/format'

/** Representative thumb placeholder (ported from the template) when a project has no cover. */
function ThumbPlaceholder({ slug }: { slug: string }) {
  return (
    <svg viewBox="0 0 232 160" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`hw-${slug}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A7282B" />
          <stop offset="100%" stopColor="#6F1A1C" />
        </linearGradient>
      </defs>
      <rect width="232" height="160" fill={`url(#hw-${slug})`} />
      <g opacity="0.26" fill="#3E0A0B">
        <rect x="20" y="22" width="120" height="14" rx="3" />
        <rect x="20" y="44" width="80" height="10" rx="3" />
        <rect x="20" y="74" width="192" height="66" rx="8" />
      </g>
    </svg>
  )
}

/**
 * Selected work list (.proj-list) bound to real Project data.
 * Falls back to a representative SVG thumb when a project has no cover, and is
 * hidden entirely if no projects exist yet (the page keeps its other sections).
 */
export function HomeWork({ projects }: { projects: Project[] }) {
  if (!projects.length) return null
  const rows = projects.slice(0, 5)

  return (
    <section className="sec" id="cases">
      <div className="strx-container">
        <div className="sec-head">
          <p className="t-mono">// Selected work</p>
          <h2>
            Selected projects.
            <br />
            <span className="t-soft">Each one a story.</span>
          </h2>
          <p>
            Real builds, measured in numbers. A few of the teams we&apos;ve shipped strategy, design,
            and code with.
          </p>
        </div>

        <div className="proj-list">
          {rows.map((project, i) => {
            const cover = mediaUrl(project.cover)
            return (
              <Link href={`/work/${project.slug}`} className="proj-row" key={project.id}>
                <span className="pr-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="pr-main">
                  <span className="pr-name">{project.title}</span>
                  {project.meta ? <span className="pr-meta">{project.meta}</span> : null}
                </span>
                <span className="pr-right">
                  {project.hero_stat ? <span className="pr-stat">{project.hero_stat}</span> : null}
                  <span className="pr-thumb">
                    {cover ? (
                      <img src={cover} alt={mediaAlt(project.cover, project.title)} />
                    ) : (
                      <ThumbPlaceholder slug={project.slug} />
                    )}
                  </span>
                  <span className="pr-arrow">→</span>
                </span>
              </Link>
            )
          })}
        </div>

        <div className="proj-foot">
          <span className="pf-note">// 48 web products shipped · 8–12 per year</span>
          <Link href="/work" className="btn btn-dark">
            View all work →
          </Link>
        </div>
      </div>
    </section>
  )
}
