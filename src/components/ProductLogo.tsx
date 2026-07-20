import {type ReactNode, useState} from 'react';

// Prefer the PNG icon; fall back to the SVG until the PNG is added at
// static/img/products/zypher-logo.png
const PNG = '/img/products/zypher-logo.png';
const SVG = '/img/products/zypher-logo.svg';

export default function ProductLogo({
  className,
  size = 40,
  alt = '',
}: {
  className?: string;
  size?: number;
  alt?: string;
}): ReactNode {
  const [src, setSrc] = useState(PNG);
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      onError={() => {
        if (src !== SVG) setSrc(SVG);
      }}
    />
  );
}
