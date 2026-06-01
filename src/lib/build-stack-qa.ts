import type { ExperienceProjectGroup, Lang, ProjectEntry } from '../i18n/cv-data';
import type { StackQaPair } from '../i18n/mission-control-data';

function labels(lang: Lang) {
  return lang === 'ru'
    ? {
        backend: 'Backend?',
        frontend: 'Клиент / UI?',
        exclude: 'Не брали?',
      }
    : {
        backend: 'Backend?',
        frontend: 'Client / UI?',
        exclude: 'Out of scope?',
      };
}

function extractExcluded(detail: string, lang: Lang): string | null {
  if (/Magento не использовал/i.test(detail) || /без Magento/i.test(detail) || /No Magento/i.test(detail)) {
    return 'Magento';
  }
  const m = detail.match(/([^.]{0,100}не использовал[^.]{0,60})/i);
  if (m) {
    const s = m[1].replace(/\s+/g, ' ').trim();
    if (/magento/i.test(s)) return 'Magento';
    return s.length > 72 ? s.slice(0, 71).trim() + '…' : s;
  }
  return null;
}

function extractBackend(detail: string, nameLc: string, lang: Lang): string {
  const found: string[] = [];
  const add = (s: string) => {
    if (!found.includes(s)) found.push(s);
  };

  if (/laravel/i.test(detail)) add('Laravel');
  if (/statamic/i.test(detail)) add('Statamic');
  if (/magento\s*2|m2\b|2\.4|magento 2/i.test(detail)) add('Magento 2');
  else if (/magento\s*1|m1\b|magento/i.test(detail) || /\(magento\)/i.test(detail)) add('Magento');
  if (/1с-?битрикс|bitrix/i.test(detail) || /biznesmashin/i.test(nameLc)) add('1С-Битрикс');
  if (/opencart/i.test(detail)) add('OpenCart');
  if (/python|aiogram/i.test(detail)) add('Python · aiogram');
  if (/websockets/i.test(detail)) add('WebSockets');
  if (/redis/i.test(detail)) add('Redis');
  if (/очеред/i.test(detail)) add(lang === 'ru' ? 'очереди' : 'queues');
  if (/mysql/i.test(detail) || found.includes('Laravel')) add('MySQL');
  if (/cdek/i.test(detail)) add('CDEK API');
  if (/платёж|payment/i.test(detail)) add(lang === 'ru' ? 'платёжные API' : 'payment APIs');
  if (/react|graphql/i.test(detail)) add('React · GraphQL');
  else if (/pwa/i.test(detail)) add('PWA');
  if (/php/i.test(detail) && !found.length) add('PHP');
  if (found.length) return found.join(', ');

  if (/magento/i.test(nameLc)) return 'Magento, PHP';
  if (/бот|bot/i.test(nameLc)) return 'Python · aiogram';
  if (/layer\.cafe/i.test(nameLc)) return '—';
  if (/figma/i.test(detail)) return '—';

  return lang === 'ru' ? 'PHP — см. кейс' : 'PHP — see case';
}

function extractFrontend(detail: string, nameLc: string, lang: Lang): string {
  if (/figma|дизайн для ранн/i.test(detail) || /layer\.cafe/i.test(nameLc)) {
    return lang === 'ru' ? 'Figma, UI-прототипы' : 'Figma, UI prototypes';
  }
  if (/telegram|бот/i.test(detail) || /bot/i.test(nameLc)) {
    return lang === 'ru' ? 'диалог в Telegram' : 'Telegram dialog UI';
  }
  const parts: string[] = [];
  if (/vue\.?js|\bvue\b/i.test(detail)) parts.push('Vue.js');
  if (/react|pwa|graphql/i.test(detail) && !parts.includes('React · GraphQL')) {
    parts.push(/graphql/i.test(detail) ? 'React · GraphQL' : 'React/PWA');
  }
  if (/кабинет/i.test(detail)) parts.push(lang === 'ru' ? 'личные кабинеты' : 'portals');
  if (/публичн|витрин/i.test(detail)) parts.push(lang === 'ru' ? 'публичная витрина' : 'public storefront');
  if (/pixel perfect|xenforo|scandipwa/i.test(detail)) {
    parts.push(lang === 'ru' ? 'Pixel Perfect, PWA-слой' : 'Pixel Perfect, PWA layer');
  }
  if (parts.length) return parts.join(', ');
  if (/magento|opencart|битрикс|bitrix/i.test(detail + nameLc)) {
    return lang === 'ru' ? 'тема CMS + кастом' : 'CMS theme + custom';
  }
  if (/laravel/i.test(detail) && /скетч|процесс/i.test(detail)) {
    return lang === 'ru' ? 'UI по согласованным скетчам' : 'UI per agreed sketches';
  }
  return lang === 'ru' ? 'по задаче' : 'per scope';
}

/** Q→A по стеку (только для согласования данных; в UI — иконки). */
export function buildProjectStackQa(
  project: ProjectEntry,
  _group: ExperienceProjectGroup,
  lang: Lang,
  _operation: string
): StackQaPair[] {
  if (project.stackQa?.length) return project.stackQa;

  const L = labels(lang);
  const detail = project.detail;
  const nameLc = project.name.toLowerCase();
  const pairs: StackQaPair[] = [
    { q: L.backend, a: extractBackend(detail, nameLc, lang) },
    { q: L.frontend, a: extractFrontend(detail, nameLc, lang) },
  ];
  const excluded = extractExcluded(detail, lang);
  if (excluded) pairs.push({ q: L.exclude, a: excluded });
  return pairs;
}

export function stackQaToSummary(qa: StackQaPair[]): string {
  return qa
    .map((p) => p.a)
    .filter((a) => a && a !== '—')
    .join(' · ');
}
