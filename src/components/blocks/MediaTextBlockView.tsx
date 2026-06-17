import type { AnyBlock } from '@/lib/content/types'
import { mediaUrl, mediaAlt } from '@/lib/utils/format'
import { RichText } from '@/components/ui/RichText'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { cn } from '@/lib/utils/cn'

/** mediaText block → image + prose split row. */
export function MediaTextBlockView({ block }: { block: AnyBlock }) {
  const eyebrow = block.eyebrow as string | undefined
  const heading = block.heading as string | undefined
  const imageSide = (block.imageSide as string | undefined) === 'left' ? 'left' : 'right'
  const url = mediaUrl(block.image as never)

  return (
    <section className="sec">
      <div className="strx-container">
        <div className={cn('media-text', `media-${imageSide}`)}>
          <div className="media-text-body">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            {heading ? <h2 className="t-h2">{heading}</h2> : null}
            <RichText data={block.body as unknown} />
          </div>
          {url ? (
            <div className="media-text-media">
              <img src={url} alt={mediaAlt(block.image as never, heading ?? '')} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
