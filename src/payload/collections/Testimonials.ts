import type { CollectionConfig } from 'payload'

/** Client testimonials — surfaced on Home/About and Single pages. */
export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: { read: () => true },
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'company'],
  },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'author', type: 'text', required: true },
    { name: 'role', type: 'text' },
    { name: 'company', type: 'text' },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
  ],
}
