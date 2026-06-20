import { getPayloadClient } from '../payload/getPayload'
import type { ArchiveContent, Page } from './types'

/**
 * Editable copy for an archive route. `slug` is the archive page record
 * (`work` / `industries` / `services`). depth:2 resolves the featured project
 * relationship. Returns null when no record exists yet (routes fall back).
 */
export async function getArchive(slug: string): Promise<ArchiveContent | null> {
  const page = await getPageBySlug(slug)
  return page?.archive ?? null
}

/** Core/Legal page by slug (home = "home"). */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return (res.docs[0] as unknown as Page) ?? null
}

export async function getPageSlugs(): Promise<string[]> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'pages',
    limit: 1000,
    depth: 0,
    select: { slug: true },
  })
  return res.docs.map((d) => (d as unknown as Page).slug).filter(Boolean)
}
