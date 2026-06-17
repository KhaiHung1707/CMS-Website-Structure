import type { Metadata } from 'next'
import './home.css'
import { getProjects } from '@/lib/content'
import { CtaSection } from '@/components/layout/CtaSection'
import { HomeHero } from '@/components/sections/HomeHero'
import { HomeMarquee } from '@/components/sections/HomeMarquee'
import { HomeServices } from '@/components/sections/HomeServices'
import { HomeIndustries } from '@/components/sections/HomeIndustries'
import { HomeWork } from '@/components/sections/HomeWork'
import { HomeProcess } from '@/components/sections/HomeProcess'
import { HomeSolutions } from '@/components/sections/HomeSolutions'
import { HomeTestimonials } from '@/components/sections/HomeTestimonials'
import { HomeFaq } from '@/components/sections/HomeFaq'

export const metadata: Metadata = {
  title: 'Structure — Web design & development studio',
  description:
    'A design and engineering studio for e-commerce, SaaS, and brands who care how products are built. Strategy, design, and code — in one team.',
}

/**
 * Home — composed from section components (templates/Structure Homepage.html).
 * Nav, mega menu, and footer are rendered by the shared layout; the closing CTA
 * uses the shared <CtaSection/>. Featured work is bound to real Project data.
 */
export default async function HomePage() {
  const projects = await getProjects()

  return (
    <div className="home">
      <HomeHero />
      <HomeMarquee />
      <HomeServices />
      <HomeIndustries />
      <HomeWork projects={projects} />
      <HomeProcess />
      <HomeSolutions />
      <HomeTestimonials />
      <HomeFaq />
      {/* TODO(design): the template adds a .cta-availability pill above the heading; CtaSection has no slot for it yet. */}
      <CtaSection
        eyebrow="// Get started"
        heading={
          <>
            Let&apos;s build something
            <br />
            <span className="accent">worth building.</span>
          </>
        }
        text="Tell us what you're working on. A 30-minute call to see if we're a fit — no decks, no sales pitch."
        primary={{ label: 'Start a project →', href: '/contact' }}
        secondary={{ label: 'hello@structure.studio', href: 'mailto:hello@structure.studio' }}
      />
    </div>
  )
}
