import type { CollectionConfig } from 'payload'

/**
 * Uploads. File storage is delegated to the storage adapter in payload.config.ts
 * (Vercel Blob now → Cloudflare R2 later). Components read `media.url` — never a
 * hardcoded host — so swapping storage requires zero component changes.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  admin: { useAsTitle: 'alt' },
  upload: {
    imageSizes: [
      { name: 'card', width: 768, height: undefined, position: 'centre' },
      { name: 'hero', width: 1600, height: undefined, position: 'centre' },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Alt text for accessibility + SEO.' },
    },
  ],
}
