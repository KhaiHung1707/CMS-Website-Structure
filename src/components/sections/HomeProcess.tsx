/** Process bento (ported 1:1 from Structure Homepage.html). Static — no interactivity. */
export function HomeProcess() {
  return (
    <section className="sec cream" id="process">
      <div className="strx-container">
        <div className="sec-head">
          <p className="t-mono">// Process</p>
          <h2>
            How we <span className="accent">work.</span>
          </h2>
          <p>
            A clear roadmap with weekly deliverables. You always know where you are and what comes
            next.
          </p>
        </div>
        <div className="bento">
          <div className="bento-card accent step">
            <div className="bento-step">Week 0</div>
            <div>
              <div className="bento-num">01</div>
              <h3>Kick-off</h3>
              <p className="bd">Discovery workshop. Map goals and success metrics.</p>
            </div>
          </div>
          <div className="bento-card wide dark">
            <div className="bento-step">Weeks 1–4</div>
            <div>
              <h3>Strategy &amp; Design</h3>
              <p className="bd">
                Sitemap, user flow, content strategy, then high-fidelity design and a full Figma
                prototype — ready to build.
              </p>
            </div>
          </div>
          <div className="bento-card step">
            <div className="bento-step">Weeks 5–8</div>
            <div>
              <div className="bento-num">02</div>
              <h3>Build</h3>
              <p className="bd">Next.js + TypeScript code. Weekly staging so you see real progress.</p>
            </div>
          </div>
          <div className="bento-card step">
            <div className="bento-step">Weeks 9–11</div>
            <div>
              <div className="bento-num">03</div>
              <h3>Launch</h3>
              <p className="bd">QA, accessibility, performance, zero-downtime go-live.</p>
            </div>
          </div>
          <div className="bento-card">
            <div className="bento-step">Post-launch</div>
            <div>
              <h3>Partnership &amp; optimization</h3>
              <p className="bd">
                Two-week retainer sprints, async-first, monthly metrics reports. We don&apos;t
                disappear after go-live.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
