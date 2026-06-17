import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import '../blog.css'
import { getPostBySlug, getPostSlugs } from '@/lib/content'
import { buildMetadata } from '@/lib/utils/seo'
import { mediaUrl, mediaAlt, formatDate } from '@/lib/utils/format'
import { RichText } from '@/components/ui/RichText'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { CtaSection } from '@/components/layout/CtaSection'

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Not found — Structure' }
  return buildMetadata({ seo: post.seo, fallbackTitle: post.title, fallbackDescription: post.excerpt })
}

/**
 * Blog single. Minimal DS-true layout (no design HTML shipped).
 * TODO(design): replace with single-post.html export when available.
 */
export default async function BlogSinglePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const author = post.author && typeof post.author !== 'string' ? post.author : null
  const authorAvatar = author ? mediaUrl(author.avatar) : ''

  return (
    <>
      <header className="page-hero">
        <div className="strx-container inner">
          <Eyebrow>// {post.category || 'Article'}</Eyebrow>
          <h1>{post.title}</h1>
          <div className="post-meta">
            {author ? (
              <span className="post-author">
                {authorAvatar ? <img src={authorAvatar} alt={mediaAlt(author.avatar, author.name)} /> : null}
                <span>{author.name}</span>
              </span>
            ) : null}
            {post.published_at ? <span className="t-soft">{formatDate(post.published_at)}</span> : null}
          </div>
        </div>
      </header>

      <article className="sec">
        <div className="strx-container post-body">
          <RichText data={post.body} />
        </div>
      </article>

      <BlockRenderer blocks={post.extra_blocks} />
      <CtaSection />
    </>
  )
}
