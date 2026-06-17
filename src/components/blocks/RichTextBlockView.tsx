import type { AnyBlock } from '@/lib/content/types'
import { RichText } from '@/components/ui/RichText'
import { Eyebrow } from '@/components/ui/Eyebrow'

/** richText block → prose section using DS section scaffold. */
export function RichTextBlockView({ block }: { block: AnyBlock }) {
  const eyebrow = block.eyebrow as string | undefined
  const heading = block.heading as string | undefined
  return (
    <section className="sec">
      <div className="strx-container">
        {(eyebrow || heading) && (
          <div className="sec-head">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            {heading ? <h2>{heading}</h2> : null}
          </div>
        )}
        <RichText data={block.body as unknown} />
      </div>
    </section>
  )
}
