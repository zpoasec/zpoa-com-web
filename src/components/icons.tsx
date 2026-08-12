import type {ReactNode} from 'react';

/**
 * Inline SVG icon set for the marketing pages.
 *
 * Replaces the previous single-letter avatars, which rendered Detect and
 * Discover as the same "D". All icons are stroke-based on a 24px grid and
 * inherit `currentColor`, so each module's tint comes from its wrapper class.
 */

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const paths: Record<string, ReactNode> = {
  // Detect — radar sweep
  detect: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.6" />
      <path d="M12 12 20 8.2" />
      <circle cx="16.4" cy="8.4" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  // Comply — checklist clipboard
  comply: (
    <>
      <path d="M9 4.5h6M9 4.5a1.5 1.5 0 0 0-1.5 1.5v.5h9V6A1.5 1.5 0 0 0 15 4.5" />
      <path d="M16.5 6.5h1.7A1.8 1.8 0 0 1 20 8.3v10A1.8 1.8 0 0 1 18.2 20H5.8A1.8 1.8 0 0 1 4 18.3v-10a1.8 1.8 0 0 1 1.8-1.8h1.7" />
      <path d="M8.4 12.2l1.6 1.6 3.4-3.4" />
      <path d="M8.4 17h7.2" />
    </>
  ),
  // Discover — magnifier over grid
  discover: (
    <>
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="M15.4 15.4 20 20" />
      <path d="M8.2 10.8h5.2M10.8 8.2v5.2" />
    </>
  ),
  // Armor — cloud shield
  armor: (
    <>
      <path d="M12 3.4 5.2 6v5.4c0 4.2 2.9 8.1 6.8 9.2 3.9-1.1 6.8-5 6.8-9.2V6z" />
      <path d="M9.2 12.1l2 2 3.6-3.8" />
    </>
  ),
  // Fortress — keyed identity
  fortress: (
    <>
      <circle cx="9.6" cy="8.6" r="3.4" />
      <path d="M3.8 19.4c0-3.1 2.6-5.4 5.8-5.4 1 0 2 .2 2.8.7" />
      <circle cx="16.6" cy="15.4" r="2.2" />
      <path d="M16.6 17.6V21M15.2 19.6h2.8" />
    </>
  ),
  // Monitor — activity on a screen
  monitor: (
    <>
      <rect x="3" y="4.6" width="18" height="12.4" rx="1.8" />
      <path d="M6.6 11.6l2.4-2.6 2.3 3 2-4 2.4 4.6" />
      <path d="M9.4 20.4h5.2M12 17v3.4" />
    </>
  ),
  // Neural Mesh — connected nodes
  neural: (
    <>
      <circle cx="12" cy="5.4" r="2.1" />
      <circle cx="5.4" cy="16.6" r="2.1" />
      <circle cx="18.6" cy="16.6" r="2.1" />
      <circle cx="12" cy="12" r="1.6" />
      <path d="M12 7.5v2.9M10.7 13.2 6.9 15.5M13.3 13.2l3.8 2.3M7.4 16.6h9.2" />
    </>
  ),
  // AI Security — shielded spark
  aisec: (
    <>
      <path d="M12 3.4 5.6 5.8v5.1c0 3.9 2.7 7.6 6.4 8.7 3.7-1.1 6.4-4.8 6.4-8.7V5.8z" />
      <path d="M12 8.2l1.1 2.4 2.4 1.1-2.4 1.1L12 15.2l-1.1-2.4L8.5 11.7l2.4-1.1z" />
    </>
  ),
};

export function ModuleIcon({name}: {name: string}): ReactNode {
  return <svg {...base}>{paths[name] ?? paths.detect}</svg>;
}

const problemPaths: Record<string, ReactNode> = {
  // Fragmented stack — disconnected layers
  stack: (
    <>
      <rect x="3.2" y="4" width="7" height="5.4" rx="1.2" />
      <rect x="13.8" y="4" width="7" height="5.4" rx="1.2" />
      <rect x="3.2" y="14.6" width="7" height="5.4" rx="1.2" />
      <rect x="13.8" y="14.6" width="7" height="5.4" rx="1.2" />
      <path d="M11.2 6.7h1.6M11.2 17.3h1.6M6.7 11.1v2.2M17.3 11.1v2.2" strokeDasharray="1.6 2" />
    </>
  ),
  // Machine identity — robot / token
  identity: (
    <>
      <rect x="4.4" y="7.6" width="15.2" height="11" rx="2.2" />
      <path d="M12 4v3.6" />
      <circle cx="12" cy="3.2" r="1.2" />
      <circle cx="9.2" cy="12.4" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="14.8" cy="12.4" r="1.1" fill="currentColor" stroke="none" />
      <path d="M9.4 15.6h5.2" />
    </>
  ),
  // Ungoverned AI — prompt leaving the perimeter
  ai: (
    <>
      <path d="M4 6.2h9.4M4 10.4h6.6M4 14.6h9.4" />
      <path d="M15.4 12.4h5M18.2 9.8l2.6 2.6-2.6 2.6" strokeDasharray="0" />
      <path d="M9 19.2h5.6" strokeDasharray="1.6 2" />
    </>
  ),
};

export function ProblemIcon({name}: {name: string}): ReactNode {
  return <svg {...base} width="22" height="22">{problemPaths[name] ?? problemPaths.stack}</svg>;
}

export function CheckIcon(): ReactNode {
  return (
    <svg {...base} width="15" height="15" strokeWidth={2.2}>
      <path d="M4.5 12.4l4.6 4.6L19.5 6.6" />
    </svg>
  );
}

export function Arrow(): ReactNode {
  return (
    <svg {...base} width="16" height="16" strokeWidth={2}>
      <path d="M4.5 12h14M13 6.5l5.5 5.5L13 17.5" />
    </svg>
  );
}
