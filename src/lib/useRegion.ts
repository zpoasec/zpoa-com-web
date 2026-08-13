import {useEffect, useState} from 'react';
import {DEFAULT_REGION, resolveRegion, byCode, type Region} from './region';

/**
 * Current region, kept in sync across every component that uses it.
 *
 * Starts at DEFAULT_REGION on purpose. The site is pre-rendered, so the server
 * HTML always contains USD; detecting during render would make the first
 * client render disagree with that markup and trigger a hydration mismatch.
 * Instead the real region is resolved in an effect, after hydration, and the
 * prices swap on the next paint.
 *
 * `ready` tells a caller whether the value is still the SSR placeholder, so a
 * price can be held back for one frame rather than visibly flipping currency.
 */
export function useRegion(): {region: Region; ready: boolean; setRegion: (code: string) => void} {
  const [region, setRegionState] = useState<Region>(DEFAULT_REGION);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setRegionState(resolveRegion());
    setReady(true);

    // Another component (the navbar picker) changed it.
    const onPick = (e: Event) => {
      const code = (e as CustomEvent<string>).detail;
      const next = byCode(code);
      if (next) setRegionState(next);
    };
    // Changed in another tab.
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'zpoa.region') setRegionState(resolveRegion());
    };

    window.addEventListener('zpoa:region', onPick);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('zpoa:region', onPick);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return {
    region,
    ready,
    setRegion: (code: string) => {
      const next = byCode(code);
      if (!next) return;
      setRegionState(next);
      // storeRegion dispatches zpoa:region, which updates every other consumer.
      void import('./region').then((m) => m.storeRegion(code));
    },
  };
}
