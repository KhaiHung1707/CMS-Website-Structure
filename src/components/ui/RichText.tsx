import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { Richtext } from '@/lib/content/types'

/**
 * Renders Payload Lexical rich text. Returns null when empty so callers stay clean.
 * Wraps in a `.rt` container — style prose via DS classes, never inline.
 */
export function RichText({ data, className }: { data: Richtext | null | undefined; className?: string }) {
  if (!data) return null
  return (
    <div className={className ?? 'rt'}>
      <LexicalRichText data={data as SerializedEditorState} />
    </div>
  )
}
