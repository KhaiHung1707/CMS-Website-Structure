import { getPayloadClient } from '../payload/getPayload'
import type { Project } from './types'

/** All projects for the `/work` archive (newest first). */
export async function getProjects(): Promise<Project[]> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'projects',
    limit: 100,
    sort: '-createdAt',
    depth: 1,
  })
  return res.docs as unknown as Project[]
}

/** Single project by slug, or null. depth:2 to resolve nested relations (services, related). */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return (res.docs[0] as unknown as Project) ?? null
}

/** Slugs for generateStaticParams. */
export async function getProjectSlugs(): Promise<string[]> {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'projects',
    limit: 1000,
    depth: 0,
    select: { slug: true },
  })
  return res.docs.map((d) => (d as unknown as Project).slug).filter(Boolean)
}
