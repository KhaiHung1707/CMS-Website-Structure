'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import { mediaUrl } from '@/lib/utils/format'
import type { NavLink, SiteSettings } from '@/lib/content/types'
import { MegaNav, type MegaItemData } from './MegaNav'
import { BrandLogo } from './BrandLogo'

const DEFAULT_NAV: NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Industries', href: '/industries' },
]

/**
 * Top navigation. Markup/classes ported 1:1 from templates/*.html (nav.top).
 * Client component: scroll shadow + Services mega-menu (React state, no DOM listeners).
 * Nav links come from SiteSettings, falling back to the design defaults.
 */
export function TopNav({
  settings,
  megaItems,
}: {
  settings: SiteSettings
  megaItems: MegaItemData[]
}) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = settings.nav && settings.nav.length > 0 ? settings.nav : DEFAULT_NAV
  const brand = settings.brandWord || 'Structure'
  // Prefer a CMS-uploaded logo; otherwise the dark lockup at /public/logo-dark.svg.
  // BrandLogo falls back to the text wordmark if neither file is present.
  const navLogo = mediaUrl(settings.logo) || '/logo-dark.svg'

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }
  const closeMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150)
  }

  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav className={cn('top', scrolled && 'scrolled')} id="topnav">
      <div className="strx-container inner">
        <Link href="/" className="nav-brand">
          <BrandLogo src={navLogo} word={brand} className="nav-logo" />
        </Link>
        <ul className="nav-links">
          {navLinks.map((item) => {
            const isServices = item.href === '/services'
            return (
              <li
                key={item.href}
                className={cn(isServices && 'has-mega', isServices && megaOpen && 'open')}
                onMouseEnter={isServices ? openMega : undefined}
                onMouseLeave={isServices ? closeMega : undefined}
              >
                <Link
                  href={item.href}
                  className={cn(isCurrent(item.href) && 'cur', isServices && 'nav-mega-trigger')}
                  aria-haspopup={isServices ? 'true' : undefined}
                  aria-expanded={isServices ? megaOpen : undefined}
                  onFocus={isServices ? openMega : undefined}
                >
                  {item.label}
                  {isServices ? <span className="nav-caret"> ▾</span> : null}
                </Link>
              </li>
            )
          })}
        </ul>
        <Link href="/contact" className="btn btn-dark nav-cta">
          Contact →
        </Link>
      </div>
      <div onMouseEnter={openMega} onMouseLeave={closeMega}>
        <MegaNav open={megaOpen} mega={settings.mega} items={megaItems} />
      </div>
    </nav>
  )
}
