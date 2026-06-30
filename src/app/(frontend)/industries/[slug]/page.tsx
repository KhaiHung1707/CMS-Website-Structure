import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getIndustryBySlug, getIndustrySlugs } from '@/lib/content'
import type { Industry } from '@/lib/content/types'
import { buildMetadata } from '@/lib/utils/seo'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CtaSection } from '@/components/layout/CtaSection'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { FaqList } from '@/components/sections/FaqList'
import { IndustryStory } from '@/components/sections/IndustryStory'
import { CapabilityLibrary } from '@/components/sections/CapabilityLibrary'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { RelatedIndustries } from '@/components/sections/RelatedIndustries'
import { renderAccentHeading } from '@/lib/utils/accentHeading'
import './single-industry.css'

export async function generateStaticParams() {
  const slugs = await getIndustrySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const industry = await getIndustryBySlug(slug)
  if (!industry) return {}
  return buildMetadata({
    seo: industry.seo,
    fallbackTitle: industry.title,
    fallbackDescription: industry.lead,
  })
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = await getIndustryBySlug(slug)
  if (!industry) notFound()

  const related = (industry.related ?? []).filter(
    (r): r is Industry => typeof r === 'object' && r !== null,
  )

  // "Rich" = the service-style layout (has a process timeline). Drives the bare,
  // continuous results strip that the template uses.
  const isRich = !!(industry.process && industry.process.length > 0)
  const cta = industry.cta

  return (
    <>
      <header className="svc-hero">
        <div className="strx-container inner">
          <div className="crumb">
            <Link href="/industries">Industries</Link>
            <span className="sep">/</span>
            <span>{industry.title}</span>
          </div>
          <div className="lead-grid">
            <div>
              {industry.eyebrow ? <Eyebrow>{industry.eyebrow}</Eyebrow> : null}
              <h1>{industry.hero_heading ? renderAccentHeading(industry.hero_heading) : industry.title}</h1>
            </div>
            <div>
              <p className="lead">{industry.hero_lead ?? industry.lead}</p>
              <div className="acts">
                <Link href="/contact" className="btn btn-dark">
                  Start a project →
                </Link>
                <Link href="/work" className="btn btn-ghost">
                  View work
                </Link>
              </div>
            </div>
          </div>
          {industry.hero_metrics && industry.hero_metrics.length > 0 ? (
            <div className="h-stats reveal">
              {industry.hero_metrics.map((m, i) => (
                <div className="hs" key={i}>
                  <div className="v">{m.value}</div>
                  <div className="k">{m.label}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      {industry.manifesto ? (
        <section className="manifesto">
          <div className="strx-container">
            <p className="big reveal">{renderAccentHeading(industry.manifesto)}</p>
          </div>
        </section>
      ) : null}

      <IndustryStory story={industry.story} slug={industry.slug} />

      <CapabilityLibrary library={industry.library} />

      {industry.process && industry.process.length > 0 ? (
        <section className="sec on-dark" id="process">
          <div className="strx-container">
            <div className="sec-head reveal">
              <Eyebrow dark>// Process</Eyebrow>
              <h2>
                Done for you — you never <span className="accent">touch the tech.</span>
              </h2>
              <p>We build it, connect it to the software you have, and train your team.</p>
            </div>
            <ProcessTimeline steps={industry.process} />
          </div>
        </section>
      ) : null}

      {industry.stats && industry.stats.length > 0 ? (
        // Rich (service-style) layout: a bare stat strip flowing under Process,
        // matching the template. Legacy industries keep their own results heading.
        <section className={isRich ? 'sec on-dark results-tight' : 'sec on-dark'} id="results">
          <div className="strx-container">
            {isRich ? null : (
              <div className="sec-head reveal">
                <Eyebrow dark>// Results</Eyebrow>
                <h2>
                  Numbers that <span className="accent">moved.</span>
                </h2>
                <p>Representative outcomes after go-live.</p>
              </div>
            )}
            <div
              className="stat-strip reveal"
              // No inline grid in the rich layout — let the CSS (4-col → 2-col @800px)
              // handle responsiveness. Inline grid would override the media query.
              style={isRich ? undefined : { gridTemplateColumns: `repeat(${industry.stats.length}, 1fr)` }}
            >
              {industry.stats.map((stat, i) => (
                <div key={i} className="stat-cell">
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
      ) : null}

      {industry.faqs && industry.faqs.length > 0 ? (
        <section className="sec cream" id="faq">
          <div className="strx-container">
            <div className="faq-grid">
              <div className="faq-aside reveal">
                <Eyebrow>// FAQ</Eyebrow>
                <h2>
                  {industry.faq_heading ? renderAccentHeading(industry.faq_heading) : `${industry.title} questions.`}
                </h2>
                <p>Don&apos;t see your answer? Message us — we reply within one business day.</p>
                <Link href="/contact" className="btn btn-dark" style={{ marginTop: 24 }}>
                  Contact →
                </Link>
              </div>
              <FaqList faqs={industry.faqs} />
            </div>
          </div>
        </section>
      ) : null}

      <RelatedIndustries related={related} />

      <BlockRenderer blocks={industry.extra_blocks} />

      {cta?.heading ? (
        <CtaSection
          eyebrow={cta.eyebrow ?? '// Get started'}
          heading={renderAccentHeading(cta.heading)}
          text={cta.text ?? undefined}
          primary={
            cta.primary_label
              ? { label: cta.primary_label, href: cta.primary_href ?? '/contact' }
              : undefined
          }
          secondary={
            cta.secondary_label
              ? { label: cta.secondary_label, href: cta.secondary_href ?? '/work' }
              : undefined
          }
        />
      ) : (
        <CtaSection
          heading={
            <>
              Ready to ship <span className="accent">faster?</span>
            </>
          }
          text="A 30-minute call to look at your product and the path from trial to paid."
          secondary={{ label: 'All industries', href: '/industries' }}
        />
      )}
    </>
  )
}
