import type { AnyBlock } from '@/lib/content/types'
import { RichTextBlockView } from './RichTextBlockView'
import { StatsBlockView } from './StatsBlockView'
import { GalleryBlockView } from './GalleryBlockView'
import { MediaTextBlockView } from './MediaTextBlockView'
import { CtaBlockView } from './CtaBlockView'

/**
 * Renders a list of flexible blocks (extra_blocks / pages.layout).
 * `blockType` discriminates which view to render. Unknown types are skipped.
 */
export function BlockRenderer({ blocks }: { blocks?: AnyBlock[] | null }) {
  if (!blocks || blocks.length === 0) return null
  return (
    <>
      {blocks.map((block, i) => {
        const key = `${block.blockType}-${i}`
        switch (block.blockType) {
          case 'richText':
            return <RichTextBlockView key={key} block={block} />
          case 'stats':
            return <StatsBlockView key={key} block={block} />
          case 'gallery':
            return <GalleryBlockView key={key} block={block} />
          case 'mediaText':
            return <MediaTextBlockView key={key} block={block} />
          case 'ctaBand':
            return <CtaBlockView key={key} block={block} />
          default:
            return null
        }
      })}
    </>
  )
}
