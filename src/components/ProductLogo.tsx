import {type ReactNode, useState} from 'react';

// Prefer each product's PNG icon; fall back to its SVG if the PNG is missing.
// Typed as plain `string` (not `as const`) so identical png/svg paths, like
// health's below, don't collapse the per-key literal union in a way that
// breaks the setSrc(svg) fallback's type.
const LOGOS: Record<'vpn' | 'capital' | 'health', {png: string; svg: string}> = {
  vpn: {
    png: '/img/products/zypher-logo.png',
    svg: '/img/products/zypher-logo.svg',
  },
  capital: {
    png: '/img/products/capital-logo.png',
    svg: '/img/products/capital-logo.png',
  },
  health: {
    png: '/img/products/health-logo.png',
    svg: '/img/products/health-logo.png',
  },
};

export default function ProductLogo({
  product = 'vpn',
  className,
  size = 40,
  alt = '',
}: {
  product?: keyof typeof LOGOS;
  className?: string;
  size?: number;
  alt?: string;
}): ReactNode {
  const {png, svg} = LOGOS[product];
  const [src, setSrc] = useState(png);
  return (
    <img
      key={product}
      className={className}
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      onError={() => {
        if (src !== svg) setSrc(svg);
      }}
    />
  );
}
