import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { seoField } from '../fields/seo'
import { extraBlocks } from '../blocks'

/** Blog — Archive `/blog` (card) + Single `/blog/[slug]`. */
export const Posts: CollectionConfig = {
  slug: 'posts',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'published_at', 'slug'],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Card',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'excerpt', type: 'textarea' },
            { name: 'category', type: 'text' },
            { name: 'cover', type: 'upload', relationTo: 'media' },
            {
              name: 'published_at',
              type: 'date',
              admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
            },
          ],
        },
        {
          label: 'Single',
          fields: [
            { name: 'body', type: 'richText' },
            { name: 'author', type: 'relationship', relationTo: 'users' },
            { name: 'related_posts', type: 'relationship', relationTo: 'posts', hasMany: true },
            { name: 'extra_blocks', type: 'blocks', blocks: extraBlocks },
          ],
        },
      ],
    },
    slugField(),
    seoField,
  ],
}
