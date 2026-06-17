import type { Metadata } from 'next'
import Link from 'next/link'
import { Eyebrow } from '@/components/ui/Eyebrow'

export const metadata: Metadata = { title: 'Thank you — Structure' }

/**
 * Post-submit confirmation. Minimal DS-true page (no design HTML shipped).
 * TODO(design): replace when Claude Design exports thank-you.
 */
export default function ThankYouPage() {
  return (
    <header className="page-hero" style={{ paddingBottom: 'var(--space-11)' }}>
      <div className="strx-container inner">
        <Eyebrow>// Received</Eyebrow>
        <h1>
          Thank you. <span className="accent">We&apos;ll be in touch.</span>
        </h1>
        <p className="lead">
          Your message is on its way to the team. Expect a reply within one business day.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
          <Link href="/work" className="btn btn-dark">
            View our work →
          </Link>
          <Link href="/" className="btn btn-soft">
            Back home
          </Link>
        </div>
      </div>
    </header>
  )
}
