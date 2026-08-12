#!/usr/bin/env node
/**
 * Generate the Open Graph / Twitter social card.
 *
 * themeConfig.image previously pointed at img/logo.png. That was acceptable
 * while the logo was 1062x474, but the image-optimisation pass resized it to
 * 320x143 for its actual render size (40px tall in the navbar) — which left
 * every shared link rendering a tiny logo inside a 1200x630
 * `summary_large_image` card.
 *
 * This builds a purpose-made 1200x630 card instead, so the logo can stay small.
 *
 * Run: node scripts/make-og-image.mjs [path/to/full-res-logo.png]
 */
import {writeFile, readFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import sharp from 'sharp';

const OUT = new URL('../static/img/og-card.png', import.meta.url).pathname;
const LOGO = process.argv[2] ?? new URL('../static/img/logo.png', import.meta.url).pathname;

const W = 1200;
const H = 630;

// Matches the site's hero: violet through deep navy, with the cyan accent.
const background = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"  stop-color="#131A2E"/>
      <stop offset="55%" stop-color="#0F1526"/>
      <stop offset="100%" stop-color="#0A0E1A"/>
    </linearGradient>
    <radialGradient id="v" cx="14%" cy="0%" r="70%">
      <stop offset="0%"   stop-color="#6D4AFF" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="#6D4AFF" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="c" cx="92%" cy="14%" r="60%">
      <stop offset="0%"   stop-color="#22D3EE" stop-opacity="0.26"/>
      <stop offset="100%" stop-color="#22D3EE" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#22D3EE"/>
      <stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0v48" fill="none" stroke="#ffffff" stroke-opacity="0.035" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#v)"/>
  <rect width="${W}" height="${H}" fill="url(#c)"/>

  <!-- accent rule under the wordmark -->
  <rect x="80" y="330" width="132" height="5" rx="2.5" fill="url(#accent)"/>

  <text x="80" y="412" font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="56" font-weight="800" fill="#FFFFFF" letter-spacing="-1.6">
    Nine security modules.
  </text>
  <text x="80" y="482" font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="56" font-weight="800" fill="#A78BFA" letter-spacing="-1.6">
    One correlated picture.
  </text>

  <text x="80" y="546" font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="25" font-weight="500" fill="#93A2BE">
    SIEM · Identity governance · Cloud posture · Insider risk · AI security
  </text>

  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="url(#accent)"/>
</svg>`);

if (!existsSync(LOGO)) {
  console.error(`logo not found: ${LOGO}`);
  process.exit(1);
}

const logo = await sharp(await readFile(LOGO))
  .resize({width: 300, withoutEnlargement: false})
  .png()
  .toBuffer();

const out = await sharp(background)
  .composite([{input: logo, top: 84, left: 80}])
  .png({compressionLevel: 9})
  .toBuffer();

await writeFile(OUT, out);
const meta = await sharp(out).metadata();
console.log(`wrote static/img/og-card.png  ${meta.width}x${meta.height}  ${(out.length / 1024).toFixed(0)} KB`);
