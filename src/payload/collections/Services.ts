import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { seoField } from '../fields/seo'
import { tagsField, statsField, accentHeadingField } from '../fields/factories'
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
            tagsField('tags', { description: 'Shown as chips on the service card.' }),
            { name: 'metric_value', type: 'text', admin: { description: 'Headline figure, e.g. 99.9% or 0.9s.' } },
            { name: 'metric_label', type: 'text', admin: { description: 'Caption under the figure.' } },
            { name: 'hero_image', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Single',
          fields: [
            {
              name: 'headings',
              type: 'group',
              label: 'Section headings',
              admin: {
                description:
                  'Optional overrides for the single-page hero + section headings. Wrap the accent part in *asterisks*. Each falls back to a sensible default when blank.',
              },
              fields: [
                accentHeadingField('hero', {
                  label: 'Hero heading',
                  description: 'Big H1. Wrap the accent in *asterisks*. Falls back to the service title.',
                }),
                { name: 'story_eyebrow', type: 'text', admin: { description: 'e.g. // From idea to handoff' } },
                accentHeadingField('story_heading', { label: 'Walkthrough heading' }),
                { name: 'story_lead', type: 'textarea', admin: { description: 'Intro under the walkthrough heading.' } },
                { name: 'capabilities_eyebrow', type: 'text', admin: { description: 'e.g. // Capabilities' } },
                accentHeadingField('capabilities_heading', { label: 'Capabilities heading' }),
                { name: 'process_eyebrow', type: 'text', admin: { description: 'e.g. // Process' } },
                accentHeadingField('process_heading', { label: 'Process heading' }),
                { name: 'process_lead', type: 'textarea' },
                { name: 'faq_eyebrow', type: 'text', admin: { description: 'e.g. // FAQ' } },
                accentHeadingField('faq_heading', {
                  label: 'FAQ heading',
                  description: 'No accent needed. Falls back to “<Service> questions.”',
                }),
              ],
            },
            { name: 'icon', type: 'text', admin: { description: 'Glyph/emoji or icon key.' } },
            {
              name: 'manifesto',
              type: 'textarea',
              admin: { description: 'Big statement shown under the hero. Hidden if empty.' },
            },
            {
              name: 'hero_metrics',
              type: 'array',
              labels: { singular: 'Hero metric', plural: 'Hero metrics' },
              admin: { description: 'Stats in the hero. Falls back to the card metric if empty.' },
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
            },
            {
              name: 'scrolly',
              type: 'array',
              labels: { singular: 'Scrolly step', plural: 'Scrolly steps' },
              admin: { description: 'Walkthrough steps. Section hidden if empty.' },
              fields: [
                { name: 'num', type: 'text', required: true, admin: { description: 'e.g. 01' } },
                { name: 'cap', type: 'text', required: true, admin: { description: 'Short caption.' } },
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'textarea', required: true },
                tagsField('tags'),
              ],
            },
            tagsField('features', { singular: 'Feature', plural: 'Features' }),
            {
              name: 'capabilities',
              type: 'array',
              labels: { singular: 'Capability', plural: 'Capabilities' },
              admin: { description: 'Pillar cards (label + description). Section hidden if empty.' },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'desc', type: 'textarea', required: true },
              ],
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
            statsField('results', {
              secondaryKey: 'unit',
              singular: 'Result',
              plural: 'Results',
              description: 'Result stat strip. Section hidden if empty.',
            }),
            {
              name: 'faqs',
              type: 'array',
              labels: { singular: 'FAQ', plural: 'FAQs' },
              admin: { description: 'Section hidden if empty.' },
              fields: [
                { name: 'q', type: 'text', required: true },
                { name: 'a', type: 'textarea', required: true },
              ],
            },
            { name: 'pricing', type: 'text' },
            tagsField('tech', { singular: 'Tech', plural: 'Tech' }),
            { name: 'extra_blocks', type: 'blocks', blocks: extraBlocks },
          ],
        },
      ],
    },
    slugField(),
    seoField,
  ],
}
