import type { Lang } from '../i18n/cv-data';
import type { ContributionRange } from './contour-activity-types';
import {
  formatContribTooltip,
  gridRowDowLabels,
  localizedMonthLabelsForRange,
  monthBandLabels,
  monthWeekColumnLabels,
  weekdayStripLabels,
} from './contrib-graph-labels';
import {
  getCellCoords,
  isWeekStripLayout,
  svgSizeForRange,
} from './contrib-graph-layout';

const LEVEL_FILL: Record<number, string> = {
  0: 'rgba(74, 222, 128, 0.06)',
  1: 'rgba(74, 222, 128, 0.28)',
  2: 'rgba(74, 222, 128, 0.48)',
  3: 'rgba(74, 222, 128, 0.72)',
  4: 'rgba(74, 222, 128, 0.95)',
};

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

/** Сетка GitHub: колонки = недели, строки = дни недели */
export function renderContributionSvg(lang: Lang, range: ContributionRange): string {
  const { width: vbW, height: vbH, metrics, showMonthLabels, monthCalendar, fullWidth } =
    svgSizeForRange(range);
  const { cell, colWidth, gridTop, gridLeft, dowBand } = metrics;

  const months = showMonthLabels ? localizedMonthLabelsForRange(lang, range) : [];
  const monthBand = monthCalendar ? monthBandLabels(lang, range) : months;
  const weekCols = monthCalendar ? monthWeekColumnLabels(lang, range) : [];
  const rowDows = monthCalendar ? gridRowDowLabels(lang, range.gridStart) : [];

  const weekStrip = isWeekStripLayout(range);
  const fitClass = fullWidth ? ' mc-contrib__svg--fit' : '';
  const monthClass = monthCalendar ? ' mc-contrib__svg--month' : '';
  const wideClass = range.weeks > 8 && !monthCalendar ? ' mc-contrib__svg--wide' : '';
  const widthAttr = fullWidth || monthCalendar ? '100%' : String(vbW);
  const heightAttr = fullWidth || monthCalendar ? 'auto' : String(vbH);
  const preserve = weekStrip || monthCalendar ? 'xMinYMid meet' : 'xMidYMid meet';
  const weekColY = monthCalendar ? 16 : 14;
  const monthTitleY = monthCalendar ? 5 : 4;

  let svg = `<svg class="mc-contrib__svg${fitClass}${monthClass}${wideClass}" viewBox="0 0 ${vbW} ${vbH}" width="${widthAttr}" height="${heightAttr}" xmlns="http://www.w3.org/2000/svg" overflow="visible" preserveAspectRatio="${preserve}">`;

  const monthLabelClass =
    range.weeks > 80 ? 'mc-contrib__month mc-contrib__month--dense' : 'mc-contrib__month';

  for (const m of monthBand) {
    const mx = gridLeft + m.weekIndex * colWidth + cell / 2;
    svg += `<text x="${mx}" y="${monthTitleY}" class="${monthLabelClass}" fill="currentColor" text-anchor="middle" dominant-baseline="hanging">${escapeXml(m.label)}</text>`;
  }

  for (const w of weekCols) {
    svg += `<text x="${gridLeft + w.weekIndex * colWidth + cell / 2}" y="${weekColY}" class="mc-contrib__week-col" fill="currentColor" text-anchor="middle" dominant-baseline="hanging">${escapeXml(w.label)}</text>`;
  }

  if (monthCalendar) {
    rowDows.forEach((label, dow) => {
      const cy = gridTop + dow * colWidth + cell / 2;
      svg += `<text x="${gridLeft - 6}" y="${cy}" class="mc-contrib__dow" fill="currentColor" text-anchor="end" dominant-baseline="middle">${escapeXml(label)}</text>`;
    });
  }

  range.days.forEach((cellItem, i) => {
    const { x, y } = getCellCoords(range, i, metrics);
    const fill = cellItem.future
      ? 'rgba(74, 222, 128, 0.03)'
      : (LEVEL_FILL[cellItem.level] ?? LEVEL_FILL[0]);
    const tip = escapeXml(formatContribTooltip(lang, cellItem.date, cellItem.count));
    const rx = monthCalendar ? 3 : 2;
    svg += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="${rx}" fill="${fill}" class="mc-contrib__cell"><title>${tip}</title></rect>`;
  });

  if (weekStrip) {
    const labels = weekdayStripLabels(
      lang,
      range.days.map((d) => d.date),
    );
    const labelY = gridTop + cell + dowBand - 4;
    const dowClass =
      lang === 'en' ? 'mc-contrib__dow mc-contrib__dow--row mc-contrib__dow--en' : 'mc-contrib__dow mc-contrib__dow--row';
    labels.forEach((label, i) => {
      const cx = i * colWidth + cell / 2;
      svg += `<text x="${cx}" y="${labelY}" class="${dowClass}" fill="currentColor" text-anchor="middle" dominant-baseline="hanging">${escapeXml(label)}</text>`;
    });
  }

  svg += '</svg>';
  return svg;
}
