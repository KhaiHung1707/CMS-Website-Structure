import { getPayloadClient } from '../payload/getPayload'
import type { SiteSettings } from './types'

/** Global site settings (nav, footer, social). Cached per request by Payload. */
export async function getSiteSettings(): Promise<SiteSettings> {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site_settings', depth: 1 })
  return settings as unknown as SiteSettings
}
