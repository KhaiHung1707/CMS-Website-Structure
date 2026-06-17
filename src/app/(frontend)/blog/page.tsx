import type { Metadata } from 'next'
import './blog.css'
import { getPosts } from '@/lib/content'
import { PostCard } from '@/components/cards/PostCard'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CtaSection } from '@/components/layout/CtaSection'

export const metadata: Metadata = { title: 'Blog — Structure' }

/**
 * Blog archive. Minimal DS-true layout (no design HTML shipped for blog).
 * TODO(design): replace with the exported blog.html when available.
 */
export default async function BlogArchivePage() {
  const posts = await getPosts()

  return (
    <>
      <header className="page-hero">
        <div className="strx-container inner">
          <Eyebrow>// Blog</Eyebrow>
          <h1>
            Notes on building <span className="accent">the web.</span>
          </h1>
          <p className="lead">Engineering, design, and performance — what we learn shipping production sites.</p>
        </div>
      </header>

      <section className="sec">
        <div className="strx-container">
          {posts.length > 0 ? (
            <div className="blog-grid">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="t-mono">// Empty</p>
              <p>No posts published yet. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      <CtaSection />
    </>
  )
}
