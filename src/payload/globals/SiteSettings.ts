import type { GlobalConfig } from 'payload'

/** Site-wide settings: logo, nav, mega panel, footer, social, contact channels. */
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
      name: 'mega',
      type: 'group',
      label: 'Services mega menu',
      admin: {
        description:
          'Copy for the Services mega panel. The four service cards are pulled live from the Services collection.',
      },
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: '// Services' },
        { name: 'heading', type: 'text', defaultValue: 'Four capabilities, one team.' },
        { name: 'blurb', type: 'textarea' },
        { name: 'ctaLabel', type: 'text', defaultValue: 'View all services' },
        {
          name: 'promo',
          type: 'group',
          admin: { description: 'Featured promo card in the mega panel. Hidden if Title is empty.' },
          fields: [
            { name: 'eyebrow', type: 'text', defaultValue: '// Featured' },
            { name: 'title', type: 'text' },
            { name: 'linkLabel', type: 'text', defaultValue: 'Read case study →' },
            { name: 'linkHref', type: 'text', defaultValue: '/work' },
          ],
        },
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
      name: 'footerBottom',
      type: 'group',
      admin: { description: 'Bottom bar of the footer.' },
      fields: [
        { name: 'left', type: 'text', defaultValue: '© 2026 STRUCTURE STUDIO' },
        { name: 'right', type: 'text', defaultValue: 'WE BUILD THE WEB WITH STRUCTURE.' },
      ],
    },
    {
      name: 'social',
      type: 'array',
      labels: { singular: 'Social link', plural: 'Social links' },
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      admin: { description: 'Contact-page channels ("Other channels" block).' },
      fields: [
        { name: 'email', type: 'text', admin: { description: 'Used for the mailto: link.' } },
        {
          name: 'channels',
          type: 'array',
          labels: { singular: 'Channel', plural: 'Channels' },
          admin: { description: 'Email / Telegram / LinkedIn etc. Icons are assigned by position.' },
          fields: [
            { name: 'platform', type: 'text', required: true, admin: { description: 'e.g. Email, Telegram, LinkedIn' } },
            { name: 'handle', type: 'text', required: true, admin: { description: 'Displayed value, e.g. @structurestudio' } },
            { name: 'href', type: 'text', required: true, admin: { description: 'Full URL or mailto:' } },
          ],
        },
      ],
    },
  ],
}
