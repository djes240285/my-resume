import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const nm = path.join(root, 'node_modules');

if (fs.lstatSync(nm).isSymbolicLink()) {
  console.error(
    '[dev] node_modules — симлинк (часто битый кэш). Удалите и переустановите:\n' +
      '  rm node_modules && bun install',
  );
  process.exit(1);
}

const ver = process.versions.node;
const [major, minor] = ver.split('.').map((n) => Number(n) || 0);
if (major < 22 || (major === 22 && minor < 12)) {
  console.error(
    `[dev] Node ${ver} — для Astro нужен >=22.12.\n` +
      '  nvm install 22.12.0 && nvm use\n' +
      '  node -v   # проверка\n' +
      '  bun run dev',
  );
  process.exit(1);
}

const astro = path.join(root, 'node_modules/astro/bin/astro.mjs');
const r = spawnSync(process.execPath, [astro, 'dev'], {
  cwd: root,
  stdio: 'inherit',
  env: process.env,
});
process.exit(r.status ?? 1);
