import type { Lang, ExperienceProjectGroup, ProjectEntry } from '../i18n/cv-data';
import { getCv } from '../i18n/cv-data';
import type { CaseLogEntry, StackQaPair } from '../i18n/mission-control-data';
import { buildProjectStackQa, stackQaToSummary } from './build-stack-qa';
import { caseSlug } from './case-slug';
import { resolveCaseStackIcons } from './resolve-stack-icons';

type Seed = {
  slug: string;
  name: string;
  context: string;
  operation: string;
  stackQa: StackQaPair[];
  stackIcons?: string[];
  stackLeadLabel?: string;
  status: string;
  priority: number;
};

type ExtraSeedInput = Omit<Seed, 'slug' | 'stackQa'> & {
  titleForSlug: string;
  stackQa: StackQaPair[];
};

const NDA_SUFFIX = ' · NDA';

/** Базовые статусы колонки (суффикс NDA добавляется при сборке). */
export const CASE_LOG_STATUS_VALUES = {
  ru: ['В проде', 'Сопровождение', 'Завершён', 'Партнёр', 'Архив', 'Закрытый контур'] as const,
  en: ['Live', 'Support', 'Completed', 'Partner', 'Archive', 'Closed contour'] as const,
};

function extraSeed(input: ExtraSeedInput): Seed {
  const stack = stackQaToSummary(input.stackQa);
  return {
    ...input,
    slug: caseSlug(input.titleForSlug),
    stackIcons: resolveCaseStackIcons(undefined, stack),
    status: withNdaSuffix(input.status),
  };
}

