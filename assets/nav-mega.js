/* Services mega menu — shared injector.
   Idempotent: skips if a #megaPanel already exists (e.g. the homepage builds it inline).
   Finds the "Services" nav link, turns it into a hover/focus mega-menu trigger,
   and appends the panel to nav.top. Load AFTER the nav is in the DOM. */
(function () {
  var MEGA_HTML = `
    <div class="strx-container">
      <div class="mega-card">
        <div class="mega-aside">
          <p class="t-mono">// Services</p>
          <h3>Four capabilities,<br>one team.</h3>
          <p class="mega-blurb">Strategy, design, and engineering under one roof — together from the first commit to launch and beyond.</p>
          <a href="services.html" class="mega-all">View all services <span>→</span></a>
          <div class="mega-promo">
            <span class="mp-eye">// Featured</span>
            <span class="mp-title">Luma Atelier — +212% mobile revenue</span>
            <a href="work.html" class="mp-link">Read case study →</a>
          </div>
        </div>
        <div class="mega-grid">
          <a class="mega-item" href="service-web-design.html">
            <span class="mi-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg></span>
            <span class="mi-body"><span class="mi-top"><span class="mi-n">01</span><span class="mi-name">Web Design</span></span><span class="mi-desc">High-fidelity interface design and interactive prototypes — a component system, not static mockups.</span></span>
            <span class="mi-arr">→</span>
          </a>
          <a class="mega-item" href="service-web-app.html">
            <span class="mi-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8h20"/><path d="M6 4v4"/><path d="M10 4v4"/></svg></span>
            <span class="mi-body"><span class="mi-top"><span class="mi-n">02</span><span class="mi-name">Web Application</span></span><span class="mi-desc">Stateful web apps, typed end-to-end. Next.js, TypeScript, production-ready infrastructure.</span></span>
            <span class="mi-arr">→</span>
          </a>
          <a class="mega-item" href="service-seo.html">
            <span class="mi-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg></span>
            <span class="mi-body"><span class="mi-top"><span class="mi-n">03</span><span class="mi-name">SEO &amp; Core Web Vitals</span></span><span class="mi-desc">Technical SEO and Core Web Vitals engineered in from the first commit — not bolted on later.</span></span>
            <span class="mi-arr">→</span>
          </a>
          <a class="mega-item" href="service-saas.html">
            <span class="mi-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.84Z"/><path d="m6.08 9.5-3.48 1.59a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.84L17.92 9.5"/></svg></span>
            <span class="mi-body"><span class="mi-top"><span class="mi-n">04</span><span class="mi-name">SaaS Platform</span></span><span class="mi-desc">Multi-tenant SaaS platforms: auth, billing, dashboards, and a design system that scales.</span></span>
            <span class="mi-arr">→</span>
          </a>
        </div>
      </div>
    </div>`;

  function init() {
    var nav = document.querySelector('nav.top');
    if (!nav) return;
    if (nav.querySelector('#megaPanel')) return; // already built (homepage)
    var link = nav.querySelector('.nav-links a[href="services.html"]');
    if (!link) return;
    var li = link.closest('li');
    if (!li) return;

    li.classList.add('has-mega');
    if (!li.id) li.id = 'megaServices';
    link.classList.add('nav-mega-trigger');
    link.setAttribute('aria-haspopup', 'true');
    link.setAttribute('aria-expanded', 'false');
    if (!link.querySelector('.nav-caret')) {
      link.appendChild(document.createTextNode(' '));
      var caret = document.createElement('span');
      caret.className = 'nav-caret';
      caret.textContent = '▾';
      link.appendChild(caret);
    }

    var panel = document.createElement('div');
    panel.className = 'mega';
    panel.id = 'megaPanel';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', 'Services menu');
    panel.innerHTML = MEGA_HTML;
    nav.appendChild(panel);

    var closeTimer = null;
    function open() { clearTimeout(closeTimer); li.classList.add('open'); panel.classList.add('open'); link.setAttribute('aria-expanded', 'true'); }
    function close() { li.classList.remove('open'); panel.classList.remove('open'); link.setAttribute('aria-expanded', 'false'); }
    function delayedClose() { clearTimeout(closeTimer); closeTimer = setTimeout(close, 150); }
    [li, panel].forEach(function (el) {
      el.addEventListener('mouseenter', open);
      el.addEventListener('mouseleave', delayedClose);
    });
    link.addEventListener('focus', open);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    document.addEventListener('focusin', function (e) { if (!li.contains(e.target) && !panel.contains(e.target)) close(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
