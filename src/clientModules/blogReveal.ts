// Adds a gentle fade-up reveal to images and section headings inside blog posts.
// Uses IntersectionObserver for broad browser support.

const SELECTOR = 'article .markdown img, article .markdown h2, article .markdown h3';

function applyReveal() {
  if (typeof window === 'undefined') return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  const targets = document.querySelectorAll<HTMLElement>(SELECTOR);
  if (targets.length === 0) return;

  targets.forEach((el) => {
    if (el.dataset.zpoaReveal) return;
    el.dataset.zpoaReveal = '1';
    el.classList.add('zpoa-reveal');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('zpoa-reveal--visible');
        } else {
          entry.target.classList.remove('zpoa-reveal--visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -8% 0px' },
  );

  targets.forEach((el) => observer.observe(el));
}

export function onRouteDidUpdate() {
  setTimeout(applyReveal, 50);
}
