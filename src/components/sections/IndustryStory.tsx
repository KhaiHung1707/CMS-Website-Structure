import { Eyebrow } from '@/components/ui/Eyebrow'

/**
 * Case-study scrolly section ported 1:1 from templates/industry-saas.html (#story).
 * Static design decoration (mockup chrome). data-focus="p1" shows the first step,
 * matching the template's default state without the scroll-driven JS.
 */
export function IndustryStory() {
  return (
    <section className="sec cream" id="story">
      <div className="strx-container">
        <div className="sec-head reveal">
          <Eyebrow>// Case study · QuoteFlow</Eyebrow>
          <h2>
            Four steps, <span className="accent">structured.</span>
          </h2>
          <p>
            Scroll through how QuoteFlow takes a customer from an instant quote to a paid, tracked
            project — all on one platform.
          </p>
        </div>

        <div className="scrolly-grid">
          <div className="scrolly-visual">
            <div className="story-window story-art" data-focus="p1">
              <div className="story-chrome">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span className="ttl">quoteflow.app — customer portal</span>
              </div>
              <div className="story-body">
                <div className="story-part" data-part="p1">
                  <div className="sp-cap">01 · Instant quote</div>
                  <div className="sp-row" style={{ justifyContent: 'space-between', marginBottom: 14 }}>
                    <div>
                      <span className="sp-num" style={{ fontSize: 28 }}>$2,450</span>
                      <div className="sp-muted" style={{ fontSize: 11 }}>Live estimate · USD</div>
                    </div>
                    <span className="sp-chip accent">Instant</span>
                  </div>
                  <div className="sp-row" style={{ justifyContent: 'space-between' }}>
                    <span className="sp-muted">Website design</span>
                    <span className="sp-title" style={{ fontSize: 14 }}>$1,200</span>
                  </div>
                  <div className="sp-row" style={{ justifyContent: 'space-between', marginTop: 8 }}>
                    <span className="sp-muted">Content writing</span>
                    <span className="sp-title" style={{ fontSize: 14 }}>$800</span>
                  </div>
                  <div className="sp-row" style={{ justifyContent: 'space-between', marginTop: 8 }}>
                    <span className="sp-muted">SEO &amp; keywords</span>
                    <span className="sp-title" style={{ fontSize: 14 }}>$450</span>
                  </div>
                </div>
              </div>
              <div className="story-progress" />
            </div>
          </div>

          <div className="scrolly-steps">
            <article className="scrolly-step active" data-step="0" data-focus="p1">
              <div className="ss-num">
                <span className="dot">01</span>Instant quote
              </div>
              <h3>Priced in minutes, not days.</h3>
              <p>
                Customers build a live estimate from the service catalog and see the total before they
                commit — no email, no waiting on a sales reply.
              </p>
              <div className="ss-tags">
                <span className="tag">Quote calculator</span>
                <span className="tag">Live estimate</span>
                <span className="tag">Self-serve</span>
              </div>
            </article>
            <article className="scrolly-step" data-step="1" data-focus="p2">
              <div className="ss-num">
                <span className="dot">02</span>Request &amp; consult
              </div>
              <h3>From interest to inquiry, instantly.</h3>
              <p>
                One form captures the service type, project details, and attachments, then routes the
                request straight to the team for consultation.
              </p>
              <div className="ss-tags">
                <span className="tag">Service request</span>
                <span className="tag">Attachments</span>
                <span className="tag">Consultation</span>
              </div>
            </article>
            <article className="scrolly-step" data-step="2" data-focus="p3">
              <div className="ss-num">
                <span className="dot">03</span>Customer portal
              </div>
              <h3>Every quote, project and booking in one place.</h3>
              <p>
                A personal dashboard tracks quotes, project status, appointments, and requests in real
                time — so customers always know where things stand.
              </p>
              <div className="ss-tags">
                <span className="tag">Dashboard</span>
                <span className="tag">Bookings</span>
                <span className="tag">Status tracking</span>
              </div>
            </article>
            <article className="scrolly-step" data-step="3" data-focus="p4">
              <div className="ss-num">
                <span className="dot">04</span>Pay &amp; track
              </div>
              <h3>Paid, invoiced, and kept in the loop.</h3>
              <p>
                A built-in wallet, invoices, and automated notifications keep customers paying and
                informed at every stage of the project.
              </p>
              <div className="ss-tags">
                <span className="tag">Wallet</span>
                <span className="tag">Invoices</span>
                <span className="tag">Notifications</span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
