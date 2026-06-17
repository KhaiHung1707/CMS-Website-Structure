import Link from 'next/link'
import type { Post } from '@/lib/content/types'
import { mediaUrl, mediaAlt, formatDate } from '@/lib/utils/format'

/**
 * Blog card. No design HTML was shipped for blog — this is a minimal DS-true card
 * built from existing tokens/classes (.card, .t-mono, .t-h3, .t-soft).
 * TODO(design): replace when Claude Design exports blog.html / single-post.html.
 */
export function PostCard({ post }: { post: Post }) {
  const cover = mediaUrl(post.cover)
  return (
    <Link href={`/blog/${post.slug}`} className="card outline lift post-card">
      {cover ? (
        <div className="post-card-cover">
          <img src={cover} alt={mediaAlt(post.cover, post.title)} />
        </div>
      ) : null}
      <p className="t-mono">
        {post.category || 'Article'}
        {post.published_at ? ` · ${formatDate(post.published_at)}` : ''}
      </p>
      <h3 className="t-h3">{post.title}</h3>
      {post.excerpt ? <p className="t-soft">{post.excerpt}</p> : null}
    </Link>
  )
}
