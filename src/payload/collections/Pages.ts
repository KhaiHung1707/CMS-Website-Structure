import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { seoField } from '../fields/seo'
import { pageBlocks } from '../blocks'

/**
 * Core + Legal pages — fully block-driven (`layout`).
 * Home/About/Contact/Privacy/Terms/Cookies. Routed by slug.
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'layout', type: 'blocks', blocks: pageBlocks },
    slugField(),
    seoField,
  ],
}
