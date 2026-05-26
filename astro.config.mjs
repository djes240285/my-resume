// @ts-check
import path from 'node:path';
import { homedir } from 'node:os';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

/** Вне Nextcloud: иначе pre-bundle (`deps_temp_*`) часто залипает на синхронизации/I-O в `node_modules/.vite`. */
const viteCacheDir = path.join(homedir(), '.cache', 'ezhukov-site-vite');

/** Netlify задаёт URL при CI-сборке; fallback — prod-домен (не localhost). */
const site =
  process.env.URL ||
  process.env.SITE_URL ||
  process.env.PUBLIC_SITE_URL ||
  'https://eugene-zhukov.netlify.app';

// https://astro.build/config
export default defineConfig({
  site,
  vite: {
    cacheDir: viteCacheDir,
    plugins: [tailwindcss()]
  }
});