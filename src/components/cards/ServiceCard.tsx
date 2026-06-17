import Link from 'next/link'
import type { Service } from '@/lib/content/types'
import { Tag } from '@/components/ui/Tag'

/**
 * `.svc-deep` deep-dive card for the services archive.
 * DOM ported 1:1 from templates/services.html (@cms:loop service).
 * number→.sd-n, title→h3, lead→.sd-desc, tags→.sd-tags,
 * metric_value→.sd-metric .v, metric_label→.sd-metric .k, link→/services/{slug}.
 */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="svc-deep">
      <div className="sd-n">{service.number}</div>
      <div>
        <h3>{service.title}</h3>
        <p className="sd-desc">{service.lead}</p>
        {service.tags && service.tags.length > 0 ? (
          <div className="sd-tags">
            {service.tags.map((tag, i) => (
              <Tag key={`${tag.label}-${i}`}>{tag.label}</Tag>
            ))}
          </div>
        ) : null}
        <Link href={`/services/${service.slug}`} className="sd-link">
          View details →
        </Link>
      </div>
      <div className="sd-side">
        {service.metric_value ? (
          <div className="sd-metric">
            <div className="v">{service.metric_value}</div>
            <div className="k">{service.metric_label}</div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
