/**
 * Reading-position meter under the navbar.
 *
 * The site hides its scrollbars, so this is the only remaining cue for how far
 * down a page the reader is. Kept deliberately cheap:
 *   - one passive scroll listener, coalesced through requestAnimationFrame
 *   - writes only `transform: scaleX()`, which the compositor handles without
 *     layout or paint
 *   - no work at all on pages too short to scroll
 */

let bar: HTMLElement | null = null;
let ticking = false;

function ensureBar(): HTMLElement {
  let el = document.getElementById('zs-progress') as HTMLElement | null;
  if (!el) {
    el = document.createElement('div');
    el.id = 'zs-progress';
    el.className = 'zs-progress';
    el.setAttribute('role', 'presentation');
    document.body.appendChild(el);
  }
  return el;
}

function update() {
  ticking = false;
  if (!bar) return;

  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - doc.clientHeight;

  // Short page: nothing to indicate.
  if (scrollable < 80) {
    bar.style.transform = 'scaleX(0)';
    return;
  }

  const ratio = Math.min(Math.max(doc.scrollTop / scrollable, 0), 1);
  bar.style.transform = `scaleX(${ratio})`;
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(update);
}

export function onRouteDidUpdate() {
  if (typeof window === 'undefined') return;

  bar = ensureBar();

  window.removeEventListener('scroll', onScroll);
  window.addEventListener('scroll', onScroll, {passive: true});
  window.removeEventListener('resize', onScroll);
  window.addEventListener('resize', onScroll, {passive: true});

  // Reset immediately on navigation, then measure once the new route paints.
  bar.style.transform = 'scaleX(0)';
  requestAnimationFrame(update);
}
