import type { ReactNode } from 'react'

/**
 * STAGE — the bespoke "one connected view" scrolly artifact for the Legal
 * Operating Layer industry (templates/.../service-legal-operating-layer.html #stage).
 * Nine screens, one lit per active step. Pure design decoration ported 1:1; the
 * step copy still comes from `industry.story.steps`. Keyed by slug so other
 * industries fall back to the generic story-window. CSS in single-industry.css.
 */
export function StageVisual({
  slug,
  active,
  stepCount,
  fallback,
}: {
  slug: string
  active: number
  stepCount: number
  fallback: ReactNode
}) {
  const screens = STAGE_SCREENS[slug]
  if (!screens) return <>{fallback}</>

  const progress = `${((active + 1) / Math.max(stepCount, 1)) * 100}%`

  return (
    <div className="stage">
      <div className="stage-bar">
        <div className="dotrow">
          <span className="d" />
          <span className="d" />
          <span className="d" />
        </div>
        <div className="url">your firm · one connected view</div>
      </div>
      <div className="stage-screens">
        {screens.map((screen, i) => (
          <div className={i === active ? 'screen on' : 'screen'} key={i}>
            {screen}
          </div>
        ))}
      </div>
      <div className="stage-prog">
        <i style={{ width: progress }} />
      </div>
    </div>
  )
}

