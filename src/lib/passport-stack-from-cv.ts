import type { Lang } from '../i18n/cv-data';
import { getCv } from '../i18n/cv-data';

export type PassportContour = 'backend' | 'frontend' | 'ai';

const LANE_TITLES: Record<Lang, Record<PassportContour, string[]>> = {
  ru: {
    backend: [
      'CMS и платформы контента',
      'Сервисы и рантайм',
      'Данные и кеш',
      'Платформа и эксплуатация',
    ],
    frontend: ['Интерфейс и витрина'],
    ai: ['Инструменты и практики'],
  },
  en: {
    backend: ['CMS & content platforms', 'Services & runtime', 'Data & cache', 'Platform & operations'],
    frontend: ['Interface & storefront'],
    ai: ['Tools & practices'],
  },
};

/** Порядок иконок в строке (сначала ключевые для контура). */
const ICON_PRIORITY: Record<PassportContour, string[]> = {
  backend: ['php', 'laravel', 'magento', 'mysql', 'docker', 'nginx', 'python', 'redis', 'postgresql', 'zend'],
  frontend: ['vuedotjs', 'react', 'html5', 'vite', 'tailwindcss', 'figma', 'jquery'],
  ai: ['cursor', 'claude', 'git', 'gitlab', 'visualstudiocode', 'npm'],
};

const AI_TOOL_ICONS = new Set(ICON_PRIORITY.ai);

const EXTRA_BY_CONTOUR: Record<PassportContour, string[]> = {
  backend: ['php'],
  frontend: ['tailwindcss', 'figma'],
  ai: [],
};

const MAX_ICONS = 8;

/** Иконки стека паспорта mission — из tech roadmap резюме (цветные). */
export function iconsForPassportContour(lang: Lang, contour: PassportContour): string[] {
  const cv = getCv(lang);
  const titles = new Set(LANE_TITLES[lang][contour]);
  const collected: string[] = [];

  for (const lane of cv.sections.tech.lanes) {
    if (!titles.has(lane.title)) continue;
    for (const file of lane.files) {
      if (!file.icon) continue;
      if (contour === 'ai' && !AI_TOOL_ICONS.has(file.icon)) continue;
      if (!collected.includes(file.icon)) collected.push(file.icon);
    }
  }

  for (const slug of EXTRA_BY_CONTOUR[contour]) {
    if (!collected.includes(slug)) collected.push(slug);
  }

  const priority = ICON_PRIORITY[contour];
  const ordered = [
    ...priority.filter((slug) => collected.includes(slug)),
    ...collected.filter((slug) => !priority.includes(slug)),
  ];

  return ordered.slice(0, MAX_ICONS);
}
