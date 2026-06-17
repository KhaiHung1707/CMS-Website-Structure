import type { GlobalConfig } from 'payload'

/** Site-wide settings: logo, nav links, social, footer copy. Read by TopNav/Footer. */
export const SiteSettings: GlobalConfig = {
  slug: 'site_settings',
  access: { read: () => true },
  fields: [
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'brandWord', type: 'text', defaultValue: 'Structure' },
    {
      name: 'nav',
      type: 'array',
      labels: { singular: 'Nav link', plural: 'Nav links' },
      admin: { description: 'Primary top-nav links.' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    {
      name: 'footerColumns',
      type: 'array',
      labels: { singular: 'Footer column', plural: 'Footer columns' },
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
    { name: 'footerTagline', type: 'text', defaultValue: 'A web design and development studio.' },
    {
      name: 'social',
      type: 'array',
      labels: { singular: 'Social link', plural: 'Social links' },
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
}
