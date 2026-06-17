import type { Block } from 'payload'

/** Numeric stat strip — maps to the .stat-strip / .hero-stats DS pattern. */
export const StatsBlock: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  labels: { singular: 'Stats strip', plural: 'Stats strips' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Stat', plural: 'Stats' },
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'unit', type: 'text', admin: { description: 'Small suffix, e.g. %, /100, s.' } },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}
