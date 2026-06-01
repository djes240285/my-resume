import type { Lang } from '../i18n/cv-data';
import type { ContributionRange } from './contour-activity-types';
import { isMonthCalendarLayout, showMonthLabelsOnGrid } from './contrib-graph-layout';

/** EN: 2 буквы под узкие колонки; RU: пн, вт из Intl */
const EN_DOW_2 = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

export function parseContribDate(date: string): Date {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function compactWeekdayLabel(lang: Lang, date: string): string {
  const dt = parseContribDate(date);
  if (lang === 'en') return EN_DOW_2[dt.getDay()];
  const fmt = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' });
  return fmt.format(dt).replace(/\./g, '');
}

/** Разреживаем подписи месяцев, чтобы не наезжали (всё время / 2 года) */
function thinMonthLabels(
  labels: { weekIndex: number; label: string }[],
  minWeekGap: number,
): { weekIndex: number; label: string }[] {
  if (labels.length <= 1) return labels;
  const out: { weekIndex: number; label: string }[] = [labels[0]];
  for (let i = 1; i < labels.length; i++) {
    if (labels[i].weekIndex - out[out.length - 1].weekIndex >= minWeekGap) {
      out.push(labels[i]);
    }
  }
  return out;
}

export function localizedMonthLabelsForRange(
  lang: Lang,
  range: ContributionRange,
): { weekIndex: number; label: string }[] {
  if (!showMonthLabelsOnGrid(range.weeks)) return [];

  const raw = range.monthLabels ?? [];
  if (!range.gridStart || !raw.length) return raw;

  const [y, m, d] = range.gridStart.split('-').map(Number);
  const base = new Date(y, m - 1, d);
  const fmt = new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-US', { month: 'short' });
  const dense = range.weeks > 80;

  let lastYear = -1;
  const built = raw.map(({ weekIndex }) => {
    const dt = new Date(base);
    dt.setDate(base.getDate() + weekIndex * 7);
    let label = fmt.format(dt);
    if (lang === 'ru') label = label.replace(/\./g, '');
    const year = dt.getFullYear();
    if (lang === 'ru' && !dense && year !== lastYear) {
      label = `${label} ${year}`;
      lastYear = year;
    }
    return { weekIndex, label };
  });

  const minGap = dense ? 6 : range.weeks > 52 ? 5 : 3;
  return thinMonthLabels(built, minGap);
}

export function formatContribPeriod(lang: Lang, start: string, end: string): string {
  const parse = (s: string) => {
    const [y, mo, da] = s.split('-').map(Number);
    return new Date(y, mo - 1, da);
  };
  const loc = lang === 'ru' ? 'ru-RU' : 'en-US';
  const fmt = new Intl.DateTimeFormat(loc, { month: 'short', day: 'numeric', year: 'numeric' });
  let a = fmt.format(parse(start));
  let b = fmt.format(parse(end));
  if (lang === 'ru') {
    a = a.replace(/\./g, '');
    b = b.replace(/\./g, '');
  }
  return `${a} — ${b}`;
}

/** Подписи строк сетки (день недели от gridStart) */
export function gridRowDowLabels(lang: Lang, gridStart: string): string[] {
  const base = parseContribDate(gridStart);
  return Array.from({ length: 7 }, (_, dow) => {
    const dt = new Date(base);
    dt.setDate(base.getDate() + dow);
    return compactWeekdayLabel(lang, `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`);
  });
}

/** Число дня месяца над каждой колонкой-неделей */
export function monthWeekColumnLabels(
  lang: Lang,
  range: ContributionRange,
): { weekIndex: number; label: string }[] {
  const [y, m, d] = range.gridStart.split('-').map(Number);
  const base = new Date(y, m - 1, d);
  const loc = lang === 'ru' ? 'ru-RU' : 'en-US';
  const fmt = new Intl.DateTimeFormat(loc, { day: 'numeric' });
  return Array.from({ length: range.weeks }, (_, w) => {
    const dt = new Date(base);
    dt.setDate(base.getDate() + w * 7);
    return { weekIndex: w, label: fmt.format(dt) };
  });
}

/** Название месяца над сеткой (если в JSON нет monthLabels) */
export function monthTitleLabel(lang: Lang, gridStart: string): string {
  const [y, m] = gridStart.split('-').map(Number);
  const dt = new Date(y, m - 1, 1);
  const loc = lang === 'ru' ? 'ru-RU' : 'en-US';
  const fmt = new Intl.DateTimeFormat(loc, { month: 'short' });
  let label = fmt.format(dt);
  if (lang === 'ru') label = label.replace(/\./g, '');
  return label;
}

export function monthBandLabels(
  lang: Lang,
  range: ContributionRange,
): { weekIndex: number; label: string }[] {
  if (isMonthCalendarLayout(range)) {
    return [{ weekIndex: 0, label: monthTitleLabel(lang, range.gridStart) }];
  }
  return localizedMonthLabelsForRange(lang, range);
}

/** Подписи дней под полосой недели (пн … вс / Mo … Su) */
export function weekdayStripLabels(lang: Lang, dates: string[]): string[] {
  return dates.map((date) => compactWeekdayLabel(lang, date));
}

export function formatContribTooltip(lang: Lang, date: string, count: number): string {
  const [y, m, day] = date.split('-');
  const dateStr = lang === 'ru' ? `${day}.${m}.${y}` : `${y}-${m}-${day}`;
  if (lang === 'ru') {
    if (count === 0) return `Нет коммитов · ${dateStr}`;
    const n = count === 1 ? 'коммит' : count < 5 ? 'коммита' : 'коммитов';
    return `${count} ${n} · ${dateStr}`;
  }
  const w = count === 1 ? 'commit' : 'commits';
  return count === 0 ? `No commits · ${dateStr}` : `${count} ${w} · ${dateStr}`;
}
