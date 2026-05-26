import type { Lang, ExperienceProjectGroup, ProjectEntry } from '../i18n/cv-data';
import { getCv } from '../i18n/cv-data';
import type { CaseLogEntry } from '../i18n/mission-control-data';
import { caseSlug } from './case-slug';
import { resolveCaseStackIcons } from './resolve-stack-icons';

type Seed = {
  slug: string;
  name: string;
  context: string;
  operation: string;
  stack: string;
  stackIcons?: string[];
  status: string;
  priority: number;
};

type ExtraSeedInput = Omit<Seed, 'slug' | 'stackIcons'> & { titleForSlug: string };

function extraSeed(input: ExtraSeedInput): Seed {
  const stack = input.stack;
  return {
    ...input,
    slug: caseSlug(input.titleForSlug),
    stackIcons: resolveCaseStackIcons(undefined, stack),
  };
}

const EXTRA_SEEDS: Record<Lang, Seed[]> = {
  ru: [
    extraSeed({
      titleForSlug: 'Verkter.dk: Magento 2.4.x + PWA (React/GraphQL)',
      name: 'verkter.dk',
      context: 'e-commerce · PWA',
      operation: 'Magento 2.4 + PWA (React/GraphQL): UI, интеграции, релизы',
      stack: 'Magento 2.4, React, GraphQL, PHP',
      status: 'В проде',
      priority: 122,
    }),
    extraSeed({
      titleForSlug: 'RattanFurnitureFairy: модульные UI-доработки по ТЗ',
      name: 'rattanfurniturefairy.co.uk',
      context: 'e-commerce · Magento',
      operation: 'Модульные доработки витрины и UI по согласованным ТЗ',
      stack: 'Magento, PHP, MySQL',
      status: 'Сопровождение',
      priority: 114,
    }),
    extraSeed({
      titleForSlug: 'Интерфейсная точность: Pixel Perfect + high-load',
      name: 'Pixel Perfect · high-load',
      context: 'UI · NDA-safe',
      operation: 'Pixel Perfect слой и кастомные аддоны под PWA/XenForo/ScandiPWA',
      stack: 'PWA, React, PHP, автоматизация QA',
      status: 'NDA · витрина',
      priority: 116,
    }),
  ],
  en: [
    extraSeed({
      titleForSlug: 'Verkter.dk: Magento 2.4.x + PWA (React/GraphQL)',
      name: 'verkter.dk',
      context: 'e-commerce · PWA',
      operation: 'Magento 2.4 + PWA (React/GraphQL): UI, integrations, releases',
      stack: 'Magento 2.4, React, GraphQL, PHP',
      status: 'Live',
      priority: 122,
    }),
    extraSeed({
      titleForSlug: 'RattanFurnitureFairy: Magento UI module delivery',
      name: 'rattanfurniturefairy.co.uk',
      context: 'e-commerce · Magento',
      operation: 'Modular storefront and UI delivery per agreed scopes',
      stack: 'Magento, PHP, MySQL',
      status: 'Support',
      priority: 114,
    }),
    extraSeed({
      titleForSlug: 'Interface precision: Pixel Perfect + high-load',
      name: 'Pixel Perfect · high-load',
      context: 'UI · NDA-safe',
      operation: 'Pixel Perfect layer and custom addons for PWA/XenForo/ScandiPWA',
      stack: 'PWA, React, PHP, QA automation',
      status: 'NDA · delivery',
      priority: 116,
    }),
  ],
};

function projectPriority(nameLc: string): number {
  if (nameLc.includes('windowcleaner')) return 100;
  if (nameLc.includes('крымресурс') || nameLc.includes('krymresurs')) return 95;
  if (nameLc.includes('доставка') || nameLc.includes('dostavka-zpr') || nameLc.includes('dostavka'))
    return 92;
  if (nameLc.includes('sechat')) return 90;
  if (nameLc.includes('mozgovnet')) return 86;
  if (nameLc.includes('gratisiskolan')) return 83;
  if (nameLc.includes('biznesmashin')) return 80;
  if (nameLc.includes('verkter')) return 122;
  return 50;
}

