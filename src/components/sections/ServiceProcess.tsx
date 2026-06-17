import type { Service } from '@/lib/content/types'

type ProcessStep = NonNullable<Service['process']>[number]

const FALLBACK_STEPS: ProcessStep[] = [
  { step: 'Weeks 1–2', title: 'Foundation', desc: 'Multi-tenant architecture, auth, and data model.' },
  { step: 'Weeks 3–7', title: 'Core build', desc: 'Dashboard, core features, weekly staging.' },
  { step: 'Week 8', title: 'Billing', desc: 'Plan, payment, and invoice integration.' },
  { step: 'Weeks 9+', title: 'Scale', desc: 'Performance tuning, launch, and ongoing growth.' },
]

/**
 * `.proc-line` process timeline (Server Component). Renders `service.process`
 * steps; the last two render in the `.future` state, matching service-saas.html.
 */
export function ServiceProcess({ steps }: { steps?: Service['process'] }) {
  const items = steps && steps.length > 0 ? steps : FALLBACK_STEPS
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
