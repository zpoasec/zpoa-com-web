import {useEffect, useRef, useState, type ReactNode} from 'react';

/**
 * Types Zara prompts in and out, one after another.
 *
 * The prompts are the ones the shipping Command Center actually suggests, so
 * the animation demonstrates the product's own vocabulary rather than inventing
 * questions it cannot answer.
 *
 * Kept cheap and well-behaved:
 *   - a single chained setTimeout, never a per-frame loop
 *   - pauses entirely while scrolled out of view, so an idle background tab
 *     is not re-rendering a string forever
 *   - honours prefers-reduced-motion by showing the first prompt statically
 *   - starts from the first prompt fully typed, so server-rendered markup and
 *     the first client paint agree
 */

const PROMPTS = [
  'What SOC 2 controls are failing?',
  'Show critical alerts from the last 24h',
  'List orphaned service accounts',
  'What is my attack surface?',
  'Find cloud misconfigurations',
];

const TYPE_MS = 55;   // per character while typing
const ERASE_MS = 25;  // per character while erasing
const HOLD_MS = 2000; // pause on a finished prompt
const GAP_MS = 350;   // pause after erasing, before the next prompt

export default function TypingPrompt(): ReactNode {
  const [text, setText] = useState(PROMPTS[0]);
  const ref = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const el = ref.current;
    if (!el) return undefined;

    let index = 0;
    let chars = PROMPTS[0].length;
    let erasing = false;
    let visible = false;
    let stopped = false;

    const tick = () => {
      if (stopped) return;
      if (!visible) {
        // Off-screen: check back occasionally rather than animating.
        timer.current = setTimeout(tick, 400);
        return;
      }

      const prompt = PROMPTS[index];

      if (!erasing) {
        if (chars < prompt.length) {
          chars += 1;
          setText(prompt.slice(0, chars));
          timer.current = setTimeout(tick, TYPE_MS);
        } else {
          erasing = true;
          timer.current = setTimeout(tick, HOLD_MS);
        }
        return;
      }

      if (chars > 0) {
        chars -= 1;
        setText(prompt.slice(0, chars));
        timer.current = setTimeout(tick, ERASE_MS);
      } else {
        erasing = false;
        index = (index + 1) % PROMPTS.length;
        timer.current = setTimeout(tick, GAP_MS);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      {threshold: 0.2},
    );
    io.observe(el);

    timer.current = setTimeout(tick, HOLD_MS);

    return () => {
      stopped = true;
      io.disconnect();
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <>
      <span ref={ref}>{text}</span>
      <span className="zs-caret" aria-hidden="true" />
    </>
  );
}
