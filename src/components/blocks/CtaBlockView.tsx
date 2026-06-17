import type { AnyBlock } from '@/lib/content/types'
import { CtaSection } from '@/components/layout/CtaSection'

interface CtaButton {
  label: string
  href: string
  variant?: string
}

/** ctaBand block → shared <CtaSection>, mapping the first two buttons. */
export function CtaBlockView({ block }: { block: AnyBlock }) {
  const heading = (block.heading as string | undefined) ?? ''
  const eyebrow = block.eyebrow as string | undefined
  const text = block.text as string | undefined
  const buttons = (block.buttons as CtaButton[] | undefined) ?? []

  return (
    <CtaSection
      eyebrow={eyebrow}
      heading={heading}
      text={text}
      primary={buttons[0] ? { label: buttons[0].label, href: buttons[0].href } : undefined}
      secondary={buttons[1] ? { label: buttons[1].label, href: buttons[1].href } : undefined}
    />
  )
}
