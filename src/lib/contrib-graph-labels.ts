import type { Lang } from '../i18n/cv-data';
import type { ContributionRange } from './contour-activity-types';
import { isMonthCalendarLayout, showMonthLabelsOnGrid } from './contrib-graph-layout';

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

  let lastYear = -1;
  return raw.map(({ weekIndex }) => {
    const dt = new Date(base);
    dt.setDate(base.getDate() + weekIndex * 7);
    let label = fmt.format(dt);
    if (lang === 'ru') label = label.replace(/\./g, '');
    const year = dt.getFullYear();
    if (year !== lastYear) {
      label = lang === 'ru' ? `${label} ${year}` : `${label} '${String(year).slice(-2)}`;
      lastYear = year;
    }
    return { weekIndex, label };
  });
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
  const [y, m, d] = gridStart.split('-').map(Number);
  const base = new Date(y, m - 1, d);
  const loc = lang === 'ru' ? 'ru-RU' : 'en-US';
  const fmt = new Intl.DateTimeFormat(loc, { weekday: 'short' });
  return Array.from({ length: 7 }, (_, dow) => {
    const dt = new Date(base);
    dt.setDate(base.getDate() + dow);
    let label = fmt.format(dt);
    if (lang === 'ru') label = label.replace(/\./g, '');
    return label;
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

/** Подписи дней под полосой недели (пн … вс / Mon … Sun) */
export function weekdayStripLabels(lang: Lang, dates: string[]): string[] {
  const loc = lang === 'ru' ? 'ru-RU' : 'en-US';
  const fmt = new Intl.DateTimeFormat(loc, { weekday: 'short' });
  return dates.map((date) => {
    const [y, m, d] = date.split('-').map(Number);
    let label = fmt.format(new Date(y, m - 1, d));
    if (lang === 'ru') label = label.replace(/\./g, '');
    return label;
  });
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
