// Shared motion layer for both locales: scroll reveals with stagger, pointer
// spotlight on cards, 3D tilt, magnetic buttons, scroll parallax, and (India,
// fine pointers only) a cursor glow. Never runs under prefers-reduced-motion.

const REVEAL = [
  '.zs-h2', '.zs-label', '.zs-lede', '.zs-chip',
  '.zs-band__grid > *',
  '.allp-card', '.allp-cat-name', '.allp-cat-label', '.prod-tile', '.prodx-featured', '.prodx-h2',
  '.cvpn-feature', '.cvpn-loancat', '.cvpn-suite-card', '.cvpn-step', '.cvpn-benefit',
  '.cvpn-dash', '.cvpn-btable-wrap', '.cvpn-section h2', '.cvpn-h2-center', '.cvpn-quote',
  '.pricing-card', '.comparison-table', '.signup-form', '.cal-wrap',
  '.feat-content', '.feat-image', '.product-card',
  '.cta-section h2', '.cta-section p', '.cta-section .hero-buttons',
].join(', ');

const SPOT = [
  '.zs-prob', '.zs-mod', '.zs-chip', '.product-card', '.prod-tile', '.prodx-featured',
  '.allp-card', '.cvpn-feature', '.cvpn-loancat', '.cvpn-suite-card', '.pricing-card', '.cvpn-status',
].join(', ');

const MAGNET = '.zs-btn--primary, .hero-btn-primary, .navbar-login-btn';
const TILT = '.cvpn-status';

let observer: IntersectionObserver | null = null;
let booted = false;
const timers: number[] = [];

function reduced(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function setupReveal() {
  observer?.disconnect();
  timers.splice(0).forEach((t) => window.clearTimeout(t));
  if (!('IntersectionObserver' in window)) return;

  const perParent = new Map<Element, number>();
  const targets = Array.from(document.querySelectorAll<HTMLElement>(REVEAL)).filter(
    (el) => !el.classList.contains('zs-reveal') && !el.closest('.zs-reveal') && !el.dataset.moDone,
  );

  targets.forEach((el) => {
    const parent = el.parentElement as Element;
    const i = Math.min(perParent.get(parent) ?? 0, 7);
    perParent.set(parent, i + 1);
    el.style.setProperty('--mo-i', String(i));
    el.dataset.moDone = '1';
    el.classList.add('mo-reveal');
  });

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        observer?.unobserve(el);
        el.classList.add('mo-in');
        // Drop the reveal transition afterwards so the element's own hover
        // transitions (lift, glow) are not overridden by it.
        const i = Number(el.style.getPropertyValue('--mo-i')) || 0;
        timers.push(
          window.setTimeout(() => el.classList.remove('mo-reveal', 'mo-in'), 900 + i * 80 + 150),
        );
      });
    },
    {threshold: 0.12, rootMargin: '0px 0px -6% 0px'},
  );
  targets.forEach((el) => observer!.observe(el));
}

function boot() {
  if (booted) return;
  booted = true;
  const root = document.documentElement;
  root.classList.add('mo-on');

  // Parallax: one rAF-throttled scroll listener writing a unitless CSS var.
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        root.style.setProperty('--mo-scroll', String(Math.min(window.scrollY, 900)));
        ticking = false;
      });
    },
    {passive: true},
  );

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!finePointer) return;

  // Cursor glow (India only), eased toward the pointer.
  let glow: HTMLDivElement | null = null;
  let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
  const step = () => {
    cx += (tx - cx) * 0.14;
    cy += (ty - cy) * 0.14;
    if (glow) glow.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.5 ? requestAnimationFrame(step) : 0;
  };

  document.addEventListener(
    'pointermove',
    (e) => {
      const target = e.target as Element | null;
      if (!target || !target.closest) return;

      if (root.lang === 'en-IN') {
        if (!glow) {
          glow = document.createElement('div');
          glow.className = 'mo-cursor';
          document.body.appendChild(glow);
        }
        glow.classList.add('is-on');
        tx = e.clientX; ty = e.clientY;
        if (!raf) raf = requestAnimationFrame(step);
      }

      const card = target.closest<HTMLElement>(SPOT);
      if (card) {
        const r = card.getBoundingClientRect();
        card.classList.add('mo-spot');
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }

      const tilt = target.closest<HTMLElement>(TILT);
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tilt.dataset.moTilt = '1';
        tilt.classList.add('mo-tilting');
        tilt.style.setProperty('--mo-ry', `${(px * 12).toFixed(2)}deg`);
        tilt.style.setProperty('--mo-rx', `${(-py * 10).toFixed(2)}deg`);
      }

      const magnet = target.closest<HTMLElement>(MAGNET);
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.32;
        magnet.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
      }
    },
    {passive: true},
  );

  document.addEventListener(
    'pointerout',
    (e) => {
      const from = e.target as Element | null;
      if (!from || !from.closest) return;
      const to = e.relatedTarget as Node | null;
      const tilt = from.closest<HTMLElement>(TILT);
      if (tilt && !(to && tilt.contains(to))) {
        tilt.classList.remove('mo-tilting');
        tilt.style.setProperty('--mo-rx', '0deg');
        tilt.style.setProperty('--mo-ry', '0deg');
      }
      const magnet = from.closest<HTMLElement>(MAGNET);
      if (magnet && !(to && magnet.contains(to))) magnet.style.translate = '';
    },
    {passive: true},
  );

  document.addEventListener('mouseleave', () => glow?.classList.remove('is-on'));
}

export function onRouteDidUpdate() {
  if (typeof window === 'undefined' || reduced()) return;
  boot();
  window.setTimeout(setupReveal, 80);
}
