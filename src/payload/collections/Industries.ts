import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { seoField } from '../fields/seo'
import { extraBlocks } from '../blocks'
import { tagsField, statsField, accentHeadingField } from '../fields/factories'

/** The three module classifications used across the capability library. */
const MODULE_TAG_OPTIONS = [
  { label: 'Connects (you already have it)', value: 'core' },
  { label: 'We set up', value: 'set' },
  { label: 'Your edge (wins the work)', value: 'edge' },
]

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
            { name: 'eyebrow', type: 'text', admin: { description: 'Hero eyebrow, e.g. // For 2–30 person law firms' } },
            accentHeadingField('hero_heading', {
              label: 'Hero heading',
              description: 'Big H1. Wrap the accent in *asterisks*. Falls back to the title.',
            }),
            { name: 'hero_lead', type: 'textarea', admin: { description: 'Long hero paragraph. Falls back to the card lead.' } },
            {
              name: 'hero_metrics',
              type: 'array',
              labels: { singular: 'Hero metric', plural: 'Hero metrics' },
              admin: { description: 'Hero stat row (the count-up figures). Hidden if empty.' },
              fields: [
                { name: 'value', type: 'text', required: true, admin: { description: 'e.g. 9, 0, or 1' } },
                { name: 'label', type: 'text', required: true },
              ],
            },
            accentHeadingField('manifesto', {
              label: 'Manifesto',
              description: 'Big statement under the hero. Wrap accent part in *asterisks*. Hidden if empty.',
            }),
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
            {
              name: 'library',
              type: 'group',
              admin: { description: 'Capability "full library" section. Hidden if it has no groups.' },
              fields: [
                { name: 'eyebrow', type: 'text', admin: { description: 'e.g. // The full library' } },
                accentHeadingField('heading', { label: 'Heading' }),
                { name: 'lead', type: 'textarea' },
                {
                  name: 'legend',
                  type: 'array',
                  labels: { singular: 'Legend item', plural: 'Legend' },
                  admin: { description: 'Explains each tag colour (Connects / We set up / Your edge).' },
                  fields: [
                    { name: 'tag', type: 'select', required: true, options: MODULE_TAG_OPTIONS },
                    { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "to software you already have"' } },
                  ],
                },
                {
                  name: 'groups',
                  type: 'array',
                  labels: { singular: 'Module group', plural: 'Module groups' },
                  fields: [
                    { name: 'num', type: 'text', required: true, admin: { description: 'e.g. // 01' } },
                    { name: 'title', type: 'text', required: true },
                    { name: 'subtitle', type: 'text', admin: { description: 'Right-aligned caption, e.g. "front of the funnel"' } },
                    {
                      name: 'modules',
                      type: 'array',
                      labels: { singular: 'Module', plural: 'Modules' },
                      fields: [
                        { name: 'title', type: 'text', required: true },
                        { name: 'tag', type: 'select', required: true, options: MODULE_TAG_OPTIONS },
                        { name: 'desc', type: 'text', required: true },
                      ],
                    },
                  ],
                },
                { name: 'packs_num', type: 'text', admin: { description: 'e.g. // 07' } },
                { name: 'packs_title', type: 'text' },
                { name: 'packs_lead', type: 'textarea' },
                {
                  name: 'packs',
                  type: 'array',
                  labels: { singular: 'Pack', plural: 'Packs' },
                  admin: { description: 'Practice-area chips. Hidden if empty.' },
                  fields: [
                    { name: 'name', type: 'text', required: true },
                    { name: 'sub', type: 'text', admin: { description: 'Mono caption, e.g. "IRCC / USCIS"' } },
                  ],
                },
                {
                  name: 'callout',
                  type: 'group',
                  admin: { description: 'Dashed "keepbar" callout under the library. Hidden if no title.' },
                  fields: [
                    { name: 'icon', type: 'text', admin: { description: 'Emoji, e.g. 🗂️' } },
                    { name: 'title', type: 'text' },
                    { name: 'text', type: 'textarea' },
                  ],
                },
              ],
            },
            {
              name: 'process',
              type: 'array',
              labels: { singular: 'Process step', plural: 'Process steps' },
              admin: { description: 'Process timeline. Hidden if empty.' },
              fields: [
                { name: 'step', type: 'text', required: true, admin: { description: 'e.g. Week 1 / Ongoing' } },
                { name: 'title', type: 'text', required: true },
                { name: 'desc', type: 'textarea', required: true },
                { name: 'future', type: 'checkbox', defaultValue: false, admin: { description: 'Dims the step (upcoming phase).' } },
              ],
            },
            statsField('stats', { secondaryKey: 'unit' }),
            accentHeadingField('faq_heading', {
              label: 'FAQ heading',
              description: 'Heading of the FAQ aside. Wrap accent in *asterisks*. Falls back to "<Title> questions."',
            }),
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
            {
              name: 'cta',
              type: 'group',
              admin: { description: 'Closing CTA band. Falls back to a generic CTA when the heading is blank.' },
              fields: [
                { name: 'eyebrow', type: 'text', admin: { description: 'e.g. // Get started' } },
                accentHeadingField('heading', { label: 'CTA heading' }),
                { name: 'text', type: 'textarea' },
                { name: 'primary_label', type: 'text' },
                { name: 'primary_href', type: 'text', admin: { description: 'e.g. mailto:hello@structure.studio or /contact' } },
                { name: 'secondary_label', type: 'text' },
                { name: 'secondary_href', type: 'text' },
              ],
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
