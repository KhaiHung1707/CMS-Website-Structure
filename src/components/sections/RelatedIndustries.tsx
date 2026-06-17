import Link from 'next/link'
import { Eyebrow } from '@/components/ui/Eyebrow'
import type { Industry } from '@/lib/content/types'

/**
 * "Other industries" grid ported from templates/industry-saas.html (#other).
 * Renders related Industry docs as .other-card links.
 */
export function RelatedIndustries({ related }: { related: Industry[] }) {
  if (related.length === 0) return null

  return (
    <section className="sec" id="other">
      <div className="strx-container">
        <div className="sec-head reveal">
          <Eyebrow>// Other industries</Eyebrow>
          <h2>
            Explore <span className="accent">more.</span>
          </h2>
        </div>
        <div className="other-grid">
          {related.map((industry) => (
            <Link
              key={industry.id}
              href={`/industries/${industry.slug}`}
              className="other-card reveal"
            >
              <div>
                <div className="oc-n">{industry.number}</div>
                <h4>{industry.title}</h4>
              </div>
              <span className="oc-arr">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
