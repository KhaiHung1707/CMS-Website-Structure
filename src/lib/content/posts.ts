import { getPayloadClient } from '../payload/getPayload'
import type { Post } from './types'

export async function getPosts(): Promise<Post[]> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'posts',
    limit: 100,
    sort: '-published_at',
    depth: 1,
  })
  return res.docs as unknown as Post[]
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return (res.docs[0] as unknown as Post) ?? null
}

export async function getPostSlugs(): Promise<string[]> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'posts',
    limit: 1000,
    depth: 0,
    select: { slug: true },
  })
  return res.docs.map((d) => (d as unknown as Post).slug).filter(Boolean)
}
