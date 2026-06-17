import type { Block } from 'payload'

/** Inline CTA band — maps to the shared .cta DS section. */
export const CtaBlock: Block = {
  slug: 'ctaBand',
  interfaceName: 'CtaBlock',
  labels: { singular: 'CTA band', plural: 'CTA bands' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'text', type: 'text' },
    {
      name: 'buttons',
      type: 'array',
      maxRows: 2,
      labels: { singular: 'Button', plural: 'Buttons' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'accent',
          options: [
            { label: 'Accent', value: 'accent' },
            { label: 'On dark', value: 'on-dark' },
          ],
        },
      ],
    },
  ],
}
