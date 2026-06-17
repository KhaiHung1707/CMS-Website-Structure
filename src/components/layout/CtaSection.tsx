import Link from 'next/link'

interface CtaSectionProps {
  eyebrow?: string
  heading: React.ReactNode
  text?: string
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
}

/**
 * Shared closing CTA band. Markup/classes ported 1:1 from templates (section.cta).
 * Defaults match the design reference so any page can drop it in with no props.
 */
export function CtaSection({
  eyebrow = '// Get started',
  heading = (
    <>
      Is your project <span className="accent">next?</span>
    </>
  ),
  text = "Tell us about the product. A 30-minute call to see if we're a fit.",
  primary = { label: 'Start a project →', href: '/contact' },
  secondary = { label: 'View services', href: '/services' },
}: Partial<CtaSectionProps>) {
  return (
    <section className="cta" id="cta">
      <div className="strx-container inner">
        <p className="t-mono dark">{eyebrow}</p>
        <h2>{heading}</h2>
        {text ? <p>{text}</p> : null}
        <div className="acts">
          <Link href={primary.href} className="btn btn-accent">
            {primary.label}
          </Link>
          {secondary ? (
            <Link href={secondary.href} className="btn btn-on-dark">
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}
