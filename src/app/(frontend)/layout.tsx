import type { Metadata } from 'next'
import '@/styles/globals.css'
import { getSiteSettings } from '@/lib/content'
import { TopNav } from '@/components/layout/TopNav'
import { Footer } from '@/components/layout/Footer'

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
  const settings = await getSiteSettings()

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
        <TopNav settings={settings} />
        {children}
        <Footer settings={settings} />
      </body>
    </html>
  )
}
