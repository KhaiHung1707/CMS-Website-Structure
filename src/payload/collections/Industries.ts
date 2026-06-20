import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { seoField } from '../fields/seo'
import { extraBlocks } from '../blocks'
import { tagsField, statsField } from '../fields/factories'

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
            tagsField('tags'),
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
              name: 'story',
              type: 'group',
              admin: { description: 'Scrolly case-study section. Hidden if it has no steps.' },
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'title', type: 'text' },
                { name: 'lead', type: 'textarea' },
                {
                  name: 'steps',
                  type: 'array',
                  labels: { singular: 'Step', plural: 'Steps' },
                  fields: [
                    { name: 'num', type: 'text', required: true, admin: { description: 'e.g. 01' } },
                    { name: 'cap', type: 'text', required: true },
                    { name: 'title', type: 'text', required: true },
                    { name: 'desc', type: 'textarea', required: true },
                    tagsField('tags'),
                  ],
                },
              ],
            },
            statsField('stats', { secondaryKey: 'unit' }),
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
