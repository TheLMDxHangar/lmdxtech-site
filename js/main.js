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

  const deck = [
    'Innovative', 'Audacious', 'Funky', 'Extravagant', 'Soulful', 'Marvelous', 'Exceptional',
    'Unique', 'Remarkable', 'Efficient', 'Outstanding', 'Phenomenal', 'Stupendous', 'Delightful',
    'Scalable', 'Fabulous', 'Magnificent', 'Fun', 'Eclectic', 'Exquisite', 'Smooth'];
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

  // Centered wordmark shows once the hero has scrolled out from under the nav.
  const hero = document.querySelector('.hero');
  if (!hero) return;
  new IntersectionObserver(([e]) => nav.classList.toggle('nav--brand', !e.isIntersecting),
    { rootMargin: '-64px 0px 0px 0px' }).observe(hero);
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

// Teaser cards: censor mosaic and VHS static, drawn here so the markup stays clean.
(() => {
  const mosaic = document.getElementById('censorMosaic');
  if (mosaic) {
    const colors = ['#122348', '#1B2F5E', '#F9B248', '#FC3A52', '#62CDFF', '#F5EDDF', '#3FA34D'];
    let cells = '';
    for (let n = 0; n < 160; n++) {
      const x = n % 16;
      const y = Math.floor(n / 16);
      const d = Math.hypot(x - 7.5, y - 4.5);
      const c = d < 2.5 ? colors[2 + ((x * 7 + y * 3) % 3)]
        : d < 4.5 ? colors[(x * 5 + y * 11) % colors.length]
        : colors[(x + y) % 2];
      cells += `<i style="background:${c}"></i>`;
    }
    mosaic.innerHTML = cells;
  }

  const canvas = document.getElementById('vhsStatic');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const frame = ctx.createImageData(canvas.width, canvas.height);
  const draw = () => {
    for (let i = 0; i < frame.data.length; i += 4) {
      const v = Math.random() * 255;
      frame.data[i] = frame.data[i + 1] = frame.data[i + 2] = v;
      frame.data[i + 3] = 255;
    }
    ctx.putImageData(frame, 0, 0);
  };
  draw();
  if (reducedMotion) return;

  // Only flicker while the card is on screen.
  let timer = null;
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !timer) timer = setInterval(draw, 90);
    else if (!e.isIntersecting && timer) { clearInterval(timer); timer = null; }
  }).observe(canvas);
})();

// Blurred teaser name: "Click to reveal" never reveals anything.
(() => {
  const peek = document.querySelector('.peek');
  if (!peek) return;
  const toast = peek.querySelector('.peek__toast');
  const lines = [
    'Cut it out, nosy.',
    'Nosy! I love that for you.',
    'Stubborn AND curious? Sheesh.',
    'Are you my number one fan? Say less.',
    'You’re really excited about this, huh?',
    'Hands off the curtain, sweetie.',
    'Ooh, persistent. Save it for the encore.',
    ['Stop it, that tickles', 'assets/giggle.svg'],
  ];
  let n = 0;
  let timer = null;
  peek.addEventListener('click', () => {
    const [text, icon] = [].concat(lines[n % lines.length]);
    toast.textContent = text;
    if (icon) {
      const img = document.createElement('img');
      img.src = icon;
      img.alt = '';
      img.className = 'peek__icon';
      toast.append(' ', img);
    }
    n++;
    peek.classList.add('is-scolded');
    clearTimeout(timer);
    timer = setTimeout(() => peek.classList.remove('is-scolded'), 3000);
  });
})();
