'use client'

import { useState } from 'react'

/**
 * Brand lockup image with a graceful fallback: if the logo file is missing
 * (e.g. not added to /public yet), it falls back to the text wordmark instead
 * of showing a broken image. The lockup already includes the word, so the
 * separate wordmark is only shown in the fallback.
 */
export function BrandLogo({
  src,
  word,
  className,
}: {
  src: string
  word: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  if (failed) return <span className="nav-word">{word}</span>
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={src} alt={word} onError={() => setFailed(true)} />
}
