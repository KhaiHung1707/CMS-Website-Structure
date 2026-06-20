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

/** Scrolly walkthrough step (Service.scrolly, Industry.story.steps). */
export interface StoryStep {
  num: string
  cap: string
  title: string
  desc: string
  tags?: TagItem[] | null
}

export interface FaqItem {
  q: string
  a: string
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
  challenge_title?: string | null
  challenge?: Richtext | null
  approach_title?: string | null
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
  story?: {
    eyebrow?: string | null
    title?: string | null
    lead?: string | null
    steps?: StoryStep[] | null
  } | null
  stats?: StatItem[] | null
  faqs?: FaqItem[] | null
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
  headings?: {
    hero?: string | null
    story_eyebrow?: string | null
    story_heading?: string | null
    story_lead?: string | null
    capabilities_eyebrow?: string | null
    capabilities_heading?: string | null
    process_eyebrow?: string | null
    process_heading?: string | null
    process_lead?: string | null
    faq_eyebrow?: string | null
    faq_heading?: string | null
  } | null
  icon?: string | null
  manifesto?: string | null
  hero_metrics?: { value: string; label: string }[] | null
  scrolly?: StoryStep[] | null
  features?: TagItem[] | null
  capabilities?: { label: string; desc: string }[] | null
  process?: { step: string; title: string; desc: string }[] | null
  results?: StatItem[] | null
  faqs?: FaqItem[] | null
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

export interface ArchiveStat {
  value: string
  suffix?: string | null
  label: string
}

/** Editable copy for the archive routes (pages with slug work/industries/services). */
export interface ArchiveContent {
  hero_eyebrow?: string | null
  hero_heading?: string | null
  hero_heading_accent?: string | null
  hero_lead?: string | null
  hero_stats?: ArchiveStat[] | null
  manifesto?: string | null
  featured?: {
    project?: Project | string | null
    eyebrow?: string | null
    heading?: string | null
    heading_accent?: string | null
    desc?: string | null
    stats?: ArchiveStat[] | null
  } | null
  results_eyebrow?: string | null
  results_heading?: string | null
  results_heading_accent?: string | null
  results_lead?: string | null
  results_stats?: ArchiveStat[] | null
  roadmap?: { week: string; title: string; desc: string; future?: boolean | null }[] | null
  engagement?:
    | {
        tag: string
        title: string
        price: string
        price_unit?: string | null
        desc: string
        featured?: boolean | null
        cta_label?: string | null
        cta_href?: string | null
        items?: TagItem[] | null
      }[]
    | null
  matrix?: { do?: TagItem[] | null; dont?: TagItem[] | null } | null
}

export interface Page {
  id: string
  slug: string
  title: string
  layout?: AnyBlock[] | null
  archive?: ArchiveContent | null
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

export interface ContactChannel {
  platform: string
  handle: string
  href: string
}

export interface MegaContent {
  eyebrow?: string | null
  heading?: string | null
  blurb?: string | null
  ctaLabel?: string | null
  promo?: {
    eyebrow?: string | null
    title?: string | null
    linkLabel?: string | null
    linkHref?: string | null
  } | null
}

export interface SiteSettings {
  brandWord?: string | null
  logo?: MediaDoc | string | null
  nav?: NavLink[] | null
  mega?: MegaContent | null
  footerColumns?: { heading: string; links?: NavLink[] | null }[] | null
  footerTagline?: string | null
  footerBottom?: { left?: string | null; right?: string | null } | null
  social?: { platform: string; href: string }[] | null
  contact?: { email?: string | null; channels?: ContactChannel[] | null } | null
}
