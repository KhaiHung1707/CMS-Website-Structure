import type { Field } from 'payload'

/**
 * Reusable SEO group. Consumed by lib/utils/seo.ts to build Next `generateMetadata`.
 * Falls back to the document title/summary at render time when fields are blank.
 */
export const seoField: Field = {
  name: 'seo',
  type: 'group',
  admin: {
    description: 'Optional overrides for search/social. Falls back to page title + summary.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: { description: 'Meta title override (≤ ~60 chars).' },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Meta description override (≤ ~160 chars).' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Open Graph / social share image.' },
    },
  ],
}
