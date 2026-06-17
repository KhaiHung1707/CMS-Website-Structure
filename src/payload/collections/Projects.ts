import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { seoField } from '../fields/seo'
import { extraBlocks } from '../blocks'

/** Portfolio — Archive `/work` (card) + Single `/work/[slug]` (case study). */
export const Projects: CollectionConfig = {
  slug: 'projects',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'industry', 'featured', 'slug', 'updatedAt'],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Card',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'meta', type: 'text', admin: { description: 'e.g. E-commerce · 2026' } },
            { name: 'industry', type: 'relationship', relationTo: 'industries' },
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
              admin: { description: 'Adds the `feature` class (wide card).' },
            },
            { name: 'hero_stat', type: 'text', admin: { description: 'e.g. +212% mobile revenue' } },
            { name: 'cover', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Single',
          fields: [
            { name: 'summary', type: 'textarea' },
            { name: 'client', type: 'text' },
            { name: 'duration', type: 'text' },
            { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true },
            { name: 'live_url', type: 'text' },
            { name: 'challenge', type: 'richText' },
            { name: 'approach', type: 'richText' },
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
              name: 'gallery',
              type: 'array',
              labels: { singular: 'Shot', plural: 'Gallery' },
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'caption', type: 'text' },
              ],
            },
            { name: 'related', type: 'relationship', relationTo: 'projects', hasMany: true },
            { name: 'extra_blocks', type: 'blocks', blocks: extraBlocks },
          ],
        },
      ],
    },
    slugField(),
    seoField,
  ],
}
