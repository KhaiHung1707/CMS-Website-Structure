import type { ProcessStep } from '@/lib/content/types'

/**
 * `.proc-line` timeline driven by an explicit per-step `future` flag (dimmed,
 * upcoming phase). Used by the industry single page. Returns null when empty.
 */
export function ProcessTimeline({ steps }: { steps?: ProcessStep[] | null }) {
  const items = steps ?? []
  if (items.length === 0) return null
  return (
    <div className="proc-line">
      {items.map((s, i) => (
        <div key={`${s.title}-${i}`} className={s.future ? 'proc-step future' : 'proc-step'}>
          <div className="pw">{s.step}</div>
          <div className="pd" />
          <h4>{s.title}</h4>
          <p>{s.desc}</p>
        </div>
      ))}
    </div>
  )
}
