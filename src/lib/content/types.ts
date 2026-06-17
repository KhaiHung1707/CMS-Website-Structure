/**
 * Domain types consumed by UI components.
 *
 * These are hand-authored (not overwritten by `payload generate:types`) so the UI
 * has a stable contract. The data layer (src/lib/content/*) fetches via Payload and
 * returns values shaped as these types. If a collection field changes, update here.
 */

export interface MediaDoc {
  id: string
  url?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
}

export type Richtext = unknown // Lexical JSON — rendered by <RichText>

export interface SeoMeta {
  title?: string | null
  description?: string | null
  image?: MediaDoc | string | null
}

export interface StatItem {
  value: string
  unit?: string | null
  label: string
}

export interface GalleryItem {
  image: MediaDoc | string
  caption?: string | null
}

export interface TagItem {
  label: string
}

/** Optional flexible sections (extra_blocks / pages.layout). `blockType` discriminates. */
export interface AnyBlock {
  blockType: string
  [key: string]: unknown
}

export interface Project {
  id: string
  slug: string
  title: string
  meta?: string | null
  industry?: Industry | string | null
  featured?: boolean | null
  hero_stat?: string | null
  cover?: MediaDoc | string | null
  // single
  summary?: string | null
  client?: string | null
  duration?: string | null
  services?: (Service | string)[] | null
  live_url?: string | null
  challenge?: Richtext | null
  approach?: Richtext | null
  stats?: StatItem[] | null
  gallery?: GalleryItem[] | null
  related?: (Project | string)[] | null
  extra_blocks?: AnyBlock[] | null
  seo?: SeoMeta | null
}

export interface Industry {
  id: string
  slug: string
  number?: string | null
  title: string
  lead: string
  tags?: TagItem[] | null
  stat_value?: string | null
  stat_label?: string | null
  hero_image?: MediaDoc | string | null
  // single
  eyebrow?: string | null
  stats?: StatItem[] | null
  faqs?: { q: string; a: string }[] | null
  related?: (Industry | string)[] | null
  extra_blocks?: AnyBlock[] | null
  seo?: SeoMeta | null
}

export interface Service {
  id: string
  slug: string
  number?: string | null
  title: string
  lead: string
  tags?: TagItem[] | null
  metric_value?: string | null
  metric_label?: string | null
  hero_image?: MediaDoc | string | null
  // single
  icon?: string | null
  features?: TagItem[] | null
  process?: { step: string; title: string; desc: string }[] | null
  pricing?: string | null
  tech?: TagItem[] | null
  extra_blocks?: AnyBlock[] | null
  seo?: SeoMeta | null
}

export interface Post {
  id: string
  slug: string
  title: string
  excerpt?: string | null
  category?: string | null
  cover?: MediaDoc | string | null
  published_at?: string | null
  // single
  body?: Richtext | null
  author?: { id: string; name: string; bio?: string | null; avatar?: MediaDoc | string | null } | string | null
  related_posts?: (Post | string)[] | null
  extra_blocks?: AnyBlock[] | null
  seo?: SeoMeta | null
}

export interface Page {
  id: string
  slug: string
  title: string
  layout?: AnyBlock[] | null
  seo?: SeoMeta | null
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role?: string | null
  company?: string | null
  avatar?: MediaDoc | string | null
}

export interface NavLink {
  label: string
  href: string
}

export interface SiteSettings {
  brandWord?: string | null
  logo?: MediaDoc | string | null
  nav?: NavLink[] | null
  footerColumns?: { heading: string; links?: NavLink[] | null }[] | null
  footerTagline?: string | null
  social?: { platform: string; href: string }[] | null
}
