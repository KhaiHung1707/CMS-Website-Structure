import { getPayloadClient } from '../payload/getPayload'
import type { Industry } from './types'

export async function getIndustries(): Promise<Industry[]> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'industries',
    limit: 100,
    sort: 'number',
    depth: 1,
  })
  return res.docs as unknown as Industry[]
}

export async function getIndustryBySlug(slug: string): Promise<Industry | null> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'industries',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return (res.docs[0] as unknown as Industry) ?? null
}

export async function getIndustrySlugs(): Promise<string[]> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'industries',
    limit: 1000,
    depth: 0,
    select: { slug: true },
  })
  return res.docs.map((d) => (d as unknown as Industry).slug).filter(Boolean)
}
