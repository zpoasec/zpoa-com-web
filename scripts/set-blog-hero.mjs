#!/usr/bin/env node
/**
 * Install new blog hero images, resized and recompressed in one step.
 *
 * Save the three images anywhere (Downloads is fine), then run:
 *
 *   node scripts/set-blog-hero.mjs \
 *     client-to-site-vpn-remote-access-security=~/Downloads/client-to-site.png \
 *     remote-access-vpn-architecture-protocols=~/Downloads/remote-access.png \
 *     security-tools-dont-talk-to-each-other=~/Downloads/breach.png
 *
 * The left side is the post slug, which is also the directory under
 * static/img/blog/. Run with --list to print every slug the blog uses.
 *
 * Output is always written as hero.png at the existing path, because the posts
 * reference /img/blog/<slug>/hero.png directly in their markdown and in the
 * OG tags — renaming the file would break all of that.
 */
import {readFile, writeFile, readdir, stat} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {homedir} from 'node:os';
import {join, resolve} from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('../static/img/blog/', import.meta.url).pathname;
const MAX_W = 1400;         // widest the blog layout ever renders a hero
const expand = (p) => (p.startsWith('~') ? join(homedir(), p.slice(1)) : resolve(p));
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

const args = process.argv.slice(2);

if (args.includes('--list') || args.length === 0) {
  const dirs = (await readdir(ROOT, {withFileTypes: true}))
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
  console.log(`${dirs.length} blog image directories:\n`);
  for (const d of dirs) {
    const p = join(ROOT, d, 'hero.png');
    const size = existsSync(p) ? kb((await stat(p)).size) : 'no hero.png';
    console.log(`  ${d.padEnd(50)} ${size}`);
  }
  if (args.length === 0) {
    console.log('\nPass slug=path pairs to install. See the header of this file.');
  }
  process.exit(0);
}

let failed = false;

for (const arg of args) {
  const idx = arg.indexOf('=');
  if (idx < 0) {
    console.error(`skip: "${arg}" is not slug=path`);
    failed = true;
    continue;
  }

  const slug = arg.slice(0, idx);
  const src = expand(arg.slice(idx + 1));
  const dest = join(ROOT, slug, 'hero.png');

  if (!existsSync(src)) {
    console.error(`skip ${slug}: source not found — ${src}`);
    failed = true;
    continue;
  }
  if (!existsSync(join(ROOT, slug))) {
    console.error(`skip ${slug}: no such blog image directory. Run --list to see valid slugs.`);
    failed = true;
    continue;
  }

  const before = existsSync(dest) ? (await stat(dest)).size : 0;
  const buf = await readFile(src);
  const meta = await sharp(buf).metadata();

  const out = await sharp(buf)
    .resize({width: Math.min(MAX_W, meta.width ?? MAX_W), withoutEnlargement: true})
    .png({compressionLevel: 9, palette: true, quality: 90})
    .toBuffer();

  await writeFile(dest, out);
  console.log(
    `${slug}\n` +
    `    ${meta.width}x${meta.height} ${kb(buf.length)}  ->  ` +
    `${Math.min(MAX_W, meta.width ?? MAX_W)}px ${kb(out.length)}` +
    (before ? `   (replaced ${kb(before)})` : ''),
  );
}

process.exit(failed ? 1 : 0);
