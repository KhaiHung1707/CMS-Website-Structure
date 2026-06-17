import type { Block } from 'payload'

/** Free-form prose section. Renders via <RichText> with DS prose classes. */
export const RichTextBlock: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlock',
  labels: { singular: 'Rich text', plural: 'Rich text' },
  fields: [
    { name: 'eyebrow', type: 'text', admin: { description: 'Optional // mono label.' } },
    { name: 'heading', type: 'text' },
    { name: 'body', type: 'richText', required: true },
  ],
}
