/**
 * The persistent SaaS console mock artifact (story-window body) from
 * service-saas.html. Four `.story-part`s light up via `data-focus` on the
 * parent `.story-art` (driven by ServiceTabs). Static design markup; inline
 * px/hex from the template are lifted to single-service.css helper classes.
 */
export function SaasConsole() {
  return (
    <>
      <div className="story-chrome">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="ttl">app.structure.studio — console</span>
      </div>
      <div className="story-body">
        <div className="story-part" data-part="p1">
          <div className="sp-cap">01 · Auth &amp; tenancy</div>
          <div className="sp-bar story-mock-tall" />
          <div className="sp-bar story-mock-tall" />
          <div className="sp-sso">Continue with SSO</div>
          <div className="sp-chips">
            <span className="sp-chip accent">Admin</span>
            <span className="sp-chip">Member</span>
            <span className="sp-chip">Viewer</span>
          </div>
        </div>

        <div className="story-part" data-part="p2">
          <div className="sp-cap">02 · Realtime dashboard</div>
          <div className="sp-split gap">
            <div>
              <span className="sp-num sp-num-lg">1,284</span>
              <div className="sp-muted sp-muted-xs">Active users</div>
            </div>
            <div>
              <span className="sp-num sp-num-lg">+18%</span>
              <div className="sp-muted sp-muted-xs">MoM</div>
            </div>
          </div>
          <svg viewBox="0 0 300 70" className="sp-spark">
            <polyline
              points="6,60 50,48 96,54 142,34 188,40 234,20 296,12"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="story-part" data-part="p3">
          <div className="sp-cap">03 · Billing</div>
          <div className="sp-split">
            <span className="sp-title">Studio plan</span>
            <span className="sp-num sp-num-md">
              $49<span className="sp-per">/mo</span>
            </span>
          </div>
          <div className="sp-split gap-top">
            <span className="sp-muted">Seats · 8</span>
            <span className="sp-chip accent">Active</span>
          </div>
        </div>

        <div className="story-part" data-part="p4">
          <div className="sp-cap">04 · Scale · tenants</div>
          <div className="sp-tenants">
            <div className="sp-bar" />
            <div className="sp-bar fill" />
            <div className="sp-bar" />
            <div className="sp-bar" />
            <div className="sp-bar fill" />
            <div className="sp-bar" />
            <div className="sp-bar fill" />
            <div className="sp-bar" />
            <div className="sp-bar" />
            <div className="sp-bar fill" />
            <div className="sp-bar" />
            <div className="sp-bar" />
          </div>
          <div className="sp-split gap-top-lg">
            <span className="sp-muted">128 tenants</span>
            <span className="sp-chip accent">99.9% uptime</span>
          </div>
        </div>
      </div>
    </>
  )
}
