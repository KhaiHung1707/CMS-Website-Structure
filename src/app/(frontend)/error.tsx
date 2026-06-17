'use client'

import { useEffect } from 'react'
import Link from 'next/link'

/** Route error boundary. Minimal DS-true page. TODO(design): replace when exported. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Surface for observability; replace with real logging in production.
    console.error(error)
  }, [error])

  return (
    <header className="page-hero" style={{ paddingBottom: 'var(--space-11)' }}>
      <div className="strx-container inner">
        <p className="t-mono">// Error</p>
        <h1>
          Something <span className="accent">broke.</span>
        </h1>
        <p className="lead">An unexpected error occurred. Try again, or head back home.</p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
          <button onClick={reset} className="btn btn-dark">
            Try again
          </button>
          <Link href="/" className="btn btn-soft">
            Back home
          </Link>
        </div>
      </div>
    </header>
  )
}
