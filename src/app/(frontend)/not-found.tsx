import Link from 'next/link'
import { Eyebrow } from '@/components/ui/Eyebrow'

/** 404. Minimal DS-true page. TODO(design): replace with exported 404 when available. */
export default function NotFound() {
  return (
    <header className="page-hero" style={{ paddingBottom: 'var(--space-11)' }}>
      <div className="strx-container inner">
        <Eyebrow>// 404</Eyebrow>
        <h1>
          Page <span className="accent">not found.</span>
        </h1>
        <p className="lead">The page you’re looking for moved or never existed.</p>
        <div style={{ marginTop: 'var(--space-6)' }}>
          <Link href="/" className="btn btn-dark">
            Back home →
          </Link>
        </div>
      </div>
    </header>
  )
}
