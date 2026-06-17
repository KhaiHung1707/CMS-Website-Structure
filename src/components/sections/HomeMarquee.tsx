interface Logo {
  label: string
  variant?: 'mono' | 'italic'
}

const LOGOS: Logo[] = [
  { label: 'Luma' },
  { label: 'QUARTZ', variant: 'mono' },
  { label: 'Nordic', variant: 'italic' },
  { label: 'Petal' },
  { label: 'ATLAS', variant: 'mono' },
  { label: 'Coil' },
  { label: 'Glyphic', variant: 'italic' },
  { label: 'IMELD', variant: 'mono' },
]

/** Logo marquee band (ported 1:1). The set is duplicated for a seamless CSS loop. */
export function HomeMarquee() {
  return (
    <section className="mq-band">
      <div className="strx-container">
        <div className="mq-label">// Trusted by product teams</div>
      </div>
      <div className="mq-wrap">
        <div className="mq-track">
          {[...LOGOS, ...LOGOS].map((l, i) => (
            <span key={i} className={l.variant ? `mq-logo ${l.variant}` : 'mq-logo'}>
              {l.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
