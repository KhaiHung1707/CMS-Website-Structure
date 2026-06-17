import type { GalleryItem } from '@/lib/content/types'
import { mediaUrl, mediaAlt } from '@/lib/utils/format'

/**
 * Single case-study gallery (.cs-gallery → .cs-shot). Ported from
 * single-portfolio.html (CMS:REPEAT gallery). Renders each item's image when
 * resolved, otherwise keeps a representative inline SVG placeholder so the
 * .cs-shot tile layout holds. Caption → .cap.
 */
export function PortfolioGallery({ gallery }: { gallery: GalleryItem[] }) {
  if (gallery.length === 0) return null

  return (
    <section className="sec">
      <div className="strx-container">
        <div className="sec-head reveal">
          <p className="t-mono">// Selected screens</p>
          <h2>
            Inside the <span className="accent">build.</span>
          </h2>
        </div>
        <div className="cs-gallery reveal">
          {gallery.map((shot, i) => {
            const src = mediaUrl(shot.image)
            return (
              <div className="cs-shot" key={i}>
                {src ? (
                  <img src={src} alt={mediaAlt(shot.image, shot.caption ?? '')} />
                ) : (
                  <svg viewBox="0 0 600 450" preserveAspectRatio="xMidYMid slice">
                    <rect width="600" height="450" fill="#ECE7DE" />
                    <g fill="none" stroke="rgba(167,40,43,0.18)" strokeWidth="1">
                      <path d="M0 112H600M0 225H600M0 337H600M150 0V450M300 0V450M450 0V450" />
                    </g>
                    <rect x="40" y="40" width="220" height="30" rx="6" fill="#1a1a1a" opacity="0.85" />
                    <rect x="40" y="90" width="520" height="14" rx="4" fill="#1a1a1a" opacity="0.18" />
                    <rect x="40" y="116" width="460" height="14" rx="4" fill="#1a1a1a" opacity="0.18" />
                  </svg>
                )}
                {shot.caption ? <span className="cap">{shot.caption}</span> : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
