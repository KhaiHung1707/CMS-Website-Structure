import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { seoField } from '../fields/seo'
import { extraBlocks } from '../blocks'

/** Industries — Archive `/industries` (card) + Single `/industries/[slug]`. */
export const Industries: CollectionConfig = {
  slug: 'industries',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['number', 'title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Card',
          fields: [
            { name: 'number', type: 'text', admin: { description: 'e.g. 01' } },
            { name: 'title', type: 'text', required: true },
            { name: 'lead', type: 'textarea', required: true },
            {
              name: 'tags',
              type: 'array',
              labels: { singular: 'Tag', plural: 'Tags' },
              fields: [{ name: 'label', type: 'text', required: true }],
            },
            { name: 'stat_value', type: 'text' },
            { name: 'stat_label', type: 'text' },
            { name: 'hero_image', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Single',
          fields: [
            { name: 'eyebrow', type: 'text' },
            {
              name: 'stats',
              type: 'array',
              labels: { singular: 'Stat', plural: 'Stats' },
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'unit', type: 'text' },
                { name: 'label', type: 'text', required: true },
              ],
            },
            {
              name: 'faqs',
              type: 'array',
              labels: { singular: 'FAQ', plural: 'FAQs' },
              fields: [
                { name: 'q', type: 'text', required: true },
                { name: 'a', type: 'textarea', required: true },
              ],
            },
            {
              name: 'related',
              type: 'relationship',
              relationTo: 'industries',
              hasMany: true,
              admin: { description: 'Related industries shown at the foot of the page.' },
            },
            { name: 'extra_blocks', type: 'blocks', blocks: extraBlocks },
          ],
        },
      ],
    },
    slugField(),
    seoField,
  ],
}
