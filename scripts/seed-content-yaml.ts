/**
 * Экспорт контактов и mission control в YAML (для первичного seed или бэкапа).
 * Mission control: копирует текущий YAML (entries case log не хранятся в файле).
 * Contacts: из getCv (читает YAML) — полезно после правок в TS-обёртках.
 * bun run scripts/seed-content-yaml.ts
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { stringify } from 'yaml';
import type { Lang } from '../src/i18n/cv-data';
import { getCv } from '../src/i18n/cv-data';
import { getMissionControl } from '../src/i18n/mission-control-data';

const root = path.join(import.meta.dir, '..');
const langs: Lang[] = ['ru', 'en'];

for (const lang of langs) {
  const contactDir = path.join(root, 'src/content/contact');
  mkdirSync(contactDir, { recursive: true });
  writeFileSync(
    path.join(contactDir, `${lang}.yaml`),
    stringify(getCv(lang).contact, { lineWidth: 0 }),
  );

  const mc = getMissionControl(lang);
  const { entries: _entries, ...caseLogRest } = mc.caseLog;
  const missionDir = path.join(root, 'src/content/mission-control');
  mkdirSync(missionDir, { recursive: true });
  writeFileSync(
    path.join(missionDir, `${lang}.yaml`),
    stringify({ ...mc, caseLog: caseLogRest }, { lineWidth: 0 }),
  );
}

console.log('Content YAML seeded under src/content/{contact,mission-control}/');
