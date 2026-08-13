import {useCallback, useEffect, useRef, useState} from 'react';

/**
 * Auto-advancing index for the product mockups.
 *
 * Replaces a hand-rolled `paused` flag that latched: hovering set paused, and
 * `onBlurCapture` was expected to clear it, but clicking a tab moves focus
 * *into* the component, so blur never fired and rotation stopped permanently
 * after the first interaction.
 *
 * Here interaction only ever delays the next advance. Hover holds it for as
 * long as the pointer is inside; a click or key press holds it for `cooldown`
 * and then it resumes on its own. Nothing can stop it indefinitely.
 *
 * Rotation also only runs while the component is on screen, so an idle tab is
 * not re-rendering forever.
 */
export function useAutoRotate(
  count: number,
  intervalMs: number,
  cooldownMs = 15000,
): {
  index: number;
  setIndex: (i: number) => void;
  /** True while rotation is being held by hover or a recent interaction. */
  held: boolean;
  /** Spread onto the element that should hold rotation while in use. */
  holdProps: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onPointerDown: () => void;
    onKeyDown: () => void;
  };
  /** Ref for the element whose visibility gates rotation. */
  ref: React.RefObject<HTMLDivElement | null>;
} {
  const [index, setIndexState] = useState(0);
  // `held` is state, not a ref, because the progress indicator renders from it.
  const [held, setHeld] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const resumeAt = useRef(0);
  const inView = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([e]) => { inView.current = e.isIntersecting; },
      {threshold: 0.2},
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (count < 2) return undefined;
    const t = setInterval(() => {
      if (!inView.current) return;          // off screen
      if (hovering.current) return;         // pointer is inside
      if (Date.now() < resumeAt.current) return; // recently clicked
      setIndexState((i) => (i + 1) % count);
    }, intervalMs);
    return () => clearInterval(t);
  }, [count, intervalMs]);

  // Any deliberate interaction delays the next advance rather than stopping it.
  const defer = useCallback(() => {
    resumeAt.current = Date.now() + cooldownMs;
    setHeld(true);
    setTimeout(() => setHeld(false), cooldownMs);
  }, [cooldownMs]);

  const setIndex = useCallback((i: number) => {
    defer();
    setIndexState(i);
  }, [defer]);

  return {
    index,
    setIndex,
    held,
    ref,
    holdProps: {
      onMouseEnter: () => { hovering.current = true; setHeld(true); },
      onMouseLeave: () => {
        hovering.current = false;
        if (Date.now() >= resumeAt.current) setHeld(false);
      },
      onPointerDown: defer,
      onKeyDown: defer,
    },
  };
}
