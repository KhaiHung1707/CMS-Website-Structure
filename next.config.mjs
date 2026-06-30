import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { withPayload } from '@payloadcms/next/withPayload'

const projectRoot = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this project. Without it, Next walks up and picks
  // a stray ~/package-lock.json as the root, which breaks module file-tracing
  // and corrupts the webpack cache ("Unable to snapshot resolve dependencies").
  outputFileTracingRoot: projectRoot,
  // Payload + Next 15 (App Router). Image domains added as media host is wired.
  images: {
    remotePatterns: [
      // Vercel Blob (Phase 1 host). R2 pattern added when storage swaps — see payload.config.ts.
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
}

export default withPayload(nextConfig)
