import { getPageBySlug } from '@/lib/content'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'

/**
 * Shared legal page shell. Renders a `pages` doc (block layout) when one exists for
 * the slug, else a minimal DS-true placeholder. Legal pages are simple blocks (no CPT).
 * TODO(design): swap placeholder for the exported legal layout when available.
 */
export async function LegalPage({ slug, title }: { slug: string; title: string }) {
  const page = await getPageBySlug(slug)

  return (
    <>
      <header className="page-hero">
        <div className="strx-container inner">
          <Eyebrow>// Legal</Eyebrow>
          <h1>{page?.title ?? title}</h1>
        </div>
      </header>

      {page?.layout && page.layout.length > 0 ? (
        <BlockRenderer blocks={page.layout} />
      ) : (
        <section className="sec">
          <div className="strx-container">
            <div className="rt" style={{ maxWidth: 720 }}>
              <p className="t-soft">
                This page has no content yet. Add a “{title}” entry in the Pages collection
                (slug: <code>{slug}</code>) to populate it.
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
