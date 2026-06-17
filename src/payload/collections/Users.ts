import type { CollectionConfig } from 'payload'

/** Admin + content authors (also the `author` relation target for posts). */
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
    },
    { name: 'bio', type: 'textarea', admin: { description: 'Short author bio for blog bylines.' } },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
  ],
}
