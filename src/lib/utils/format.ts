import type { MediaDoc } from '../content/types'

/**
 * Resolve a media field (object or unresolved id/string) to a URL.
 * Returns '' when unresolved so callers can branch to the DS SVG placeholder.
 * Never hardcodes a storage host — uses whatever URL Payload returns.
 */
export function mediaUrl(media: MediaDoc | string | null | undefined): string {
  if (!media || typeof media === 'string') return ''
  return media.url ?? ''
}

/** Resolve alt text for a media field, with a safe fallback. */
export function mediaAlt(media: MediaDoc | string | null | undefined, fallback = ''): string {
  if (!media || typeof media === 'string') return fallback
  return media.alt ?? fallback
}

/** Format an ISO date to a readable label, e.g. "Jun 17, 2026". */
export function formatDate(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
