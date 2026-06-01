import type { Lang } from '../i18n/cv-data';

export function contactYamlPath(lang: Lang): string {
  return `src/content/contact/${lang}.yaml`;
}

export function missionControlYamlPath(lang: Lang): string {
  return `src/content/mission-control/${lang}.yaml`;
}
