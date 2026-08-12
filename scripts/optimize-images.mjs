#!/usr/bin/env node
/**
 * Resize and recompress oversized raster assets in static/img.
 *
 * The logo shipped at 1062x474 and 277 KB while the navbar renders it 40px tall
 * and the footer 160px wide — it was the heaviest asset on every page of the
 * site. Blog hero PNGs ran up to 1.8 MB each.
 *
 * Run:  node scripts/optimize-images.mjs [--apply]
 * Without --apply it reports what it would do and changes nothing.
 */
import {readdir, stat, readFile, writeFile} from 'node:fs/promises';
import {join, extname, basename} from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('../static/img/', import.meta.url).pathname;
const APPLY = process.argv.includes('--apply');

// Cap width by role. Navbar/footer marks never need more than 2x their render size.
const RULES = [
  {match: /^logo\.png$/, width: 320, fmt: 'png'},
  {match: /^logo-footer\.png$/, width: 420, fmt: 'png'},
  {match: /^logo-footer-white\.png$/, width: 400, fmt: 'png'},
  {match: /^favicon-192\.png$/, width: 192, fmt: 'png'},
  {match: /^favicon\.png$/, width: 180, fmt: 'png'},
  // Blog + feature art is displayed at most ~1200px wide on this layout.
  // Formats are preserved in place: switching these to .webp would rename the
  // file and break every reference in the pages, blog front-matter, and OG tags.
  // Converting to WebP is worth doing later, together with those updates.
  {match: /hero\.png$/i, width: 1400, fmt: 'png'},
  {match: /\.(jpg|jpeg)$/i, width: 1400, fmt: 'jpg'},
];

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, {withFileTypes: true})) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const files = await walk(ROOT);
let before = 0;
let after = 0;
let touched = 0;

for (const file of files) {
  const name = basename(file);
  const ext = extname(file).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

  const rule = RULES.find((r) => r.match.test(name));
  if (!rule) continue;

  const buf = await readFile(file);
  const meta = await sharp(buf).metadata();
  const targetW = Math.min(rule.width, meta.width ?? rule.width);

  let pipeline = sharp(buf).resize({width: targetW, withoutEnlargement: true});
  let outPath = file;

  if (rule.fmt === 'jpg') {
    pipeline = pipeline.jpeg({quality: 80, mozjpeg: true, progressive: true});
  } else {
    // palette:true lets pngquant-style quantisation kick in; these are flat logos.
    pipeline = pipeline.png({compressionLevel: 9, palette: true, quality: 90});
  }

  const out = await pipeline.toBuffer();

  // Never write a result that is not actually smaller.
  if (out.length >= buf.length && outPath === file) continue;

  before += buf.length;
  after += out.length;
  touched += 1;

  const rel = file.replace(ROOT, '');
  const arrow = outPath === file ? '' : ` → ${basename(outPath)}`;
  console.log(
    `${APPLY ? 'wrote' : 'would'}  ${rel}${arrow}\n` +
    `        ${meta.width}x${meta.height} ${kb(buf.length)}  →  ${targetW}px ${kb(out.length)}` +
    `  (-${(100 - (out.length / buf.length) * 100).toFixed(0)}%)`,
  );

  if (APPLY) await writeFile(outPath, out);
}

console.log(
  `\n${touched} file(s). ${kb(before)} → ${kb(after)} ` +
  `(saves ${kb(before - after)}, -${before ? (100 - (after / before) * 100).toFixed(0) : 0}%)`,
);
if (!APPLY) console.log('Dry run. Re-run with --apply to write.');
