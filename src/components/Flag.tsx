import type {ReactNode} from 'react';

/**
 * Inline SVG flags.
 *
 * Emoji flags are not an option: Windows ships no glyphs for them. Segoe UI
 * Emoji deliberately omits country flags, so a browser there falls back to
 * rendering the two regional-indicator letters as plain text — 🇮🇳 becomes
 * "IN", which next to a country code produced a chip reading "IN IN".
 *
 * These are deliberately coarse. At 16px the detail in a maple leaf or a
 * chakra is invisible; what identifies a flag at that size is the arrangement
 * of colour, so each is reduced to its blocks plus one recognisable mark.
 */

const W = 21;
const H = 15;

const FLAGS: Record<string, ReactNode> = {
  US: (
    <>
      <rect width={W} height={H} fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={i * (H / 13)} width={W} height={H / 13} fill="#B22234" />
      ))}
      <rect width={W * 0.42} height={H * 0.54} fill="#3C3B6E" />
    </>
  ),
  IN: (
    <>
      <rect width={W} height={H / 3} fill="#FF9933" />
      <rect y={H / 3} width={W} height={H / 3} fill="#fff" />
      <rect y={(H / 3) * 2} width={W} height={H / 3} fill="#138808" />
      <circle cx={W / 2} cy={H / 2} r={H / 7} fill="none" stroke="#000080" strokeWidth="1.1" />
    </>
  ),
  GB: (
    <>
      <rect width={W} height={H} fill="#012169" />
      <path d={`M0,0 L${W},${H} M${W},0 L0,${H}`} stroke="#fff" strokeWidth="3" />
      <path d={`M0,0 L${W},${H} M${W},0 L0,${H}`} stroke="#C8102E" strokeWidth="1.4" />
      <path d={`M${W / 2},0 V${H} M0,${H / 2} H${W}`} stroke="#fff" strokeWidth="5" />
      <path d={`M${W / 2},0 V${H} M0,${H / 2} H${W}`} stroke="#C8102E" strokeWidth="2.6" />
    </>
  ),
  EU: (
    <>
      <rect width={W} height={H} fill="#003399" />
      {Array.from({length: 12}, (_, i) => {
        const a = (i * Math.PI) / 6;
        return (
          <circle
            key={i}
            cx={W / 2 + Math.sin(a) * (H * 0.28)}
            cy={H / 2 - Math.cos(a) * (H * 0.28)}
            r="0.85"
            fill="#FFCC00"
          />
        );
      })}
    </>
  ),
  CA: (
    <>
      <rect width={W} height={H} fill="#fff" />
      <rect width={W / 4} height={H} fill="#D80621" />
      <rect x={(W / 4) * 3} width={W / 4} height={H} fill="#D80621" />
      <path
        d={`M${W / 2},${H * 0.24} l1.5,3 2-0.7 -0.9,3.1 2.3-0.4 -0.7,1.4 2.1,1.5
            -1.1,0.7 0.6,1.9 -3.2-0.7 -0.3,3h-1.2l-0.3-3 -3.2,0.7 0.6-1.9 -1.1-0.7
            2.1-1.5 -0.7-1.4 2.3,0.4 -0.9-3.1 2,0.7z`}
        fill="#D80621"
        transform={`translate(${-W * 0.02},0) scale(0.72) translate(${W * 0.19},${H * 0.16})`}
      />
    </>
  ),
  AU: (
    <>
      <rect width={W} height={H} fill="#012169" />
      <rect width={W * 0.44} height={H * 0.5} fill="#012169" />
      <path d={`M0,0 L${W * 0.44},${H * 0.5} M${W * 0.44},0 L0,${H * 0.5}`} stroke="#fff" strokeWidth="1.6" />
      <path d={`M${W * 0.22},0 V${H * 0.5} M0,${H * 0.25} H${W * 0.44}`} stroke="#fff" strokeWidth="2.4" />
      <path d={`M${W * 0.22},0 V${H * 0.5} M0,${H * 0.25} H${W * 0.44}`} stroke="#C8102E" strokeWidth="1.2" />
      <circle cx={W * 0.22} cy={H * 0.82} r="1.5" fill="#fff" />
      <circle cx={W * 0.72} cy={H * 0.26} r="1" fill="#fff" />
      <circle cx={W * 0.82} cy={H * 0.55} r="1" fill="#fff" />
      <circle cx={W * 0.65} cy={H * 0.7} r="0.9" fill="#fff" />
      <circle cx={W * 0.88} cy={H * 0.82} r="0.9" fill="#fff" />
    </>
  ),
  SG: (
    <>
      <rect width={W} height={H} fill="#fff" />
      <rect width={W} height={H / 2} fill="#ED2939" />
      <circle cx={W * 0.24} cy={H * 0.25} r={H * 0.19} fill="#fff" />
      <circle cx={W * 0.32} cy={H * 0.25} r={H * 0.19} fill="#ED2939" />
      {[[0.4, 0.14], [0.46, 0.26], [0.4, 0.38], [0.33, 0.32], [0.33, 0.2]].map(([x, y], i) => (
        <circle key={i} cx={W * x} cy={H * y} r="0.7" fill="#fff" />
      ))}
    </>
  ),
  AE: (
    <>
      <rect width={W} height={H / 3} fill="#00732F" />
      <rect y={H / 3} width={W} height={H / 3} fill="#fff" />
      <rect y={(H / 3) * 2} width={W} height={H / 3} fill="#000" />
      <rect width={W * 0.28} height={H} fill="#FF0000" />
    </>
  ),
};

export default function Flag({code, className}: {code: string; className?: string}): ReactNode {
  const art = FLAGS[code];
  if (!art) return null;
  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      role="img"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice">
      {art}
      {/* A hairline keeps a white-edged flag from bleeding into a light navbar. */}
      <rect width={W} height={H} fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
    </svg>
  );
}
