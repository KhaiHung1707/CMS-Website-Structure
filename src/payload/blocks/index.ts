import type { Block } from 'payload'
import { RichTextBlock } from './RichTextBlock'
import { StatsBlock } from './StatsBlock'
import { GalleryBlock } from './GalleryBlock'
import { MediaTextBlock } from './MediaTextBlock'
import { CtaBlock } from './CtaBlock'

/** Optional sections appended to Single docs (Industry/Service/Portfolio). */
export const extraBlocks: Block[] = [RichTextBlock, StatsBlock, GalleryBlock, MediaTextBlock, CtaBlock]

/** Full block palette for Core pages (`pages.layout`). */
export const pageBlocks: Block[] = [RichTextBlock, StatsBlock, GalleryBlock, MediaTextBlock, CtaBlock]

export { RichTextBlock, StatsBlock, GalleryBlock, MediaTextBlock, CtaBlock }
