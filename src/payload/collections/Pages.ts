import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { seoField } from '../fields/seo'
import { pageBlocks } from '../blocks'
import { tagsField, statsField } from '../fields/factories'

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
    {
      name: 'archive',
      type: 'group',
      admin: {
        description:
          'Editable copy for the archive routes (records with slug work / industries / services). Ignored by Core/Legal pages.',
      },
      fields: [
        { name: 'hero_eyebrow', type: 'text' },
        { name: 'hero_heading', type: 'text' },
        { name: 'hero_heading_accent', type: 'text', admin: { description: 'Accent-coloured tail of the heading.' } },
        { name: 'hero_lead', type: 'textarea' },
        statsField('hero_stats', {
          singular: 'Hero stat',
          plural: 'Hero stats',
          secondaryDescription: 'Small superscript, e.g. + or /100 or s.',
        }),
        { name: 'manifesto', type: 'textarea', admin: { description: 'Industries archive manifesto. Hidden if empty.' } },
        {
          name: 'featured',
          type: 'group',
          admin: { description: 'Work archive featured case. Falls back to the first featured project.' },
          fields: [
            { name: 'project', type: 'relationship', relationTo: 'projects' },
            { name: 'eyebrow', type: 'text' },
            { name: 'heading', type: 'text' },
            { name: 'heading_accent', type: 'text' },
            { name: 'desc', type: 'textarea' },
            statsField('stats'),
          ],
        },
        { name: 'results_eyebrow', type: 'text' },
        { name: 'results_heading', type: 'text' },
        { name: 'results_heading_accent', type: 'text' },
        { name: 'results_lead', type: 'textarea' },
        statsField('results_stats', { singular: 'Result', plural: 'Results' }),
        {
          name: 'roadmap',
          type: 'array',
          labels: { singular: 'Roadmap step', plural: 'Roadmap' },
          admin: { description: 'Services archive timeline. Hidden if empty.' },
          fields: [
            { name: 'week', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'desc', type: 'textarea', required: true },
            { name: 'future', type: 'checkbox', defaultValue: false },
          ],
        },
        {
          name: 'engagement',
          type: 'array',
          labels: { singular: 'Engagement model', plural: 'Engagement models' },
          admin: { description: 'Services archive pricing models. Hidden if empty.' },
          fields: [
            { name: 'tag', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'price', type: 'text', required: true },
            { name: 'price_unit', type: 'text' },
            { name: 'desc', type: 'textarea', required: true },
            { name: 'featured', type: 'checkbox', defaultValue: false },
            { name: 'cta_label', type: 'text' },
            { name: 'cta_href', type: 'text' },
            tagsField('items', { singular: 'Item', plural: 'Items' }),
          ],
        },
        {
          name: 'matrix',
          type: 'group',
          admin: { description: 'Services archive "we do / we don\'t" matrix. Hidden if both empty.' },
          fields: [
            tagsField('do', { singular: 'We do', plural: 'We do' }),
            tagsField('dont', { singular: "We don't", plural: "We don't" }),
          ],
        },
      ],
    },
    slugField(),
    seoField,
  ],
}
