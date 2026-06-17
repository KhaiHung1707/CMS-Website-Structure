import Link from 'next/link'
import type { Project } from '@/lib/content/types'

/**
 * "Next project" related grid (.other-grid → .other-card) ported from
 * single-portfolio.html (CMS:REPEAT related). Resolved Project relations only;
 * unresolved string ids are skipped. meta → .oc-n, title → h4.
 */
export function RelatedProjects({ related }: { related: (Project | string)[] }) {
  const items = related.filter((r): r is Project => typeof r !== 'string')
  if (items.length === 0) return null

  return (
    <section className="sec cream">
      <div className="strx-container">
        <div className="sec-head reveal">
          <p className="t-mono">// Next project</p>
          <h2>
            More <span className="accent">work.</span>
          </h2>
        </div>
        <div className="other-grid">
          {items.map((project) => (
            <Link href={`/work/${project.slug}`} className="other-card reveal" key={project.id}>
              <div>
                {project.meta ? <div className="oc-n">{project.meta}</div> : null}
                <h4>{project.title}</h4>
              </div>
              <span className="oc-arr">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
