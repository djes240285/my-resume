// @ts-check
import path from 'node:path';
import { homedir } from 'node:os';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

/** Вне Nextcloud: иначе pre-bundle (`deps_temp_*`) часто залипает на синхронизации/I-O в `node_modules/.vite`. */
const viteCacheDir = path.join(homedir(), '.cache', 'ezhukov-site-vite');

// https://astro.build/config
export default defineConfig({
  vite: {
    cacheDir: viteCacheDir,
    plugins: [tailwindcss()]
  }
});