const LEGAL_SCREENS: ReactNode[] = [
  // 01 — auto-triage
  <>
    <div className="scap">// auto-triage &amp; routing</div>
    <div className="stitle">
      Sorts &amp; routes every inquiry <span className="cnt">instant</span>
    </div>
    <div className="arow">
      <span className="chip">From intake form</span>
      <span className="chip hot">Immigration · restoration</span>
    </div>
    <div className="arow">
      <span className="chip">Priority rule</span>
      <span className="chip hot">High</span>
      <span className="chip score">Score 92</span>
    </div>
    <div className="action ok">
      <span className="ic">➡️</span>
      <div>
        <b>Routed to intake queue</b>Assigned to Mai by practice-area rule
      </div>
    </div>
    <div className="action ok">
      <span className="ic">✉️</span>
      <div>
        <b>Instant reply sent</b>Matched template · 24/7, even at 2 AM
      </div>
    </div>
    <div className="action ok">
      <span className="ic">✓</span>
      <div>
        <b>Logged &amp; tracked</b>Nothing waits in an inbox
      </div>
    </div>
    <div className="snote">
      The form&apos;s own answers tag, score, and route each inquiry — then fire an instant reply. No one has to be
      watching.
    </div>
  </>,
  // 02 — sequences
  <>
    <div className="scap">// behavioral sequences</div>
    <div className="stitle">
      Follow-ups that fire on their own <span className="cnt">running</span>
    </div>
    <div className="flow">
      <div className="fstep trig">
        <span className="ft">TRIGGER</span>
        <b>No-show detected</b>
      </div>
      <div className="farr" />
      <div className="fstep">
        <span className="ft">WAIT</span>1 hour
      </div>
      <div className="farr" />
      <div className="fstep">
        <span className="ft">DO</span>Send re-engage SMS + rebook link
      </div>
      <div className="farr" />
      <div className="fstep">
        <span className="ft">IF</span>No reply in 48h → notify attorney
      </div>
    </div>
    <div className="snote">
      Stalled docs, no-shows, cold leads — each kicks off its own sequence. Nothing waits on memory.
    </div>
  </>,
  // 03 — workflow engine
  <>
    <div className="scap">// workflow engine</div>
    <div className="stitle">
      When this, do that <span className="cnt">active rule</span>
    </div>
    <div className="rule">
      <div className="rwhen">
        <span className="k">WHEN</span>Matter stage changes to &quot;Retainer signed&quot;
      </div>
      <div className="rthen">
        <span className="k">THEN, AUTOMATICALLY</span>
        <div className="ract">
          <span className="b">✓</span>Generate the matter task list
        </div>
        <div className="ract">
          <span className="b">✓</span>Send the welcome email + portal invite
        </div>
        <div className="ract">
          <span className="b">✓</span>Set every deadline for this matter type
        </div>
        <div className="ract">
          <span className="b">✓</span>Assign the paralegal &amp; notify them
        </div>
      </div>
    </div>
    <div className="snote">
      One event sets off a chain of tasks, emails, and updates across the firm — built with no code.
    </div>
  </>,
  // 04 — matter blueprints
  <>
    <div className="scap">// matter blueprints</div>
    <div className="stitle">
      A whole matter in one click <span className="cnt">Study Permit</span>
    </div>
    <div className="genhead">
      <span className="ic">⚡</span>&quot;Study Permit&quot; blueprint applied — built in 0.4s
    </div>
    <div className="gengrid">
      <div className="gentile">
        <div className="n">11</div>
        <div className="l">tasks created &amp; assigned</div>
      </div>
      <div className="gentile">
        <div className="n">4</div>
        <div className="l">key deadlines set</div>
      </div>
      <div className="gentile">
        <div className="n">6</div>
        <div className="l">document templates queued</div>
      </div>
      <div className="gentile">
        <div className="n">3</div>
        <div className="l">team members notified</div>
      </div>
    </div>
    <div className="snote">
      Pick the matter type — the entire workflow builds itself. No two-hour setup, ever again.
    </div>
  </>,
  // 05 — deadline engine
  <>
    <div className="scap">// deadline engine</div>
    <div className="stitle">
      Critical dates, calculated <span className="cnt">auto-tracked</span>
    </div>
    <div className="dl">
      <div>
        <div className="dt">Biometrics deadline</div>
        <div className="ds">reminder set · escalates at 3 days</div>
      </div>
      <span className="cd warn">in 6 days</span>
    </div>
    <div className="dl">
      <div>
        <div className="dt">PR filing window opens</div>
        <div className="ds">calendar + client portal updated</div>
      </div>
      <span className="cd soon">in 21 days</span>
    </div>
    <div className="dl">
      <div>
        <div className="dt">Limitation period</div>
        <div className="ds">jurisdiction: Ontario</div>
      </div>
      <span className="cd ok">340 days</span>
    </div>
    <div className="snote">
      It computes every date by matter type and jurisdiction — and escalates before one is missed.
    </div>
  </>,
  // 06 — document automation
  <>
    <div className="scap">// document automation</div>
    <div className="stitle">
      Documents write themselves <span className="cnt">Engagement letter</span>
    </div>
    <div className="mdoc">
      This agreement is between <span className="mf done">Sarah Chen</span> and the firm, regarding{' '}
      <span className="mf done">Study Permit — Restoration</span>, for a retainer of{' '}
      <span className="mf done">$1,500</span>, dated <span className="mf done">Mar 19, 2026</span>.
    </div>
    <div className="action ok">
      <span className="ic">📄</span>
      <div>
        <b>Engagement-Letter.pdf generated</b>4 fields merged from the matter · 0.3s
      </div>
    </div>
    <div className="snote">
      Letters, agreements, and government forms fill themselves from matter data. Nothing retyped.
    </div>
  </>,
  // 07 — document intake
  <>
    <div className="scap">// document intake &amp; validation</div>
    <div className="stitle">
      Every upload checked &amp; filed <span className="cnt">Study Permit</span>
    </div>
    <div className="ex">
      <div className="exrow">
        <span className="l">Passport</span>
        <span className="v">✓ received · filed</span>
      </div>
      <div className="exrow">
        <span className="l">Photo ID</span>
        <span className="v">✓ received · filed</span>
      </div>
      <div className="exrow">
        <span className="l">Bank statement</span>
        <span className="v">✓ received · filed</span>
      </div>
      <div className="exrow">
        <span className="l">Proof of enrolment</span>
        <span className="v">✓ received · filed</span>
      </div>
      <div className="exrow miss">
        <span className="l">Reference letter</span>
        <span className="v">missing · reminder sent</span>
      </div>
    </div>
    <div className="snote">
      Each upload is matched to the matter&apos;s required list, filed automatically, and gaps are chased for you.
    </div>
  </>,
  // 08 — integration & sync
  <>
    <div className="scap">// integration &amp; sync</div>
    <div className="stitle">
      Every tool, in sync — two ways <span className="cnt">real-time</span>
    </div>
    <div className="sync">
      <div className="snode">
        <span className="nm">Practice software</span>
        <span className="st">✓ synced</span>
      </div>
      <div className="snode">
        <span className="nm">QuickBooks</span>
        <span className="st">✓ synced</span>
      </div>
      <div className="snode">
        <span className="nm">Calendar</span>
        <span className="st">✓ synced</span>
      </div>
      <div className="snode">
        <span className="nm">e-Sign</span>
        <span className="st sy">↻ syncing</span>
      </div>
      <div className="snode">
        <span className="nm">Payments</span>
        <span className="st">✓ synced</span>
      </div>
      <div className="snode">
        <span className="nm">Google Business</span>
        <span className="st">✓ synced</span>
      </div>
    </div>
    <div className="snote">
      Data flows once and lands everywhere it belongs — no double entry, no tools drifting apart.
    </div>
  </>,
  // 09 — analytics
  <>
    <div className="scap">// live analytics</div>
    <div className="stitle">
      It spots the bottleneck first <span className="cnt">last 30 days</span>
    </div>
    <div className="tiles">
      <div className="tile">
        <div className="n">32</div>
        <div className="l">active matters</div>
      </div>
      <div className="tile">
        <div className="n">
          91<span className="s">%</span>
        </div>
        <div className="l">realization</div>
      </div>
      <div className="tile">
        <div className="n">
          4.1<span className="s">d</span>
        </div>
        <div className="l">to retained</div>
      </div>
    </div>
    <div className="chan">
      <span className="chl">Referrals</span>
      <div className="chbar">
        <i style={{ width: '100%' }} />
      </div>
      <span className="chv">23</span>
    </div>
    <div className="chan">
      <span className="chl">Google</span>
      <div className="chbar">
        <i style={{ width: '78%' }} />
      </div>
      <span className="chv">18</span>
    </div>
    <div className="alert">
      <b>⚠ 4 matters stalled</b> at &quot;Documents pending&quot; for 7+ days — nudge sent automatically.
    </div>
    <div className="snote">
      Realization, pipeline, channel ROI, and where work is stuck — surfaced before it costs you.
    </div>
  </>,
]

const STAGE_SCREENS: Record<string, ReactNode[]> = {
  'legal-operating-layer': LEGAL_SCREENS,
}
