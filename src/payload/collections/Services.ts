import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { seoField } from '../fields/seo'
import { extraBlocks } from '../blocks'

/** Services — Archive `/services` (card) + Single `/services/[slug]`. */
export const Services: CollectionConfig = {
  slug: 'services',
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
            { name: 'number', type: 'text', admin: { description: '01–04' } },
            { name: 'title', type: 'text', required: true },
            { name: 'lead', type: 'textarea', required: true },
            {
              name: 'tags',
              type: 'array',
              labels: { singular: 'Tag', plural: 'Tags' },
              fields: [{ name: 'label', type: 'text', required: true }],
            },
            { name: 'metric_value', type: 'text' },
            { name: 'metric_label', type: 'text' },
            { name: 'hero_image', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Single',
          fields: [
            { name: 'icon', type: 'text', admin: { description: 'Glyph/emoji or icon key.' } },
            {
              name: 'features',
              type: 'array',
              labels: { singular: 'Feature', plural: 'Features' },
              fields: [{ name: 'label', type: 'text', required: true }],
            },
            {
              name: 'process',
              type: 'array',
              labels: { singular: 'Step', plural: 'Process steps' },
              fields: [
                { name: 'step', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'textarea', required: true },
              ],
            },
            { name: 'pricing', type: 'text' },
            {
              name: 'tech',
              type: 'array',
              labels: { singular: 'Tech', plural: 'Tech' },
              fields: [{ name: 'label', type: 'text', required: true }],
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
