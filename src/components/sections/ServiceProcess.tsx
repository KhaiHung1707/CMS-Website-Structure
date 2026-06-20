import type { Service } from '@/lib/content/types'

/**
 * `.proc-line` process timeline (Server Component). Renders `service.process`
 * steps; the last two render in the `.future` state, matching service-saas.html.
 * Returns null when there are no steps (caller also guards).
 */
export function ServiceProcess({ steps }: { steps?: Service['process'] }) {
  const items = steps ?? []
  if (items.length === 0) return null
  return (
    <div className="proc-line">
      {items.map((s, i) => (
        <div key={`${s.title}-${i}`} className={i >= items.length - 2 ? 'proc-step future' : 'proc-step'}>
          <div className="pw">{s.step}</div>
          <div className="pd" />
          <h4>{s.title}</h4>
          <p>{s.desc}</p>
        </div>
      ))}
    </div>
  )
}
