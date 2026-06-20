import type { Field } from 'payload'

/**
 * Reusable field builders — keep array/stat/heading shapes identical across collections
 * so the generated DB schema and payload-types stay consistent (and DRY).
 */

/** Array of `{ label }` — tags, features, checklist items, do/don't lists. */
export function tagsField(
  name: string,
  opts: { singular?: string; plural?: string; description?: string } = {},
): Field {
  return {
    name,
    type: 'array',
    labels: { singular: opts.singular ?? 'Tag', plural: opts.plural ?? 'Tags' },
    ...(opts.description ? { admin: { description: opts.description } } : {}),
    fields: [{ name: 'label', type: 'text', required: true }],
  }
}

/**
 * Array of `{ value, <secondary?>, label }` — stat strips.
 * `secondaryKey` is `suffix` (archive: small superscript) or `unit` (single pages).
 */
export function statsField(
  name: string,
  opts: {
    secondaryKey?: 'suffix' | 'unit'
    secondaryDescription?: string
    singular?: string
    plural?: string
    description?: string
  } = {},
): Field {
  const secondary = opts.secondaryKey ?? 'suffix'
  return {
    name,
    type: 'array',
    labels: { singular: opts.singular ?? 'Stat', plural: opts.plural ?? 'Stats' },
    ...(opts.description ? { admin: { description: opts.description } } : {}),
    fields: [
      { name: 'value', type: 'text', required: true },
      {
        name: secondary,
        type: 'text',
        ...(opts.secondaryDescription
          ? { admin: { description: opts.secondaryDescription } }
          : {}),
      },
      { name: 'label', type: 'text', required: true },
    ],
  }
}

/**
 * Single-line heading with an inline accent span. Editors wrap the accent part in
 * *asterisks* — rendered to `<span class="accent">…</span>` by renderAccentHeading().
 */
export function accentHeadingField(
  name: string,
  opts: { label?: string; description?: string; required?: boolean } = {},
): Field {
  return {
    name,
    type: 'text',
    ...(opts.label ? { label: opts.label } : {}),
    ...(opts.required ? { required: true } : {}),
    admin: {
      description:
        opts.description ??
        'Wrap the accent-coloured part in *asterisks*, e.g. “SEO that drives *revenue,* not just rankings.”',
    },
  }
}
