import './single-portfolio.css'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProjectBySlug, getProjectSlugs } from '@/lib/content'
import type { Industry, Service } from '@/lib/content/types'
import { buildMetadata } from '@/lib/utils/seo'
import { mediaUrl, mediaAlt } from '@/lib/utils/format'
import { RichText } from '@/components/ui/RichText'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { CtaSection } from '@/components/layout/CtaSection'
import { PortfolioGallery } from '@/components/sections/PortfolioGallery'
import { RelatedProjects } from '@/components/sections/RelatedProjects'

export async function generateStaticParams() {
  const slugs = await getProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  return buildMetadata({
    seo: project?.seo,
    fallbackTitle: project?.title ?? 'Work',
    fallbackDescription: project?.summary,
  })
}

/** Single case study ported from templates/single-portfolio.html. */
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const industryLabel =
    typeof project.industry === 'string' ? project.industry : (project.industry as Industry | null)?.title
  const services = (project.services ?? []).map((s) => (typeof s === 'string' ? s : (s as Service).title))
  const cover = mediaUrl(project.cover)
  const stats = project.stats ?? []

  return (
    <>
      {/* HERO */}
      <header className="svc-hero">
        <div className="strx-container inner">
          <div className="crumb">
            <Link href="/work">Work</Link>
            <span className="sep">/</span>
            <span>{project.title}</span>
          </div>
          <div className="lead-grid">
            <div>
              {industryLabel ? <p className="t-mono">// {industryLabel}</p> : null}
              <h1>{project.title}</h1>
              {project.summary ? (
                <p className="lead" style={{ marginTop: 'var(--space-5)' }}>
                  {project.summary}
                </p>
              ) : null}
              <div className="acts">
                {project.live_url ? (
                  <a href={project.live_url} className="btn btn-dark">
                    Visit live site →
                  </a>
                ) : null}
                <Link href="/work" className="btn btn-ghost">
                  All work
                </Link>
              </div>
            </div>
            <div className="cs-meta">
              {project.client ? (
                <div className="row"><div className="k">Client</div><div className="v">{project.client}</div></div>
              ) : null}
              {project.duration ? (
                <div className="row"><div className="k">Duration</div><div className="v">{project.duration}</div></div>
              ) : null}
              {industryLabel ? (
                <div className="row"><div className="k">Industry</div><div className="v">{industryLabel}</div></div>
              ) : null}
              {services.length > 0 ? (
                <div className="row">
                  <div className="k">Services</div>
                  <div className="chips">
                    {services.map((s) => (
                      <span className="chip" key={s}>{s}</span>
                    ))}
                  </div>
                </div>
              ) : null}
              {project.live_url ? (
                <div className="row">
                  <div className="k">Live</div>
                  <div className="v">
                    <a href={project.live_url} className="live">{project.live_url} →</a>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="cs-cover">
            {cover ? (
              <img src={cover} alt={mediaAlt(project.cover, project.title)} />
            ) : (
              <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="csv" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#A7282B" />
                    <stop offset="100%" stopColor="#1a1a1a" />
                  </linearGradient>
                </defs>
                <rect width="1200" height="600" fill="url(#csv)" />
                <g fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1">
                  <path d="M0 150H1200M0 300H1200M0 450H1200M300 0V600M600 0V600M900 0V600" />
                </g>
              </svg>
            )}
          </div>
        </div>
      </header>

      {/* CHALLENGE */}
      {project.challenge ? (
        <section className="sec">
          <div className="strx-container">
            <div className="cs-prose">
              <div>
                <p className="t-mono">// The challenge</p>
                <h2>{project.challenge_title ?? 'The challenge.'}</h2>
              </div>
              <RichText data={project.challenge} className="body" />
            </div>
          </div>
        </section>
      ) : null}

      {/* APPROACH */}
      {project.approach ? (
        <section className="sec cream">
          <div className="strx-container">
            <div className="cs-prose">
              <div>
                <p className="t-mono">// Our approach</p>
                <h2>{project.approach_title ?? 'Our approach.'}</h2>
              </div>
              <RichText data={project.approach} className="body" />
            </div>
          </div>
        </section>
      ) : null}

      {/* RESULTS */}
      {stats.length > 0 ? (
        <section className="sec on-dark">
          <div className="strx-container">
            <div className="sec-head reveal">
              <p className="t-mono dark">// Results</p>
              <h2>
                Numbers that <span className="accent">moved.</span>
              </h2>
            </div>
            <div className="cs-results reveal">
              {stats.map((stat, i) => (
                <div className="st" key={i}>
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

      {/* GALLERY */}
      <PortfolioGallery gallery={project.gallery ?? []} />

      {/* NEXT PROJECTS */}
      <RelatedProjects related={project.related ?? []} />

      {/* EXTRA BLOCKS */}
      <BlockRenderer blocks={project.extra_blocks} />

      {/* CTA */}
      <CtaSection
        eyebrow="// Start a project"
        heading={<>Have a build <span className="accent">like this?</span></>}
        text="A 30-minute call to scope the work and the fastest path to launch."
        primary={{ label: 'Start a project →', href: '/contact' }}
        secondary={{ label: 'View all work', href: '/work' }}
      />
    </>
  )
}
