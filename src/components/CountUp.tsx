import {useEffect, useRef, useState, type ReactNode} from 'react';

/**
 * Counts a number up when it first scrolls into view, then stops observing.
 *
 * Deliberately dependency-free and cheap: one shared IntersectionObserver per
 * instance, a single rAF loop that ends at the target, and an immediate bail-out
 * to the final value when the visitor prefers reduced motion. Digits are set in
 * tabular figures by the caller so the width does not jitter while counting.
 */

type Props = {
  /** Final value to land on. */
  to: number;
  /** Milliseconds for the whole run. */
  duration?: number;
  /** Rendered before the number, e.g. "<". */
  prefix?: string;
  /** Rendered after the number, e.g. "%" or "+". */
  suffix?: string;
  /** Insert thousands separators (2417 → 2,417). */
  group?: boolean;
  className?: string;
};

// easeOutExpo — fast start, long settle. Reads as "landing on" a figure.
const ease = (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function CountUp({
  to,
  duration = 1400,
  prefix = '',
  suffix = '',
  group = false,
  className,
}: Props): ReactNode {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to);
      return undefined;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || done.current) return;
          done.current = true;
          io.unobserve(entry.target);

          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            setValue(Math.round(ease(t) * to));
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        });
      },
      {threshold: 0.4},
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  const shown = group ? value.toLocaleString('en-US') : String(value);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
