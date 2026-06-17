import Link from 'next/link'
import type { Industry } from '@/lib/content/types'

/**
 * Archive industry card (.ind-card) ported from templates/industries.html.
 * DOM + class names match the template 1:1; static text comes from `industry`.
 */
export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <Link className="ind-card reveal" href={`/industries/${industry.slug}`}>
      <div>
        <div className="ic-n">{industry.number}</div>
        <h3>{industry.title}</h3>
        <p className="ic-desc">{industry.lead}</p>
        {industry.tags && industry.tags.length > 0 ? (
          <div className="ic-tags">
            {industry.tags.map((tag, i) => (
              <span key={i} className="ic-tag">
                {tag.label}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="ic-side">
        <div className="ic-stat">
          <div className="v">{industry.stat_value}</div>
          <div className="k">{industry.stat_label}</div>
        </div>
        <span className="ic-arr">→</span>
      </div>
    </Link>
  )
}
