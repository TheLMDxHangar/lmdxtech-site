const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Line reveals: any element containing .line gets .is-in when it enters view.
(() => {
  const targets = document.querySelectorAll('.hero, .work__title, .contact__title');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  targets.forEach((t) => io.observe(t));
})();

// Hero adjective: cycles through the deck, sliding out and back in.
(() => {
  const el = document.getElementById('adj');
  if (!el || reducedMotion) return;

  const deck = ['Good', 'Great', 'Stupendous', 'Magnificent', 'Funky', 'Slick', 'Soulful'];
  let i = 0;

  el.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease';

  const swap = () => {
    el.style.transform = 'translateY(-60%)';
    el.style.opacity = '0';
    setTimeout(() => {
      i = (i + 1) % deck.length;
      el.textContent = deck[i];
      el.style.transition = 'none';
      el.style.transform = 'translateY(60%)';
      void el.offsetHeight;
      el.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease';
      el.style.transform = 'translateY(0)';
      el.style.opacity = '1';
    }, 320);
  };

  setTimeout(() => setInterval(swap, 2800), 2200);
})();

// Hero binary field: fill with 0/1 so the markup stays clean.
(() => {
  const bin = document.getElementById('bin');
  if (!bin) return;
  let s = '';
  for (let n = 0; n < 2600; n++) s += Math.random() < 0.5 ? '0' : '1';
  bin.textContent = s;
})();

// Nav: transparent at the very top, solid black bar once the page has scrolled.
(() => {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const update = () => nav.classList.toggle('nav--solid', window.scrollY > 24);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// About paragraph: words light up one by one as the section scrolls through.
(() => {
  const p = document.getElementById('aboutReveal');
  if (!p) return;

  const words = p.textContent.trim().split(/\s+/);
  p.innerHTML = words.map((w) => `<span class="w">${w}</span>`).join(' ');
  const spans = p.querySelectorAll('.w');

  const update = () => {
    const r = p.getBoundingClientRect();
    const vh = window.innerHeight;
    const start = vh * 0.9;
    const end = vh * 0.3;
    const progress = Math.min(1, Math.max(0, (start - r.top) / (r.height + start - end)));
    const lit = Math.round(progress * spans.length);
    spans.forEach((s, i) => s.classList.toggle('on', i < lit));
  };

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
