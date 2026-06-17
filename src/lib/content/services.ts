import { getPayloadClient } from '../payload/getPayload'
import type { Service } from './types'

export async function getServices(): Promise<Service[]> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'services',
    limit: 100,
    sort: 'number',
    depth: 1,
  })
  return res.docs as unknown as Service[]
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return (res.docs[0] as unknown as Service) ?? null
}

export async function getServiceSlugs(): Promise<string[]> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'services',
    limit: 1000,
    depth: 0,
    select: { slug: true },
  })
  return res.docs.map((d) => (d as unknown as Service).slug).filter(Boolean)
}
