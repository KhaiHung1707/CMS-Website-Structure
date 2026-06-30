import { Eyebrow } from '@/components/ui/Eyebrow'
import { renderAccentHeading } from '@/lib/utils/accentHeading'
import type { CapabilityLibrary as CapabilityLibraryData, ModuleTag } from '@/lib/content/types'

/** Canonical chip word for each module classification. */
const TAG_WORD: Record<ModuleTag, string> = {
  core: 'Connects',
  set: 'We set up',
  edge: 'Your edge',
}

const tagClass = (tag: ModuleTag) => `tg tg-${tag}`

/**
 * Capability "full library" section (templates/.../service-legal-operating-layer.html #what):
 * a legend, grouped module cards tagged by classification, practice-area packs, and a
 * dashed "keepbar" callout. All copy is data-driven; section hidden when there are no groups.
 */
export function CapabilityLibrary({ library }: { library?: CapabilityLibraryData | null }) {
  const groups = library?.groups ?? []
  if (!library || groups.length === 0) return null

  const legend = library.legend ?? []
  const packs = library.packs ?? []
  const callout = library.callout

  return (
    <section className="sec" id="what">
      <div className="strx-container">
        <div className="sec-head reveal">
          {library.eyebrow ? <Eyebrow>{library.eyebrow}</Eyebrow> : null}
          {library.heading ? <h2>{renderAccentHeading(library.heading)}</h2> : null}
          {library.lead ? <p>{library.lead}</p> : null}
        </div>

        {legend.length > 0 ? (
          <div className="lib-legend reveal">
            {legend.map((l, i) => (
              <span className="lib-leg" key={i}>
                <span className={tagClass(l.tag)}>{TAG_WORD[l.tag]}</span> {l.label}
              </span>
            ))}
          </div>
        ) : null}

        {groups.map((g, gi) => (
          <div className="lib-group reveal" key={`${g.num}-${gi}`}>
            <div className="lib-ghead">
              <span className="gn">{g.num}</span>
              <h3>{g.title}</h3>
              {g.subtitle ? <span className="gt">{g.subtitle}</span> : null}
            </div>
            <div className="lib-grid">
              {(g.modules ?? []).map((m, mi) => (
                <div className="lib-mod" key={`${m.title}-${mi}`}>
                  <div className="mh">
                    <h4>{m.title}</h4>
                    <span className={tagClass(m.tag)}>{TAG_WORD[m.tag]}</span>
                  </div>
                  <p>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {packs.length > 0 ? (
          <div className="lib-group reveal" style={{ marginBottom: 0 }}>
            <div className="packs-head">
              {library.packs_num ? <span className="gn">{library.packs_num}</span> : null}
              {library.packs_title ? <h3>{library.packs_title}</h3> : null}
            </div>
            {library.packs_lead ? (
              <p style={{ color: 'var(--text-muted)', fontSize: 15.5, maxWidth: '60ch', marginBottom: 18 }}>
                {library.packs_lead}
              </p>
            ) : null}
            <div className="packs">
              {packs.map((p, i) => (
                <span className="pack" key={`${p.name}-${i}`}>
                  {p.name}
                  {p.sub ? <span className="pe">{p.sub}</span> : null}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {callout?.title ? (
          <div className="keepbar reveal" style={{ marginTop: 34 }}>
            {callout.icon ? <span className="ic">{callout.icon}</span> : null}
            <div>
              <b>{callout.title}</b>
              {callout.text ? <p>{callout.text}</p> : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
