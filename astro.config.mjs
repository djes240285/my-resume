// @ts-check
import path from 'node:path';
import { homedir } from 'node:os';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';

/** Keystatic — только dev; на Netlify (production build) не подключаем. */
const isProdBuild = process.env.NODE_ENV === 'production';

/** Кэш Vite вне Nextcloud (ускоряет pre-bundle). */
const viteCacheDir = path.join(homedir(), '.cache', 'ezhukov-site-vite');

const site =
  process.env.URL ||
  process.env.SITE_URL ||
  process.env.PUBLIC_SITE_URL ||
  'https://eugene-zhukov.netlify.app';

export default defineConfig({
  site,
  integrations: [react(), ...(isProdBuild ? [] : [keystatic()])],
  vite: {
    cacheDir: viteCacheDir,
    plugins: [tailwindcss()],
  },
});
