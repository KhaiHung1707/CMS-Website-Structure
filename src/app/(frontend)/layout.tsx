import type { Metadata } from 'next'
import '@/styles/globals.css'
import { getSiteSettings, getServices } from '@/lib/content'
import { TopNav } from '@/components/layout/TopNav'
import type { MegaItemData } from '@/components/layout/MegaNav'
import { Footer } from '@/components/layout/Footer'

const FALLBACK_MEGA_ITEMS: MegaItemData[] = [
  { n: '01', name: 'Web Design', href: '/services/web-design', desc: 'High-fidelity interface design and interactive prototypes — a component system, not static mockups.' },
  { n: '02', name: 'Web Application', href: '/services/web-app', desc: 'Stateful web apps, typed end-to-end. Next.js, TypeScript, production-ready infrastructure.' },
  { n: '03', name: 'SEO & Core Web Vitals', href: '/services/seo', desc: 'Technical SEO and Core Web Vitals engineered in from the first commit — not bolted on later.' },
  { n: '04', name: 'SaaS Platform', href: '/services/saas', desc: 'Multi-tenant SaaS platforms: auth, billing, dashboards, and a design system that scales.' },
]

export const metadata: Metadata = {
  title: 'Structure — Web design & development studio',
  description:
    'A web design and development studio. Strategy, design, and engineering for teams who care how products are built.',
}

/**
 * Frontend root layout. Renders <html>/<body> (separate root layout from the
 * (payload) group). data-accent="brick" + body.strx match the design reference.
 * TopNav/Footer are shared on every route and read SiteSettings.
 */
export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  // Fetch independently and degrade gracefully: a failure in either call must not
  // white-screen every route. The real cause is logged with a greppable prefix so
  // it is visible in the `npm run dev` terminal (the browser only shows "null").
  const [settings, services] = await Promise.all([
    getSiteSettings().catch((err) => {
      console.error('[FrontendLayout] getSiteSettings failed:', err)
      return {} as Awaited<ReturnType<typeof getSiteSettings>>
    }),
    getServices().catch((err) => {
      console.error('[FrontendLayout] getServices failed:', err)
      return [] as Awaited<ReturnType<typeof getServices>>
    }),
  ])

  const megaItems: MegaItemData[] = services.length
    ? services.map((s) => ({
        n: s.number ?? '',
        name: s.title,
        desc: s.lead,
        href: `/services/${s.slug}`,
      }))
    : FALLBACK_MEGA_ITEMS

  return (
    <html lang="en" data-accent="brick">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Doto:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="strx">
        <TopNav settings={settings} megaItems={megaItems} />
        {children}
        <Footer settings={settings} />
      </body>
    </html>
  )
}
