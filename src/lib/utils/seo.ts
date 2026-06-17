import type { Metadata } from 'next'
import type { SeoMeta } from '../content/types'
import { mediaUrl } from './format'

interface SeoInput {
  seo?: SeoMeta | null
  fallbackTitle: string
  fallbackDescription?: string | null
}

/** Build Next Metadata from a doc's optional `seo` group, falling back to title/summary. */
export function buildMetadata({ seo, fallbackTitle, fallbackDescription }: SeoInput): Metadata {
  const title = seo?.title || fallbackTitle
  const description = seo?.description || fallbackDescription || undefined
  const image = seo?.image && typeof seo.image !== 'string' ? mediaUrl(seo.image) : undefined

  return {
    title: `${title} — Structure`,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined,
    },
  }
}
