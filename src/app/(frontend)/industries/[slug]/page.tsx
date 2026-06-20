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
import { RelatedIndustries } from '@/components/sections/RelatedIndustries'
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
              <h1>{industry.title}</h1>
            </div>
            <div>
              <p className="lead">{industry.lead}</p>
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
        </div>
      </header>

      <IndustryStory story={industry.story} />

      {industry.stats && industry.stats.length > 0 ? (
        <section className="sec on-dark" id="results">
          <div className="strx-container">
            <div className="sec-head reveal">
              <Eyebrow dark>// Results</Eyebrow>
              <h2>
                Numbers that <span className="accent">moved.</span>
              </h2>
              <p>Representative outcomes after go-live.</p>
            </div>
            <div
              className="stat-strip reveal"
              style={{ gridTemplateColumns: `repeat(${industry.stats.length}, 1fr)` }}
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
                <h2>{industry.title} questions.</h2>
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

      <CtaSection
        heading={
          <>
            Ready to ship <span className="accent">faster?</span>
          </>
        }
        text="A 30-minute call to look at your product and the path from trial to paid."
        secondary={{ label: 'All industries', href: '/industries' }}
      />
    </>
  )
}
