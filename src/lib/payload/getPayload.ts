import { getPayload as getPayloadInstance } from 'payload'
import configPromise from '@payload-config'

/**
 * Cached Payload local-API client. ONLY imported inside the data layer (src/lib/content/*).
 * UI components must never import this — they receive typed props from pages.
 */
export async function getPayloadClient() {
  return getPayloadInstance({ config: configPromise })
}
