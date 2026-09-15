import {type ReactNode, useState} from 'react';

// Prefer each product's PNG icon; fall back to its SVG if the PNG is missing.
const LOGOS = {
  vpn: {
    png: '/img/products/zypher-logo.png',
    svg: '/img/products/zypher-logo.svg',
  },
  capital: {
    png: '/img/products/capital-logo.png',
    svg: '/img/products/capital-logo.svg',
  },
} as const;

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
