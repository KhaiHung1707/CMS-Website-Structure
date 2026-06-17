/* STRUCXAL — service detail page interactions (shared) */
(function () {
  // sticky nav border
  var nav = document.getElementById('topnav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // FAQ accordion
  document.querySelectorAll('#faqList .faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq-item');
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('#faqList .faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // scroll reveal — visible by default; animates in when JS + motion allowed
  (function () {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    document.body.classList.add('js-anim');
    var show = function (e) { e.classList.add('in'); };
    if (!('IntersectionObserver' in window)) { els.forEach(show); return; }
    var io = new IntersectionObserver(function (ents, obs) {
      ents.forEach(function (en) { if (en.isIntersecting) { show(en.target); obs.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    els.forEach(function (e) { io.observe(e); });
    setTimeout(function () { els.forEach(show); }, 1400);
  })();

  // count-up numbers
  (function () {
    var nums = document.querySelectorAll('.count-up');
    if (!nums.length) return;
    var run = function (el) {
      var target = parseFloat(el.dataset.target), dur = 1400, t0 = performance.now();
      var step = function (now) {
        var p = Math.min((now - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString('en-US');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) { nums.forEach(run); return; }
    var io = new IntersectionObserver(function (ents, obs) {
      ents.forEach(function (en) {
        if (en.isIntersecting && !en.target.dataset.done) { en.target.dataset.done = '1'; run(en.target); obs.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io.observe(n); });
  })();

  // SCROLLY — sticky visual driven by the active step
  (function () {
    var section = document.querySelector('.scrolly-grid');
    if (!section) return;
    var steps = Array.prototype.slice.call(section.querySelectorAll('.scrolly-step'));
    var panels = Array.prototype.slice.call(section.querySelectorAll('.sv-panel'));
    var progress = section.querySelector('.sv-progress');
    if (!steps.length || !panels.length) return;

    var setActive = function (idx) {
      steps.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
      panels.forEach(function (p, i) { p.classList.toggle('active', i === idx); });
      if (progress) progress.style.width = ((idx + 1) / steps.length * 100) + '%';
    };
    setActive(0);

    if (!('IntersectionObserver' in window)) return;
    // activate a step when its centre crosses the middle band of the viewport
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var idx = steps.indexOf(en.target);
          if (idx > -1) setActive(idx);
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    steps.forEach(function (s) { io.observe(s); });
  })();

  // HIGHLIGHT ARTIFACT — one persistent mock; the step nearest viewport centre lights up its part.
  // Scroll-position based (not IntersectionObserver) so it fires reliably in every renderer.
  (function () {
    var art = document.querySelector('.story-art');
    var steps = Array.prototype.slice.call(document.querySelectorAll('.scrolly-step'));
    var prog = document.querySelector('.story-progress');
    if (!art || !steps.length) return;
    var current = -1;
    var setActive = function (idx) {
      if (idx === current) return;
      current = idx;
      steps.forEach(function (s, i) { s.classList.toggle('active', i === idx); });
      art.setAttribute('data-focus', steps[idx].getAttribute('data-focus'));
      if (prog) prog.style.width = ((idx + 1) / steps.length * 100) + '%';
    };
    var update = function () {
      var mid = window.innerHeight / 2, best = 0, bestDist = Infinity;
      steps.forEach(function (s, i) {
        var r = s.getBoundingClientRect();
        var d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setActive(best);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
  })();
})();
