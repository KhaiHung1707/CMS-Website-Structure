import type { AnyBlock, StatItem } from '@/lib/content/types'
import { Eyebrow } from '@/components/ui/Eyebrow'

/** stats block → on-dark .stat-strip (matches the work/industry results pattern). */
export function StatsBlockView({ block }: { block: AnyBlock }) {
  const eyebrow = block.eyebrow as string | undefined
  const heading = block.heading as string | undefined
  const items = (block.items as StatItem[] | undefined) ?? []
  if (items.length === 0) return null
  return (
    <section className="sec on-dark">
      <div className="strx-container">
        {(eyebrow || heading) && (
          <div className="sec-head">
            {eyebrow ? <Eyebrow dark>{eyebrow}</Eyebrow> : null}
            {heading ? <h2>{heading}</h2> : null}
          </div>
        )}
        <div className="stat-strip">
          {items.map((stat, i) => (
            <div className="stat-cell" key={`${stat.label}-${i}`}>
              <div className="v">
                {stat.value}
                {stat.unit ? <span className="s">{stat.unit}</span> : null}
              </div>
              <div className="k">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
