import { Fragment, type ReactNode } from 'react'

/**
 * Render a heading string where the accent part is wrapped in *asterisks*:
 *   "SEO that drives *revenue,* not just rankings."
 *     → SEO that drives <span class="accent">revenue,</span> not just rankings.
 * Strings without markers render unchanged. Returns null for empty input so callers
 * can do `renderAccentHeading(x) ?? fallback`.
 */
export function renderAccentHeading(input?: string | null): ReactNode {
  if (!input) return null
  const parts = input.split(/\*([^*]+)\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span className="accent" key={i}>
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}
