import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
// Storage adapter is enabled once a media host token exists — see plugins[] below.
// import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Industries } from './collections/Industries'
import { Services } from './collections/Services'
import { Projects } from './collections/Projects'
import { Posts } from './collections/Posts'
import { Pages } from './collections/Pages'
import { Testimonials } from './collections/Testimonials'
import { SiteSettings } from './globals/SiteSettings'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  editor: lexicalEditor(),
  // NOTE: `sharp` (image resizing) is intentionally not passed here — importing it pulled
  // `worker_threads` into the bundle and broke /admin in this environment. Uploads work at
  // original size. To enable resizing later: `import sharp from 'sharp'`, add `sharp,` here,
  // and ensure the runtime bundles native deps correctly (see Media.ts imageSizes).
  collections: [Users, Media, Industries, Services, Projects, Posts, Pages, Testimonials],
  globals: [SiteSettings],
  db: postgresAdapter({
    // Supabase Session pooler caps clients (default pool_size 15). Keep max well under it
    // so dev hot-reload + concurrent requests don't hit EMAXCONNSESSION.
    pool: { connectionString: process.env.DATABASE_URI, max: 8 },
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [
    /**
     * Media storage. Disabled until a host token is configured — until then Payload
     * stores uploads on the local filesystem (fine for dev). Component code reads
     * `media.url`, so enabling a host later needs ZERO collection/component changes.
     *
     * PHASE 1 → Vercel Blob: set BLOB_READ_WRITE_TOKEN in .env, uncomment the import
     * at the top + the block below, then run `npm run payload generate:importmap`.
     *   vercelBlobStorage({ collections: { media: true }, token: process.env.BLOB_READ_WRITE_TOKEN }),
     *
     * MIGRATION → Cloudflare R2 (S3-compatible): use `s3Storage({...})` from
     * `@payloadcms/storage-s3` with the R2_* env vars in .env.example instead.
     */
  ],
})
