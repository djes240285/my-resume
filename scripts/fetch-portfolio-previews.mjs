#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'public', 'portfolio-previews');
const OUT_CONFIG = path.join(ROOT, 'src', 'config', 'portfolio-previews.ts');

/** Приоритетные проекты: сначала самые полезные для витрины */
const TARGETS = [
  { key: 'https://dostavka-zpr.ru/', slug: 'dostavka-zpr' },
  { key: 'https://krymresurs.ru/', slug: 'krymresurs' },
  { key: 'https://sechat.ru/', slug: 'sechat' },
  { key: 'https://mozgovnet.com/', slug: 'mozgovnet' },
  { key: 'https://biznesmashin.ru/', slug: 'biznesmashin' },
  { key: 'https://windowcleaner.com/', slug: 'windowcleaner' },
  { key: 'https://gratisiskolan.se/', slug: 'gratisiskolan' },
  { key: 'https://microline.ua/', slug: 'microline' },
  { key: 'https://www.turexpertiza.ru/', slug: 'kurortexpert' },
  { key: 'https://www.epik.com/', slug: 'epik' },
];

function normalizeUrl(input) {
  try {
    const u = new URL(input);
    u.hash = '';
    if (u.pathname !== '/' && u.pathname.endsWith('/')) u.pathname = u.pathname.slice(0, -1);
    return u.toString();
  } catch {
    return input;
  }
}

function screenshotProviders(url, width, height) {
  const encoded = encodeURIComponent(url);
  return [
    `https://image.thum.io/get/width/${width}/crop/${height}/noanimate/${encoded}`,
    `https://s.wordpress.com/mshots/v1/${encoded}?w=${width}&h=${height}`,
  ];
}

const PLACEHOLDER_HASHES = new Set([
  'e89e34619e53', // WordPress "Generating Preview..."
  'b0027413b956',
]);

function shortHash(buf) {
  return crypto.createHash('md5').update(buf).digest('hex').slice(0, 12);
}

function isLikelyPlaceholder(buf) {
  const h = shortHash(buf);
  return PLACEHOLDER_HASHES.has(h);
}

function readPngSize(buf) {
  if (buf.length < 24) return null;
  if (buf.toString('ascii', 1, 4) !== 'PNG') return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function readJpegSize(buf) {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = buf[i + 1];
    if (marker === 0xda || marker === 0xd9) break;
    const len = buf.readUInt16BE(i + 2);
    if (len < 2) break;
    const isSOF =
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf);
    if (isSOF && i + 8 < buf.length) {
      const height = buf.readUInt16BE(i + 5);
      const width = buf.readUInt16BE(i + 7);
      return { width, height };
    }
    i += 2 + len;
  }
  return null;
}

function readImageSize(buf, contentType) {
  if (contentType.includes('png')) return readPngSize(buf);
  if (contentType.includes('jpeg') || contentType.includes('jpg')) return readJpegSize(buf);
  const png = readPngSize(buf);
  if (png) return png;
  return readJpegSize(buf);
}

async function fetchImage(url) {
  const res = await fetch(url, {
    redirect: 'follow',
    headers: {
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    },
  });
  if (!res.ok) return null;
  const type = res.headers.get('content-type') || '';
  if (!type.startsWith('image/')) return null;
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8_000) return null;
  if (isLikelyPlaceholder(buf)) return null;
  const size = readImageSize(buf, type);
  if (!size) return null;
  const ext = type.includes('png') ? 'png' : 'jpg';
  return { buf, ext, ...size };
}

async function fetchHtml(url) {
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        accept: 'text/html,application/xhtml+xml',
      },
    });
    if (!res.ok) return '';
    const type = res.headers.get('content-type') || '';
    if (!type.includes('text/html')) return '';
    return await res.text();
  } catch {
    return '';
  }
}

function toAbs(base, href) {
  try {
    return new URL(href, base).toString();
  } catch {
    return null;
  }
}

function parseImageCandidates(html, baseUrl) {
  const out = [];
  const metaPatterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/gi,
    /<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/gi,
  ];
  for (const re of metaPatterns) {
    let m;
    while ((m = re.exec(html))) {
      const abs = toAbs(baseUrl, m[1]);
      if (abs) out.push(abs);
    }
  }
  const imgRe = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let count = 0;
  let m;
  while ((m = imgRe.exec(html)) && count < 8) {
    const abs = toAbs(baseUrl, m[1]);
    if (abs) {
      out.push(abs);
      count++;
    }
  }
  return [...new Set(out)];
}

async function ensureDir() {
  await fs.mkdir(OUT_DIR, { recursive: true });
}

async function run() {
  await ensureDir();
  await fs.rm(OUT_DIR, { recursive: true, force: true });
  await ensureDir();
  const map = {};
  for (const t of TARGETS) {
    const key = normalizeUrl(t.key);
    const slides = [];
    const html = await fetchHtml(key);
    const directCandidates = parseImageCandidates(html, key);

    // 1) Prefer real images from target website
    const realImages = [];
    for (const candidate of directCandidates) {
      try {
        const image = await fetchImage(candidate);
        if (!image) continue;
        realImages.push(image);
      } catch {
        // continue
      }
    }
    const selectedReal = realImages
      .filter((img) => img.width >= 580 && img.height >= 320 && img.width / img.height >= 1.2)
      .sort((a, b) => b.width * b.height - a.width * a.height)
      .slice(0, 3);
    for (let i = 0; i < selectedReal.length; i++) {
      const image = selectedReal[i];
      const file = `${t.slug}-${i + 1}.${image.ext}`;
      slides.push(`/portfolio-previews/${file}`);
      await fs.writeFile(path.join(OUT_DIR, file), image.buf);
    }

    // 2) Fallback to screenshot providers if still empty
    if (slides.length === 0) {
      const sizes = [
        [1280, 760],
        [980, 680],
        [760, 520],
      ];
      for (let i = 0; i < sizes.length; i++) {
        const [w, h] = sizes[i];
        for (const candidate of screenshotProviders(key, w, h)) {
          try {
            const image = await fetchImage(candidate);
            if (!image) continue;
            const file = `${t.slug}-${slides.length + 1}.${image.ext}`;
            await fs.writeFile(path.join(OUT_DIR, file), image.buf);
            slides.push(`/portfolio-previews/${file}`);
            break;
          } catch {
            // try next provider
          }
        }
      }
    }

    if (slides.length) map[key] = slides;
    console.log(`${t.slug}: ${slides.length ? `ok (${slides.length})` : 'no previews'}`);
  }

  const out = `/* AUTO-GENERATED by scripts/fetch-portfolio-previews.mjs */\n` +
    `export const PORTFOLIO_PREVIEWS: Record<string, string[]> = ${JSON.stringify(map, null, 2)};\n`;
  await fs.writeFile(OUT_CONFIG, out, 'utf8');
  console.log(`\nSaved config: ${path.relative(ROOT, OUT_CONFIG)}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

