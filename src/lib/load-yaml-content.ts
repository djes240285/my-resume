import { readFileSync } from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';
import type { Lang } from '../i18n/cv-data';

const cache = new Map<string, unknown>();

function readYamlFile<T>(relativePath: string): T {
  const abs = path.join(process.cwd(), relativePath);
  const cached = cache.get(abs);
  if (cached) return cached as T;

  const raw = readFileSync(abs, 'utf8');
  const data = parse(raw) as T;
  cache.set(abs, data);
  return data;
}

export function loadYamlContent<T>(relativePath: string): T {
  return readYamlFile<T>(relativePath);
}

export function loadLangYaml<T>(baseDir: string, lang: Lang): T {
  return readYamlFile<T>(`${baseDir}/${lang}.yaml`);
}