function inferStack(nameLc: string, lang: Lang): string {
  const ru = lang === 'ru';
  if (nameLc.includes('windowcleaner')) return 'Magento 1/2, PHP, MySQL, Redis, Docker';
  if (nameLc.includes('крымресурс') || nameLc.includes('krymresurs')) {
    return ru
      ? 'PHP, Laravel, интеграции, документооборот, API'
      : 'PHP, Laravel, integrations, document workflows, API';
  }
  if (nameLc.includes('доставка') || nameLc.includes('dostavka')) {
    return 'Laravel, PHP, CDEK API, MySQL';
  }
  if (nameLc.includes('sechat')) {
    return ru ? 'Laravel, WebSockets, Redis, очереди' : 'Laravel, WebSockets, Redis, queues';
  }
  if (nameLc.includes('gratisiskolan')) return 'Magento 2.4, PHP, custom modules';
  if (nameLc.includes('verkter')) return 'Magento 2.4, React, GraphQL, PHP';
  if (nameLc.includes('mozgovnet')) return ru ? 'PHP, платежи, API, легаси' : 'PHP, payments, API, legacy';
  if (nameLc.includes('бот') || nameLc.includes('bot')) return 'Python, aiogram, FSM, API';
  if (nameLc.includes('layer.cafe')) return ru ? 'Figma, UI, прототипы' : 'Figma, UI, prototypes';
  if (nameLc.includes('opcart') || nameLc.includes('opencart')) return 'OpenCart, PHP, MySQL';
  if (nameLc.includes('bitrix') || nameLc.includes('битрикс')) return ru ? '1С-Битрикс, PHP, MySQL' : '1C-Bitrix, PHP, MySQL';
  if (nameLc.includes('vue') || nameLc.includes('kolyom')) return 'Vue.js, PHP, MySQL';
  if (/(magento|m1|m2)/.test(nameLc)) return 'Magento, PHP, MySQL';
  return ru ? 'PHP, Laravel/Magento, API' : 'PHP, Laravel/Magento, API';
}

function primaryHref(project: ProjectEntry): string | undefined {
  return (
    project.href ??
    project.links?.find((l) => l.kind !== 'partner')?.href ??
    project.links?.[0]?.href
  );
}

function displayName(project: ProjectEntry): string {
  const href = primaryHref(project);
  if (href) {
    try {
      return new URL(href).hostname.replace(/^www\./, '');
    } catch {
      /* ignore */
    }
  }
  const stripped = project.name.replace(/\s*\([^)]*\)\s*/g, ' ').trim();
  if (stripped.length <= 48) return stripped;
  return stripped.slice(0, 47).trim() + '…';
}

function summarize(text: string, max = 76): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const sp = cut.lastIndexOf(' ');
  return (sp > 40 ? cut.slice(0, sp) : cut).trim() + '…';
}

function statusFor(project: ProjectEntry, lang: Lang): string {
  if (project.log?.status) return project.log.status;
  const n = project.name.toLowerCase();
  if (/(архив|archive)/i.test(n)) return lang === 'ru' ? 'Архив' : 'Archive';
  if (/(nda|закрыт|корпоративные решения)/i.test(n)) return 'NDA';
  if (/(бот|bot)/i.test(n)) return lang === 'ru' ? 'Собственный продукт' : 'Own product';
  if (/(102 пэс|кпск|гагарин|музыкальный|пневматика|кко|партн)/i.test(n))
    return lang === 'ru' ? 'Кейс партнёра' : 'Partner case';
  return lang === 'ru' ? 'В контуре' : 'In scope';
}

function periodContext(period: string): string {
  return period.replace(/\s*—\s*/g, ' · ').replace(/≈/g, '~').trim();
}

function projectToSeed(
  project: ProjectEntry,
  group: ExperienceProjectGroup,
  lang: Lang
): Seed {
  const nameLc = project.name.toLowerCase();
  const stack = inferStack(nameLc, lang);
  const operation = summarize(project.log?.action ?? project.detail);
  return {
    slug: caseSlug(project.name),
    name: displayName(project),
    context: periodContext(group.period),
    operation,
    stack,
    stackIcons: resolveCaseStackIcons(undefined, stack),
    status: statusFor(project, lang),
    priority: projectPriority(nameLc),
  };
}

function seedToEntry(seed: Seed, id: string): CaseLogEntry {
  return {
    id,
    slug: seed.slug,
    name: seed.name,
    context: seed.context,
    operation: seed.operation,
    stack: seed.stack,
    stackIcons: seed.stackIcons,
    status: seed.status,
  };
}

/** Все кейсы из резюме + витрины портфолио, без дублей по slug. */
export function buildMissionCaseLogEntries(lang: Lang): CaseLogEntry[] {
  const cv = getCv(lang);
  const groups = cv.sections.experience.projectGroups;

  const seeds: Seed[] = [
    ...EXTRA_SEEDS[lang],
    ...groups.flatMap((group) => group.projects.map((p) => projectToSeed(p, group, lang))),
  ];

  seeds.sort((a, b) => b.priority - a.priority);

  const seen = new Set<string>();
  const unique: Seed[] = [];
  for (const seed of seeds) {
    if (seen.has(seed.slug)) continue;
    seen.add(seed.slug);
    unique.push(seed);
  }

  return unique.map((seed, index) => seedToEntry(seed, `ID_${String(index + 1).padStart(2, '0')}`));
}