const EXTRA_SEEDS: Record<Lang, Seed[]> = {
  ru: [
    extraSeed({
      titleForSlug: 'Verkter.dk: Magento 2.4.x + PWA (React/GraphQL)',
      name: 'verkter.dk',
      context: 'e-commerce · PWA',
      operation: 'Magento 2.4 + PWA (React/GraphQL): UI, интеграции, релизы',
      stackQa: [
        { q: 'Backend?', a: 'Magento 2.4, PHP' },
        { q: 'Клиент / UI?', a: 'React, GraphQL, PWA' },
      ],
      status: 'В проде',
      priority: 122,
    }),
    extraSeed({
      titleForSlug: 'RattanFurnitureFairy: модульные UI-доработки по ТЗ',
      name: 'rattanfurniturefairy.co.uk',
      context: 'e-commerce · Magento',
      operation: 'Модульные доработки витрины и UI по согласованным ТЗ',
      stackQa: [
        { q: 'Backend?', a: 'Magento, PHP, MySQL' },
        { q: 'Клиент / UI?', a: 'тема + кастомные модули' },
      ],
      status: 'Сопровождение',
      priority: 114,
    }),
    extraSeed({
      titleForSlug: 'Интерфейсная точность: Pixel Perfect + high-load',
      name: 'Pixel Perfect · high-load',
      context: '~2022—н.в.',
      operation: 'Pixel Perfect слой и кастомные аддоны под PWA/XenForo/ScandiPWA (закрытый UI)',
      stackQa: [
        { q: 'Backend?', a: 'PHP, автоматизация QA' },
        { q: 'Клиент / UI?', a: 'PWA, React, Pixel Perfect' },
      ],
      status: 'Закрытый контур',
      priority: 116,
    }),
  ],
  en: [
    extraSeed({
      titleForSlug: 'Verkter.dk: Magento 2.4.x + PWA (React/GraphQL)',
      name: 'verkter.dk',
      context: 'e-commerce · PWA',
      operation: 'Magento 2.4 + PWA (React/GraphQL): UI, integrations, releases',
      stackQa: [
        { q: 'Backend?', a: 'Magento 2.4, PHP' },
        { q: 'Client / UI?', a: 'React, GraphQL, PWA' },
      ],
      status: 'Live',
      priority: 122,
    }),
    extraSeed({
      titleForSlug: 'RattanFurnitureFairy: Magento UI module delivery',
      name: 'rattanfurniturefairy.co.uk',
      context: 'e-commerce · Magento',
      operation: 'Modular storefront and UI delivery per agreed scopes',
      stackQa: [
        { q: 'Backend?', a: 'Magento, PHP, MySQL' },
        { q: 'Client / UI?', a: 'theme + custom modules' },
      ],
      status: 'Support',
      priority: 114,
    }),
    extraSeed({
      titleForSlug: 'Interface precision: Pixel Perfect + high-load',
      name: 'Pixel Perfect · high-load',
      context: '~2022—present',
      operation: 'Pixel Perfect layer and custom addons for PWA/XenForo/ScandiPWA (closed UI)',
      stackQa: [
        { q: 'Backend?', a: 'PHP, QA automation' },
        { q: 'Client / UI?', a: 'PWA, React, Pixel Perfect' },
      ],
      status: 'Closed contour',
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

function customerHref(project: ProjectEntry): string | undefined {
  return (
    project.href ??
    project.links?.find((l) => l.kind === 'customer')?.href
  );
}

function displayName(project: ProjectEntry): string {
  if (project.caseLogName) return project.caseLogName;

  const href = customerHref(project) ?? project.href;
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

export function withNdaSuffix(base: string): string {
  const trimmed = base.trim();
  if (!trimmed) return 'NDA';
  if (/\bnda\b/i.test(trimmed)) return trimmed;
  return `${trimmed}${NDA_SUFFIX}`;
}

function periodContext(period: string): string {
  return period.replace(/\s*—\s*/g, ' · ').replace(/≈/g, '~').trim();
}

/** Годы из detail: (≈2014), 2011–2020, ≈2022, ≈2018–2019 и т.п. */
function extractYearSpanFromDetail(detail: string): string | undefined {
  const t = detail.replace(/\s+/g, ' ');
  const range = t.match(/(?:≈|~)?\s*(\d{4})\s*[—–-]\s*(\d{4}|н\.в\.|present)/i);
  if (range) {
    const end = /н\.в\.|present/i.test(range[2]) ? (range[0].includes('present') ? 'present' : 'н.в.') : range[2];
    const start = range[1];
    const prefix = /≈|~/.test(range[0]) ? '~' : '';
    return `${prefix}${start}—${end}`;
  }
  const single = t.match(/(?:\(|\s)(?:≈|~)?\s*(\d{4})(?:\)|\s|,|\.)/);
  if (single) {
    const prefix = /≈|~/.test(single[0]) ? '~' : '';
    return `${prefix}${single[1]}`;
  }
  return undefined;
}

function projectContext(project: ProjectEntry, group: ExperienceProjectGroup): string {
  if (project.caseLogPeriod) return project.caseLogPeriod.replace(/≈/g, '~').trim();
  const fromDetail = extractYearSpanFromDetail(project.detail);
  if (fromDetail) return fromDetail;
  return periodContext(group.period);
}

function statusFor(project: ProjectEntry, group: ExperienceProjectGroup, lang: Lang): string {
  const base = project.caseLogStatus ?? inferCaseLogStatus(project, group, lang);
  return withNdaSuffix(base);
}

function inferCaseLogStatus(
  project: ProjectEntry,
  group: ExperienceProjectGroup,
  lang: Lang
): string {
  if (project.log?.status) return project.log.status;

  const n = project.name.toLowerCase();
  const d = project.detail.toLowerCase();
  const p = group.period.toLowerCase();
  const ru = lang === 'ru';

  if (/архив|archive/i.test(n) || /biznesmashin|shkafkrovat/i.test(n)) {
    return ru ? 'Архив' : 'Archive';
  }
  if (/(102 пэс|кпск|гагарин|музыкальн|кко|muzteatr|kko concert)/i.test(n)) {
    return ru ? 'Партнёр' : 'Partner';
  }
  if (/pixel perfect/i.test(n)) return ru ? 'Закрытый контур' : 'Closed contour';

  if (/2022|н\.в\.|present/i.test(p)) {
    if (/krymresurs|sechat|mozgovnet|крымресурс|бот|telegram|layer/i.test(n)) {
      return ru ? 'В проде' : 'Live';
    }
    return ru ? 'В проде' : 'Live';
  }

  if (/verkter/i.test(n)) return ru ? 'В проде' : 'Live';
  if (/rattan/i.test(n)) return ru ? 'Сопровождение' : 'Support';

  if (project.href || /magento|opencart|zend|vue|wordpress|figma/i.test(d)) {
    return ru ? 'Завершён' : 'Completed';
  }

  return ru ? 'Завершён' : 'Completed';
}

function projectToSeed(
  project: ProjectEntry,
  group: ExperienceProjectGroup,
  lang: Lang
): Seed {
  const nameLc = project.name.toLowerCase();
  const operation = summarize(project.log?.action ?? project.detail);
  const stackQa = buildProjectStackQa(project, group, lang, operation);
  const stack = stackQaToSummary(stackQa);
  return {
    slug: caseSlug(project.name),
    name: displayName(project),
    context: projectContext(project, group),
    operation,
    stackQa,
    stackIcons: project.stackIcons?.length
      ? project.stackIcons
      : resolveCaseStackIcons(undefined, stack),
    stackLeadLabel: project.stackLeadLabel,
    status: statusFor(project, group, lang),
    priority: projectPriority(nameLc),
  };
}

function seedToEntry(seed: Seed, id: string): CaseLogEntry {
  const stack = stackQaToSummary(seed.stackQa);
  return {
    id,
    slug: seed.slug,
    name: seed.name,
    context: seed.context,
    operation: seed.operation,
    stack,
    stackQa: seed.stackQa,
    stackIcons: seed.stackIcons,
    stackLeadLabel: seed.stackLeadLabel,
    status: seed.status,
  };
}

/** Не показывать в «Примеры из практики» (остаётся в резюме). */
const CASE_LOG_SKIP_SLUGS = new Set([
  'dostavka-zpr',
  'корпоративные-решения-nda',
  'corporate-solutions-nda',
]);

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
    if (CASE_LOG_SKIP_SLUGS.has(seed.slug)) continue;
    if (seen.has(seed.slug)) continue;
    seen.add(seed.slug);
    unique.push(seed);
  }

  return unique.map((seed, index) => seedToEntry(seed, `ID_${String(index + 1).padStart(2, '0')}`));
}
