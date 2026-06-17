import type { AnyBlock, GalleryItem } from '@/lib/content/types'
import { mediaUrl, mediaAlt } from '@/lib/utils/format'
import { Eyebrow } from '@/components/ui/Eyebrow'

/** gallery block → grid of captioned shots. */
export function GalleryBlockView({ block }: { block: AnyBlock }) {
  const eyebrow = block.eyebrow as string | undefined
  const items = (block.items as GalleryItem[] | undefined) ?? []
  if (items.length === 0) return null
  return (
    <section className="sec">
      <div className="strx-container">
        {eyebrow ? (
          <div className="sec-head">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
        ) : null}
        <div className="gallery-grid">
          {items.map((shot, i) => {
            const url = mediaUrl(shot.image)
            return (
              <figure className="cs-shot" key={`${i}-${shot.caption ?? ''}`}>
                {url ? <img src={url} alt={mediaAlt(shot.image, shot.caption ?? '')} /> : null}
                {shot.caption ? <figcaption className="cap">{shot.caption}</figcaption> : null}
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
