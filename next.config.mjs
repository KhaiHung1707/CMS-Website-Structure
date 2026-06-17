import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
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
