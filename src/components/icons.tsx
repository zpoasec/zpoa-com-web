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
  // Zypher VPN — shielded mesh of peers
  vpn: (
    <>
      <path d="M12 3.2 5.4 5.6v5.2c0 4 2.8 7.8 6.6 8.9 3.8-1.1 6.6-4.9 6.6-8.9V5.6z" />
      <circle cx="12" cy="9.1" r="1.5" />
      <circle cx="9.1" cy="14" r="1.3" />
      <circle cx="14.9" cy="14" r="1.3" />
      <path d="M11.2 10.4 9.8 12.8M12.8 10.4l1.4 2.4M10.4 14h3.2" />
    </>
  ),
  // Service Hub — catalogue tiles with a request arrow
  svchub: (
    <>
      <rect x="3.6" y="4.2" width="6.4" height="6" rx="1.2" />
      <rect x="14" y="4.2" width="6.4" height="6" rx="1.2" />
      <rect x="3.6" y="13.8" width="6.4" height="6" rx="1.2" />
      <path d="M14.4 16.8h5.6M17.6 14.4l2.4 2.4-2.4 2.4" />
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

/**
 * Workspace activity-bar icons.
 *
 * Path data copied verbatim from the shipping extension
 * (zpoa-workspace-extension/resources/icons/*.svg) so the marketing mockup shows
 * the same rail a user sees in the product, not an approximation of it.
 */
const railPaths: Record<string, {fill?: boolean; d: ReactNode}> = {
  zara: {
    d: (
      <>
        <path
          d="M6 4.5h11A2.5 2.5 0 0 1 19.5 7v5a2.5 2.5 0 0 1-2.5 2.5h-5.6L7 18v-3.5H6A2.5 2.5 0 0 1 3.5 12V7A2.5 2.5 0 0 1 6 4.5Z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"
        />
        <path d="M11.5 6.56 12.26 8.74 14.44 9.5 12.26 10.26 11.5 12.44 10.74 10.26 8.56 9.5 10.74 8.74Z" fill="currentColor" />
      </>
    ),
  },
  command: {
    fill: true,
    d: <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4zm0 2.18l6 3v4.82c0 4.31-2.91 8.4-6 9.74-3.09-1.34-6-5.43-6-9.74V7.18l6-3zM11 7v4H7v2h4v4h2v-4h4v-2h-4V7h-2z" />,
  },
  entities: {
    fill: true,
    d: <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />,
  },
  connectivity: {
    d: (
      <>
        <path d="M6.5 6.5h11M6.5 17.5h11M6.5 6.5v11M17.5 6.5v11M6.5 6.5l11 11M17.5 6.5l-11 11"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <circle cx="6.5" cy="6.5" r="2.3" fill="currentColor" />
        <circle cx="17.5" cy="6.5" r="2.3" fill="currentColor" />
        <circle cx="6.5" cy="17.5" r="2.3" fill="currentColor" />
        <circle cx="17.5" cy="17.5" r="2.3" fill="currentColor" />
      </>
    ),
  },
  operations: {
    fill: true,
    d: <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm0-14a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm1-4a1 1 0 1 1-1-1 1 1 0 0 1 1 1zM11 1h2v3h-2zm0 19h2v3h-2zM1 11h3v2H1zm19 0h3v2h-3z" />,
  },
  governance: {
    fill: true,
    d: <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />,
  },
  intelligence: {
    fill: true,
    d: <path d="M21 11.5c0-4.42-3.58-8-8-8-1.85 0-3.55.63-4.91 1.69L9.5 6.6c1-.69 2.21-1.1 3.5-1.1 3.31 0 6 2.69 6 6s-2.69 6-6 6c-1.29 0-2.5-.41-3.5-1.1l-1.41 1.41C9.45 18.87 11.15 19.5 13 19.5c4.42 0 8-3.58 8-8zM12 7v5l4.28 2.54.72-1.21-3.5-2.08V7H12zM5 11l-3 3 3 3v-2h4v-2H5v-2z" />,
  },
  compute: {
    d: (
      <>
        <rect x="6" y="6" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <rect x="9" y="9" width="6" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <path d="M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3"
          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  portal: {
    fill: true,
    d: <path d="M10 2h4a2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4V4a2 2 0 0 1 2-2zm0 4h4V4h-4v2zm-6 6v8h16v-8h-5v2h-2v-2H9v2H7v-2H4zm0-4v2h16V8H4z" />,
  },
  agents: {
    fill: true,
    d: (
      <>
        <path d="M21 2H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6v2H6v2h12v-2h-3v-2h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 14H3V4h18v12z" />
        <circle cx="12" cy="10" r="2.3" />
        <circle cx="18.5" cy="6.2" r="0.9" />
      </>
    ),
  },
  connectors: {
    fill: true,
    d: <path d="M14.83 2.17a1 1 0 0 0-1.41 0l-2.12 2.12a1 1 0 0 0 0 1.42l.7.7-3.53 3.54-.71-.71a1 1 0 0 0-1.42 0L4.22 11.4a1 1 0 0 0 0 1.41l2.12 2.12-3.71 3.71a1 1 0 1 0 1.42 1.42l3.71-3.71 2.12 2.12a1 1 0 0 0 1.41 0l2.12-2.12a1 1 0 0 0 0-1.41l-.7-.71 3.53-3.53.71.7a1 1 0 0 0 1.42 0l2.12-2.12a1 1 0 0 0 0-1.41l-2.12-2.12 3.71-3.71a1 1 0 0 0-1.42-1.42L17.66 5.7z" />,
  },
  settings: {
    fill: true,
    d: (
      <>
        <path d="M19.14 12.94a7.65 7.65 0 0 0 0-1.88l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.52 7.52 0 0 0-1.62-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42l-.36 2.54a7.52 7.52 0 0 0-1.62.94l-2.39-.96a.5.5 0 0 0-.6.22L2.71 8.84a.5.5 0 0 0 .12.64l2.03 1.58a7.65 7.65 0 0 0 0 1.88l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32a.5.5 0 0 0 .6.22l2.39-.96c.5.38 1.04.7 1.62.94l.36 2.54a.5.5 0 0 0 .5.42h3.84a.5.5 0 0 0 .5-.42l.36-2.54c.58-.24 1.12-.56 1.62-.94l2.39.96a.5.5 0 0 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64z" />
        <circle cx="12" cy="12" r="2.6" fill="var(--zs-ink, #0C1120)" />
      </>
    ),
  },
};

// Account sits above Settings in the bottom-pinned group, as in the shell.
railPaths.account = {
  d: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <circle cx="12" cy="10" r="3.1" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M6.3 19.2a6.2 6.2 0 0 1 11.4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </>
  ),
};

export const RAIL_ORDER = [
  'zara', 'command', 'entities', 'connectivity', 'operations',
  'governance', 'intelligence', 'compute', 'portal', 'agents',
] as const;

export const RAIL_BOTTOM = ['account', 'settings'] as const;

export function RailIcon({name}: {name: string}): ReactNode {
  const icon = railPaths[name];
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill={icon.fill ? 'currentColor' : 'none'} aria-hidden="true">
      {icon.d}
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
