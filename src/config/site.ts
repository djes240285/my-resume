import type { Lang } from '../i18n/cv-data';

/** Пункт «Резюме» в навигации и страница резюме на /{lang}/ — только в `astro dev`. */
export const SITE_SHOW_RESUME = import.meta.env.DEV;

export function siteHomeHref(lang: Lang): string {
  return `/${lang}/`;
}

/** URL раздела «Пульт»: в prod совпадает с главной, в dev — /mission. */
export function siteMissionHref(lang: Lang): string {
  return import.meta.env.PROD ? `/${lang}/` : `/${lang}/mission`;
}

export function isResumeRoute(pathname: string, lang: Lang): boolean {
  if (!SITE_SHOW_RESUME) return false;
  const base = `/${lang}`;
  return pathname === base || pathname === `${base}/`;
}

export function isMissionRoute(pathname: string, lang: Lang): boolean {
  if (pathname.includes('/mission')) return true;
  if (import.meta.env.PROD) {
    const base = `/${lang}`;
    return pathname === base || pathname === `${base}/`;
  }
  return false;
}
